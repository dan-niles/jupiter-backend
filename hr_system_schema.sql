-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2022 at 12:07 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` int NOT NULL,
  `branch_name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branch_id`, `branch_name`, `address`, `country`) VALUES
(1, 'Katubedda', '26 Piliyandala Road, Katubedda, Colombo', 'Sri Lanka');

-- --------------------------------------------------------

--
-- Table structure for table `contract`
--

CREATE TABLE `contract` (
  `contract_id` int NOT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contract`
--

INSERT INTO `contract` (`contract_id`, `type`) VALUES
(1, 'Fulltime'),
(2, 'Parttime'),
(3, 'Permanent'),
(4, 'Freelance');

-- --------------------------------------------------------

--
-- Table structure for table `custom_attribute`
--

CREATE TABLE `custom_attribute` (
  `atttr_id` int NOT NULL,
  `attr_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `alias` varchar(255) NOT NULL,
  `data_type` enum('VARCHAR','INT','DATE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `custom_attribute`
--

INSERT INTO `custom_attribute` (`atttr_id`, `attr_name`, `alias`, `data_type`) VALUES
(1, 'nationality', 'Nationality', 'VARCHAR'),
(2, 'blood_group', 'Blood Group', 'VARCHAR');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int NOT NULL,
  `dept_name` varchar(50) NOT NULL,
  `building` varchar(50) NOT NULL,
  `branch_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`, `building`, `branch_id`) VALUES
(1, 'ICT', '', 1),
(2, 'HR', '', 1),
(3, 'Finance', '', 1),
(4, 'Marketing', '', 1),
(5, 'Production', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `dependant`
--

CREATE TABLE `dependant` (
  `dep_id` int NOT NULL,
  `emp_id` varchar(5) NOT NULL,
  `dep_name` varchar(255) NOT NULL,
  `dep_birthdate` date DEFAULT NULL,
  `relationship_to_emp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dependant`
--

INSERT INTO `dependant` (`dep_id`, `emp_id`, `dep_name`, `dep_birthdate`, `relationship_to_emp`) VALUES
(1, '00001', 'Mushraf', '2022-11-18', 'Brother');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_contact`
--

CREATE TABLE `emergency_contact` (
  `emergency_contact_id` int NOT NULL,
  `emp_id` varchar(5) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `relationship_to_emp` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `emergency_contact`
--

INSERT INTO `emergency_contact` (`emergency_contact_id`, `emp_id`, `contact_name`, `phone_no`, `address`, `relationship_to_emp`) VALUES
(1, '00001', 'Mushraf', '947736723456', '56 Temple Road, Mount Lavinia, Colombo', 'Brother');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` varchar(5) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `marital_status` enum('single','married','widowed','divorced','separated') NOT NULL,
  `dept_id` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nic` varchar(15) DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `contract_id` int DEFAULT NULL,
  `title_id` int DEFAULT NULL,
  `supervisor_id` varchar(5) DEFAULT NULL,
  `paygrade_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `full_name`, `first_name`, `last_name`, `birthdate`, `marital_status`, `dept_id`, `email`, `nic`, `status_id`, `contract_id`, `title_id`, `supervisor_id`, `paygrade_id`) VALUES
('00001', 'John Wick', 'John', 'Wick', '2000-11-16', 'single', 1, 'john@jupiter.com', '2000046782678', 1, 1, 5, NULL, 2),
('00002', 'Dave Windler', 'Dave', 'Windler', '1997-11-19', 'married', 1, 'dave@jupiter.com', '9700046782678', 1, 1, 1, NULL, 4),
('00003', 'Darren Bruen', 'Darren', 'Bruen', '1993-01-14', 'married', 2, 'darren@jupiter.com', '9600047882678', 1, 1, 6, '00002', 3),
('00004', 'Kurt Corwin', 'Kurt', 'Corwin', '1989-08-08', 'single', 1, 'kurt@jupiter.com', '9300047884448', 1, 1, 7, '00002', 3);

-- --------------------------------------------------------

--
-- Table structure for table `emp_detail`
--

CREATE TABLE `emp_detail` (
  `emp_id` int NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `blood_group` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_application`
--

CREATE TABLE `leave_application` (
  `leave_id` int NOT NULL,
  `emp_id` varchar(5) NOT NULL,
  `leave_type` enum('annual','casual','no_pay','maternity') NOT NULL,
  `date` date NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` enum('pending','approved','declined') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



--
-- Dumping data for table `leave_application`
--

INSERT INTO `leave_application` (`leave_id`, `emp_id`, `leave_type`, `date`, `reason`, `status`) VALUES
(1, '00001', 'annual', '2022-11-10', 'Sick leave', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `leave_balance`
--

CREATE TABLE `leave_balance` (
  `emp_id` varchar(5) NOT NULL,
  `year` year NOT NULL,
  `annual` int DEFAULT NULL,
  `casual` int DEFAULT NULL,
  `maternity` int DEFAULT NULL,
  `no_pay` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `leave_balance`
--

INSERT INTO `leave_balance` (`emp_id`, `year`, `annual`, `casual`, `maternity`, `no_pay`) VALUES
('00001', 2022, 14, 12, 10, 50),
('00002', 2022, 14, 12, 10, 50),
('00003', 2022, 14, 12, 10, 50),
('00004', 2022, 14, 12, 10, 50);

-- --------------------------------------------------------

--
-- Table structure for table `org_info`
--

CREATE TABLE `org_info` (
  `id` int NOT NULL,
  `info_field` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alias` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `org_info`
--

INSERT INTO `org_info` (`id`, `info_field`, `alias`, `value`) VALUES
(1, 'org_name', 'Organization Full Name', 'Jupiter Apparels PVT LTD'),
(2, 'org_short_name', 'Organization Short Name', 'Jupiter'),
(3, 'head_office', 'Head Office', 'Union Place'),
(4, 'reg_no', 'Registration No', 'KEJ1765382'),
(5, 'logo_url', 'Logo URL', 'public/assets/images/logo-text-blue.png'),
(6, 'website', 'Company Website', 'https://www.jupiter.lk');

-- --------------------------------------------------------

--
-- Table structure for table `paygrade`
--

CREATE TABLE `paygrade` (
  `paygrade_id` int NOT NULL,
  `level` varchar(10) NOT NULL,
  `annual` int DEFAULT NULL,
  `casual` int DEFAULT NULL,
  `maternity` int DEFAULT NULL,
  `no_pay` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `paygrade`
--

INSERT INTO `paygrade` (`paygrade_id`, `level`, `annual`, `casual`, `maternity`, `no_pay`) VALUES
(1, 'Level 1', 14, 12, 10, 50),
(2, 'Level 2', 14, 12, 10, 50),
(3, 'Level 3', 14, 12, 10, 50),
(4, 'Level 4', 14, 12, 10, 50);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `type`) VALUES
(1, 'Fulltime'),
(3, 'Intern'),
(2, 'Parttime');

-- --------------------------------------------------------

--
-- Table structure for table `title`
--

CREATE TABLE `title` (
  `title_id` int NOT NULL,
  `job_title` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `title`
--

INSERT INTO `title` (`title_id`, `job_title`) VALUES
(1, 'Chairman'),
(2, 'Chief Executive Officer'),
(3, 'Chief Marketing Officer'),
(4, 'ICT Manager'),
(5, 'Software Engineer'),
(6, 'Human Resources Manager'),
(7, 'Network Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `emp_id` varchar(5) UNIQUE NOT NULL,
  `role` varchar(50) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `emp_id`, `role`, `username`, `password`) VALUES
(1, '00001', 'admin', 'admin', '$2b$10$m/AKAaGV7Q6iG/UflAWfdegk/.HROYPAveo219Peh6BbkxMOyEJWu'),
(2, '00004', 'user', 'user', '$2b$10$WwRFhuiZW7WmmaSe.K13Wu5YZe/UmFLYh5YZkPWm4Tdihj.Ufmk0C'),
(3, '00003', 'manager', 'manager', '$2b$10$WwRFhuiZW7WmmaSe.K13Wu5YZe/UmFLYh5YZkPWm4Tdihj.Ufmk0C');

-- --------------------------------------------------------

--
-- Table structure for table `user_access`
--

CREATE TABLE `user_access` (
  `role` varchar(50) NOT NULL,
  `access_level` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_access`
--

INSERT INTO `user_access` (`role`, `access_level`) VALUES
('admin', NULL),
('manager', NULL),
('user', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`),
  ADD UNIQUE KEY `branch_name` (`branch_name`);

--
-- Indexes for table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`contract_id`);

--
-- Indexes for table `custom_attribute`
--
ALTER TABLE `custom_attribute`
  ADD PRIMARY KEY (`atttr_id`),
  ADD UNIQUE KEY `field_name` (`attr_name`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `dependant`
--
ALTER TABLE `dependant`
  ADD PRIMARY KEY (`dep_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  ADD PRIMARY KEY (`emergency_contact_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `dept_id` (`dept_id`),
  ADD KEY `supervisor_id` (`supervisor_id`),
  ADD KEY `title_id` (`title_id`),
  ADD KEY `contract_id` (`contract_id`),
  ADD KEY `paygrade_id` (`paygrade_id`);

--
-- Indexes for table `emp_detail`
--
ALTER TABLE `emp_detail`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `leave_application`
--
ALTER TABLE `leave_application`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `leave_balance`
--
ALTER TABLE `leave_balance`
  ADD PRIMARY KEY (`emp_id`,`year`);

--
-- Indexes for table `org_info`
--
ALTER TABLE `org_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `info_field` (`info_field`);

--
-- Indexes for table `paygrade`
--
ALTER TABLE `paygrade`
  ADD PRIMARY KEY (`paygrade_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `title`
--
ALTER TABLE `title`
  ADD PRIMARY KEY (`title_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `emp_id` (`emp_id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `user_access`
--
ALTER TABLE `user_access`
  ADD PRIMARY KEY (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contract`
--
ALTER TABLE `contract`
  MODIFY `contract_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `custom_attribute`
--
ALTER TABLE `custom_attribute`
  MODIFY `atttr_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dependant`
--
ALTER TABLE `dependant`
  MODIFY `dep_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  MODIFY `emergency_contact_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `leave_application`
--
ALTER TABLE `leave_application`
  MODIFY `leave_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `org_info`
--
ALTER TABLE `org_info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `paygrade`
--
ALTER TABLE `paygrade`
  MODIFY `paygrade_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `title`
--
ALTER TABLE `title`
  MODIFY `title_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`);

--
-- Constraints for table `dependant`
--
ALTER TABLE `dependant`
  ADD CONSTRAINT `dependant_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);

--
-- Constraints for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  ADD CONSTRAINT `emergency_contact_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  ADD CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`emp_id`),
  ADD CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`title_id`) REFERENCES `title` (`title_id`),
  ADD CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`contract_id`) REFERENCES `contract` (`contract_id`),
  ADD CONSTRAINT `employee_ibfk_6` FOREIGN KEY (`paygrade_id`) REFERENCES `paygrade` (`paygrade_id`);

--
-- Constraints for table `leave_application`
--
ALTER TABLE `leave_application`
  ADD CONSTRAINT `leave_application_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);

--
-- Constraints for table `leave_balance`
--
ALTER TABLE `leave_balance`
  ADD CONSTRAINT `leave_balance_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role`) REFERENCES `user_access` (`role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-----
--Create triggers for updating leave balances after a leave is approved by supervisor
-----


delimiter $$
create trigger update_leaveBalances_trigger
after update on leave_application
for each row
begin
  if new.status='approved' and new.leave_type='annual' then
           update leave_balance l
           set l.annual = l.annual-1
           where l.emp_id = new.emp_id;
  end if;
  if new.status='approved' and new.leave_type='casual' then
           update leave_balance l
           set l.casual = l.casual-1
           where l.emp_id = new.emp_id;
  end if;
  if new.status='approved' and new.leave_type='maternity' then
           update leave_balance l
           set l.maternity = l.maternity-1
           where l.emp_id = new.emp_id;
  end if;
  if new.status='approved' and new.leave_type='no_pay' then
           update leave_balance l
           set l.no_pay = l.no_pay-1
           where l.emp_id = new.emp_id;
  end if;
end;
$$

 





















