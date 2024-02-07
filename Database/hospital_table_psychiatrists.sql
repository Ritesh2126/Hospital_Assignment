
-- --------------------------------------------------------

--
-- Table structure for table `psychiatrists`
--

CREATE TABLE `psychiatrists` (
  `psyc_id` int(11) NOT NULL,
  `psyc_name` varchar(45) DEFAULT NULL,
  `hosp_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `psychiatrists`
--

INSERT INTO `psychiatrists` (`psyc_id`, `psyc_name`, `hosp_id`) VALUES
(1, 'Ritesh Gupta', 1),
(2, 'Ritika Goswami', 2),
(3, 'Aarav', 2),
(4, 'Neha', 3),
(5, 'Rahul', 4),
(6, 'Ananya', 1),
(7, 'Vikram', 2),
(8, 'Sanya', 3),
(9, 'Amit', 4),
(10, 'Priya', 1),
(11, 'Vivek', 2),
(12, 'Isha', 3),
(13, 'Arjun', 4),
(14, 'Aishwarya', 1),
(15, 'Rajat', 2),
(16, 'Meera', 3),
(17, 'Karan', 4),
(18, 'Riya', 1),
(19, 'Akash', 2),
(20, 'Tanvi', 3),
(21, 'Surya', 4);
