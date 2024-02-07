
-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `hosp_id` int(11) NOT NULL,
  `hospital_name` varchar(450) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`hosp_id`, `hospital_name`) VALUES
(1, 'Apollo Hospitals'),
(2, 'Jawaharlal Nehru Medical College and Hospital'),
(3, 'Indira Gandhi Institute of Medical Sciences (IGIMS)'),
(4, 'AIIMS - All India Institute Of Medical Science');
