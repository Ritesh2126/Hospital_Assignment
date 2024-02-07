# Hospital_Assignment




# Major Libraries/Frameworks Used

	* Express.js: A minimal and flexible Node.js web application framework for building robust and scalable APIs.

	* Body-parser: Middleware for handling JSON requests in Express.js.

	* MySQL2: MySQL library for Node.js, used for database connectivity.

	* Multer: Middleware for handling file uploads in Express.js.





# Setup Instructions

	1. Clone the repository.

	2. Install dependencies:

	   * npm init
	   * npm install express mysql2 body-parser multer

	3. Database Insallation

	   * Download the database SQL file from the `database` folder and run this file one by one.

	   * Then Set up your MySQL database and update the connection details in index.js.


	4. Run the application:

	     * npm start

     
# API Endpoints


	1. Register Patient

		Endpoint: POST /register
		Description: Registers a patient in the system.
		Request Body(form-data):

			{
			  "psyc_id": 1,
			  "patient_name": "Ritesh",
			  "Address": "h-3 narmada colony",
			  "email": "ritesh@gmail.com",
			  "phone": "917067374705",
			  "password": "Ritesh123"
			}
			File Upload: Patient photo should be attached.


	2. Get Hospital Details

		Endpoint: GET /gethospitaldetail
		Description: Retrieves details about a hospital, including psychiatrist and patient counts.
		Request Parameters:

			hosp_id: Hospital ID for which details are requested.




# Postman Collection

	
	I have uploaded my Postman collection file to Google Drive. Download it using the link given below:
	
	
	https://drive.google.com/file/d/1n_d-LDTE8TH_0B4iO-YetWTnGrNXeS6t/view?usp=sharing
	
	
	
	
