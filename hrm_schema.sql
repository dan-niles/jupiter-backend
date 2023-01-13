-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2023 at 07:27 AM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `PR_add_emp_detail` (IN `column_name` VARCHAR(255), IN `data_type` VARCHAR(255))   BEGIN
     IF data_type = 'VARCHAR' THEN
        SET @STMT = CONCAT("ALTER TABLE emp_detail ADD COLUMN ", column_name, " VARCHAR(255)");
    ELSEIF data_type = 'INT' THEN
        SET @STMT = CONCAT("ALTER TABLE emp_detail ADD COLUMN ", column_name, " INT");
    END IF;
    PREPARE emp FROM @STMT;
    EXECUTE emp;
    DEALLOCATE PREPARE emp;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PR_delete_emp_detail` (IN `column_name` VARCHAR(255))   BEGIN
    SET @STMT = CONCAT("ALTER TABLE emp_detail DROP COLUMN ", column_name);
    PREPARE emp_d FROM @STMT;
    EXECUTE emp_d;
    DEALLOCATE PREPARE emp_d;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PR_no_of_records` (IN `table_name` VARCHAR(100))   BEGIN
    DECLARE a INT;
    SET @STMT = CONCAT("select count(*)  from ", table_name);
    PREPARE a FROM @STMT;
    EXECUTE a;
   
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `FN_alloc_leaves` (`id` VARCHAR(5), `typeOfLeave` VARCHAR(255)) RETURNS INT DETERMINISTIC COMMENT 'function to retrieve the total leave count allocated for the employeee' begin
    declare a int;
    set a=0;
    if typeOfLeave = 'annual' then
           select annual into a from employee INNER JOIN paygrade ON employee.paygrade_id=paygrade.paygrade_id where emp_id=id;
    end if;
    if typeOfLeave = 'casual' then
           select casual into a from employee INNER JOIN paygrade ON employee.paygrade_id=paygrade.paygrade_id where emp_id=id;
    end if;
    if typeOfLeave = 'maternity' then
           select maternity into a from employee INNER JOIN paygrade ON employee.paygrade_id=paygrade.paygrade_id where emp_id=id;
    end if;
    if typeOfLeave = 'no_pay' then
           select no_pay into a from employee INNER JOIN paygrade ON employee.paygrade_id=paygrade.paygrade_id where emp_id=id;
    end if;
      
    return a;
end$$

CREATE DEFINER=`root`@`localhost` FUNCTION `FN_no_of_leaves` (`id` VARCHAR(5), `typeOfLeave` VARCHAR(255)) RETURNS INT DETERMINISTIC COMMENT 'function to retrieve the number of leave balances for the employ' begin
    declare a int;
    set a=0;
    if typeOfLeave = 'annual' then
           select annual into a from leave_balance where emp_id=id;
    end if;
    if typeOfLeave = 'casual' then
           select casual into a from leave_balance where emp_id=id;
    end if;
    if typeOfLeave = 'maternity' then
           select maternity into a from leave_balance where emp_id=id;
    end if;
    if typeOfLeave = 'no_pay' then
           select no_pay into a from leave_balance where emp_id=id;
    end if;
      
    return a;
end$$

DELIMITER ;

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
(1, 'Katubedda', '26 Piliyandala Road, Katubedda, Colombo', 'Sri Lanka'),
(2, 'Mumbai', '16 - Waman Patil Ind Estate, Near Dukes Factory, Chembur', 'India'),
(3, 'Dhaka', 'Meher Tower (7th Floor); 164 Sonargaon Road, Hatirpool, 1205', 'Bangladesh'),
(4, 'Karachi', 'Block-17, Gulistan-E-Jouhar, Karachi', 'Pakistan');

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
(1, 'Full-time'),
(2, 'Part-time'),
(3, 'Freelance');

-- --------------------------------------------------------

--
-- Table structure for table `custom_attribute`
--

