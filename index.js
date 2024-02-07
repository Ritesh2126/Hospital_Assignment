let express = require('express');
let bodyparser  = require('body-parser');
let mysql = require('mysql2');
let upload = require('./multer');

const app=express();
app.use(bodyparser.json());

// MySQL Connection
var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hospital'})

// Connecting to MySQL database
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
}); 

// Validation function for patient details
const validatePatientDetails = (patientData,file,hosp_id) => {

// Extracting data from patientData and file
    const { psyc_id,patient_name, Address, email, phone, password} = patientData;
    const PatientPhoto =file;

// Validation functions
    const isEmailValid = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    };

    const isPhoneNumberValid = (phone) => {
      return /^\d{10,}$/.test(phone);
    };
  
    const isPasswordValid = (password) => {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(password);
    };

    
  // Checking required fields
    if (!psyc_id || !patient_name || !Address || !email || !phone || !password || !PatientPhoto) {
      return "All fields are required";
    }

  // Checking minimum length for Address
    if (Address.length < 10) {
      return "Address should be at least 10 characters";
    }

    // Additional check for hospital ID
    if(!hosp_id){
        return "invalid psychiatrists"

    }

  // Checking email validity
    if (!isEmailValid(email)) {
      return "Invalid email address";
    }
  
    // Checking phone number validity
    if (!isPhoneNumberValid(phone)) {
      return "Invalid phone number";
    }
  
    // Checking password validity
    if (!isPasswordValid(password)) {
      return "Invalid password. It must contain one upper character, one lower character, and a number. Max length: 15, Min length: 8";
    }

  
    return "Pass";
  };
  
// Function to organize hospital details
  function organizeHospitalDetails(results) {
    // console.log("Testing",results)
    const organizedData = {};

    results.forEach((row) => {
        const hospitalName = row['Hospital name'];
        const psychId = row['Psyc id'];
        const psychName = row['psyc name'];
        const patientsCount = row['Total patients count'];
        
        // Checking if 'data' property exists, and initializing it if not
        if (!organizedData['data']) {
             organizedData['data']={
                'Hospital name':'',
                'Total Psychiatrist count': 0,
                'Total patients count': 0,
                'Psychiatrist Details': [],
            };
        }

         // Updating 'data' properties based on the current row
        organizedData['data']['Hospital name']=hospitalName
        organizedData['data']['Total Psychiatrist count'] += 1;
        organizedData['data']['Total patients count'] += patientsCount;
        
        // Creating psychiatrist details object
        const psychiatristDetails = {
            Id: psychId,
            Name: psychName,
            'Patients count': patientsCount,
        };

        // Pushing psychiatrist details to 'Psychiatrist Details' array
        organizedData['data']['Psychiatrist Details'].push(psychiatristDetails);
    });

    return organizedData;

}  
  
  




// Route to register a patient
app.post('/register', upload.any(),  (req, res) => {

    const data=req.body;
    console.log("tesss",data,req.files[0].originalname)

    // Query to get hospital ID based on psyc_id
    conn.query('Select hosp_id from psychiatrists where psyc_id=(?)',[req.body.psyc_id],function(error, result){
        if(error)
        {res.status(500).json([])
        console.log(error)}
        else
        {
           const hosp_id=result[0]
           const validationResult = validatePatientDetails(data,req.files[0].originalname,hosp_id);

           if (validationResult == "Pass") {
                try {  
                   
                    // Inserting patient details into the database
                    
                    const result_p =    conn.query(
                    "INSERT INTO patient (Patient_name, Address, Email, Phone, Password, psyc_id, Patient_photo,hosp_id) VALUES (?,?,?,?,?,?,?,?)",
                    [
                        data.patient_name,
                        data.Address,
                        data.email,
                        data.phone,
                        data.password,
                        data.psyc_id,
                        req.files[0].originalname,
                        hosp_id.hosp_id
                    ]
                    );
                    // Sending response based on the result of the database insertion
                    if (result_p) {
                    res.status(200).json({ result: 'Patient registered successfully' });
                    } else {
                    res.status(500).json({ result: 'false' });
                    }
                } catch (err) {
                    console.log(err);
                    res.status(500).json({ result: 'false' });
                }
            }
            else{
                console.log(validationResult)
                res.status(500).json({ message: validationResult });
            }

                    
        }
     })
            
});




// Route to get hospital details
app.get('/gethospitaldetail', (req, res) => {

// Query to get hospital , Psychiatrist and Patient details based on hosp_id
    conn.query(`
        SELECT 
            h.hospital_name AS 'Hospital name', 
            COUNT(DISTINCT p.psyc_id) AS 'Total Psychiatrist count',
            COUNT(DISTINCT pt.patient_id) AS 'Total patients count',
            p.psyc_id AS 'Psyc id',
            p.psyc_name AS 'psyc name'
        FROM 
            hospitals h 
        JOIN 
            psychiatrists p ON h.hosp_id = p.hosp_id
        JOIN
            patient pt ON pt.psyc_id = p.psyc_id
        WHERE 
            h.hosp_id = ?
        GROUP BY
            h.hospital_name, p.psyc_id, p.psyc_name;`,[req.body.hosp_id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            // Organizing and sending hospital details
            const HospitalDetails=organizeHospitalDetails(results);
            res.status(200).json(HospitalDetails);
        }
    });
});

// Starting the server
app.listen(3010,function(req,res){
    console.log("server is run ")
})