CREATE TABLE `custom_attribute` (
  `attr_id` int NOT NULL,
  `attr_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `alias` varchar(255) NOT NULL,
  `data_type` enum('VARCHAR','INT') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `custom_attribute`
--

INSERT INTO `custom_attribute` (`attr_id`, `attr_name`, `alias`, `data_type`) VALUES
(1, 'nationality', 'Nationality', 'VARCHAR'),
(2, 'blood_group', 'Blood Group', 'VARCHAR'),
(3, 'religion', 'Religion', 'VARCHAR'),
(9, 'home_town', 'Hometown', 'VARCHAR');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int NOT NULL,
  `dept_name` varchar(50) NOT NULL,
  `dept_code` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`, `dept_code`) VALUES
(1, 'ICT', 'D0001'),
(2, 'HR', 'D0002'),
(3, 'Finance', 'D0003'),
(4, 'Marketing', 'D0004'),
(5, 'Production', 'D0005');

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
(1, '00001', 'James', '2022-11-19', 'Brother'),
(8, '00001', 'Jack', '2023-01-18', 'Brother'),
(9, '00002', 'David', '2006-01-11', 'Father');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_contact`
--

CREATE TABLE `emergency_contact` (
  `emergency_contact_id` int NOT NULL,
  `emp_id` varchar(5) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `emergency_contact`
--

INSERT INTO `emergency_contact` (`emergency_contact_id`, `emp_id`, `contact_name`, `phone_no`, `address`) VALUES
(1, '00001', 'James', '947736723456', '56 Temple Road, Mount Lavinia, Colombo'),
(4, '00001', 'Jack', '947733242343', '56 Temple Road, Mount Lavinia, Colombo'),
(5, '00002', 'David', '94767873465', '28, Galle Road, Wellawate, Colombo');

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
('00001', 'Johnathan Wick', 'John', 'Wick', '2000-11-16', 'single', 1, 'john@jupiter.com', '2000046782678', 1, 1, 5, NULL, 2),
('00002', 'Dave Windler', 'Dave', 'Windler', '1997-11-19', 'married', 1, 'dave@jupiter.com', '9700046782678', 1, 1, 1, '00001', 4),
('00003', 'Darren John Bruen', 'Darren', 'Bruen', '1993-01-14', 'married', 2, 'darren@jupiter.com', '9600047882678', 2, 2, 6, '00002', 3),
('00004', 'Kurt Corwin', 'Kurt', 'Corwin', '1989-08-08', 'single', 1, 'kurt@jupiter.com', '9300047884448', 2, 3, 7, '00002', 3);

--
-- Triggers `employee`
--
DELIMITER $$
CREATE TRIGGER `TR_employee_create_emp_detail` AFTER INSERT ON `employee` FOR EACH ROW BEGIN
INSERT INTO emp_detail (emp_id) VALUES (new.emp_id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TR_employee_create_leave_balance` AFTER INSERT ON `employee` FOR EACH ROW BEGIN
DECLARE a,c,m,n INT;
SELECT annual,casual,maternity,no_pay INTO a,c,m,n FROM paygrade WHERE paygrade_id=new.paygrade_id;
INSERT INTO leave_balance (emp_id,year,annual,casual,maternity,no_pay) VALUES (new.emp_id,YEAR(CURDATE()),a,c,m,n);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TR_employee_delete_dependants` BEFORE DELETE ON `employee` FOR EACH ROW BEGIN
DELETE FROM dependant l WHERE l.emp_id = old.emp_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TR_employee_delete_emer_contacts` BEFORE DELETE ON `employee` FOR EACH ROW BEGIN
DELETE FROM emergency_contact l WHERE l.emp_id = old.emp_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TR_employee_delete_emp_detail` BEFORE DELETE ON `employee` FOR EACH ROW BEGIN
DELETE FROM emp_detail l WHERE l.emp_id = old.emp_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TR_employee_delete_leave_balance` BEFORE DELETE ON `employee` FOR EACH ROW BEGIN
DELETE FROM leave_balance l WHERE l.emp_id = old.emp_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `employee_info`
-- (See below for the actual view)
--
CREATE TABLE `employee_info` (
`contract_type` varchar(100)
,`dept_name` varchar(50)
,`emp_id` varchar(5)
,`first_name` varchar(50)
,`full_name` varchar(255)
,`job_title` varchar(100)
,`last_name` varchar(50)
,`paygrade_level` varchar(10)
,`status_type` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `emp_detail`
--

CREATE TABLE `emp_detail` (
  `emp_id` varchar(5) NOT NULL,
  `nationality` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `blood_group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `home_town` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `emp_detail`
--

INSERT INTO `emp_detail` (`emp_id`, `nationality`, `blood_group`, `religion`, `home_town`) VALUES
('00001', 'Sri Lankan', 'A+', 'Christian', 'Colombo'),
('00002', 'Sri Lankan', 'O+', 'Muslim', 'Kandy'),
('00003', 'Sri Lankan', 'AB+', 'Buddhist', 'Galle'),
('00004', 'Indian', 'B-', 'Hindu', 'Chennai');

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
(1, '00001', 'annual', '2022-11-10', 'Vacation', 'approved'),
(2, '00003', 'casual', '2023-01-19', 'Sick Leave', 'approved');

--
-- Triggers `leave_application`
--
DELIMITER $$
CREATE TRIGGER `TR_leave_application_update_leave_balance` AFTER UPDATE ON `leave_application` FOR EACH ROW begin
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
end
$$
DELIMITER ;

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
('00001', 2022, 13, 12, 10, 50),
('00002', 2022, 14, 12, 10, 50),
('00003', 2022, 14, 11, 10, 50),
('00004', 2022, 14, 12, 10, 50);

-- --------------------------------------------------------

--
-- Stand-in structure for view `leave_balance_info`
-- (See below for the actual view)
--
CREATE TABLE `leave_balance_info` (
`alloc_annual` int
,`alloc_casual` int
,`alloc_maternity` int
,`alloc_no_pay` int
,`annual` int
,`casual` int
,`dept_name` varchar(50)
,`emp_id` varchar(5)
,`first_name` varchar(50)
,`full_name` varchar(255)
,`job_title` varchar(100)
,`last_name` varchar(50)
,`maternity` int
,`no_pay` int
,`year` year
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `leave_info`
-- (See below for the actual view)
--
CREATE TABLE `leave_info` (
`date` date
,`dept_name` varchar(50)
,`emp_id` varchar(5)
,`first_name` varchar(50)
,`full_name` varchar(255)
,`last_name` varchar(50)
,`leave_type` enum('annual','casual','no_pay','maternity')
,`status` enum('pending','approved','declined')
);

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
(4, 'reg_no', 'Registration No', 'KEJ1765325'),
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
(2, 'Contract'),
(3, 'Intern'),
(1, 'Permanent');

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
(7, 'Network Engineer'),
(8, 'Accountant'),
(9, 'QA Engineer'),
(10, 'Software Architect'),
(11, 'Intern Software Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `emp_id` varchar(5) NOT NULL,
  `role` varchar(50) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `emp_id`, `role`, `username`, `password`, `is_active`) VALUES
(1, '00001', 'admin', 'admin', '$2b$10$FFSpnz/YpIY8VbVEjGkk1.UpbmJuUIdmJDgxmaksLogoJvKGBHg.W', 1),
(2, '00004', 'user', 'user', '$2b$10$WwRFhuiZW7WmmaSe.K13Wu5YZe/UmFLYh5YZkPWm4Tdihj.Ufmk0C', 1),
(3, '00003', 'manager', 'manager', '$2b$10$WwRFhuiZW7WmmaSe.K13Wu5YZe/UmFLYh5YZkPWm4Tdihj.Ufmk0C', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_access`
--

CREATE TABLE `user_access` (
  `id` int NOT NULL,
  `role` enum('admin','user','manager','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `access_level` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_access`
--

INSERT INTO `user_access` (`id`, `role`, `access_level`) VALUES
(1, 'admin', 'users-view'),
(2, 'admin', 'users-add'),
(3, 'admin', 'users-edit'),
(4, 'admin', 'users-delete'),
(5, 'admin', 'employees-view'),
(6, 'admin', 'employees-add'),
(7, 'admin', 'employees-edit'),
(8, 'admin', 'employees-delete'),
(9, 'admin', 'org-info-manage'),
(10, 'admin', 'branches-manage'),
(11, 'admin', 'departments-manage'),
(12, 'admin', 'custom-attributes-manage'),
(13, 'admin', 'leave-config-manage'),
(14, 'admin', 'reports'),
(15, 'manager', 'employees-view'),
(16, 'manager', 'employees-add'),
(17, 'manager', 'employees-edit'),
(18, 'manager', 'reports');

-- --------------------------------------------------------

--
-- Structure for view `employee_info`
--
DROP TABLE IF EXISTS `employee_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `employee_info`  AS SELECT `employee`.`emp_id` AS `emp_id`, `employee`.`full_name` AS `full_name`, `employee`.`first_name` AS `first_name`, `employee`.`last_name` AS `last_name`, `department`.`dept_name` AS `dept_name`, `title`.`job_title` AS `job_title`, `status`.`type` AS `status_type`, `contract`.`type` AS `contract_type`, `paygrade`.`level` AS `paygrade_level` FROM (((((`employee` left join `department` on((`department`.`dept_id` = `employee`.`dept_id`))) left join `title` on((`employee`.`title_id` = `title`.`title_id`))) left join `status` on((`employee`.`status_id` = `status`.`status_id`))) left join `contract` on((`employee`.`contract_id` = `contract`.`contract_id`))) left join `paygrade` on((`employee`.`paygrade_id` = `paygrade`.`paygrade_id`))) WHERE (`department`.`dept_name` is not null)  ;

-- --------------------------------------------------------

--
-- Structure for view `leave_balance_info`
--
DROP TABLE IF EXISTS `leave_balance_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `leave_balance_info`  AS SELECT `employee`.`emp_id` AS `emp_id`, `employee`.`full_name` AS `full_name`, `employee`.`first_name` AS `first_name`, `employee`.`last_name` AS `last_name`, `department`.`dept_name` AS `dept_name`, `title`.`job_title` AS `job_title`, `leave_balance`.`year` AS `year`, `leave_balance`.`annual` AS `annual`, `paygrade`.`annual` AS `alloc_annual`, `leave_balance`.`casual` AS `casual`, `paygrade`.`casual` AS `alloc_casual`, `leave_balance`.`maternity` AS `maternity`, `paygrade`.`maternity` AS `alloc_maternity`, `leave_balance`.`no_pay` AS `no_pay`, `paygrade`.`no_pay` AS `alloc_no_pay` FROM ((((`leave_balance` join `employee` on((`employee`.`emp_id` = `leave_balance`.`emp_id`))) join `department` on((`employee`.`dept_id` = `department`.`dept_id`))) join `title` on((`employee`.`title_id` = `title`.`title_id`))) join `paygrade` on((`employee`.`paygrade_id` = `paygrade`.`paygrade_id`)))  ;

-- --------------------------------------------------------

--
-- Structure for view `leave_info`
--
DROP TABLE IF EXISTS `leave_info`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `leave_info`  AS SELECT `department`.`dept_name` AS `dept_name`, `e`.`emp_id` AS `emp_id`, `e`.`full_name` AS `full_name`, `e`.`first_name` AS `first_name`, `e`.`last_name` AS `last_name`, `la`.`leave_type` AS `leave_type`, `la`.`date` AS `date`, `la`.`status` AS `status` FROM (`leave_application` `la` left join (`employee` `e` join `department` on((`department`.`dept_id` = `e`.`dept_id`))) on((`e`.`emp_id` = `la`.`emp_id`))) WHERE (`department`.`dept_name` is not null)  ;

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
  ADD PRIMARY KEY (`attr_id`),
  ADD UNIQUE KEY `field_name` (`attr_name`),
  ADD UNIQUE KEY `attr_name` (`attr_name`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`),
  ADD UNIQUE KEY `dept_code` (`dept_code`);

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
  ADD PRIMARY KEY (`emp_id`);

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contract`
--
ALTER TABLE `contract`
  MODIFY `contract_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `custom_attribute`
--
ALTER TABLE `custom_attribute`
  MODIFY `attr_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dependant`
--
ALTER TABLE `dependant`
  MODIFY `dep_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  MODIFY `emergency_contact_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `leave_application`
--
ALTER TABLE `leave_application`
  MODIFY `leave_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `title_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `user_access`
--
ALTER TABLE `user_access`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `emp_detail`
--
ALTER TABLE `emp_detail`
  ADD CONSTRAINT `emp_detail_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
