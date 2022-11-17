CREATE TABLE `status` (
  `status_id` INT,
  `type` VARCHAR(100),
  PRIMARY KEY (`status_id`)
);

CREATE TABLE `branch` (
  `branch_id` INT,
  `branch_name` VARCHAR(50),
  `address` VARCHAR(255),
  `country` VARCHAR(50),
  PRIMARY KEY (`branch_id`)
);

CREATE TABLE `department` (
  `dept_id` INT,
  `dept_name` VARCHAR(50),
  `building` VARCHAR(50),
  `branch_id` INT,
  PRIMARY KEY (`dept_id`),
  FOREIGN KEY (`branch_id`) REFERENCES `branch`(`branch_id`)
);

CREATE TABLE `title` (
  `title_id` INT,
  `job_title` VARCHAR(100),
  PRIMARY KEY (`title_id`)
);

CREATE TABLE `contract` (
  `contract_id` INT,
  `type` VARCHAR(100),
  PRIMARY KEY (`contract_id`)
);

CREATE TABLE `paygrade` (
  `paygrade_id` INT,
  `level` VARCHAR(10),
  `annual` INT,
  `casual` INT,
  `maternity` INT,
  `no_pay` INT,
  PRIMARY KEY (`paygrade_id`)
);

CREATE TABLE `employee` (
  `emp_id` VARCHAR(5),
  `full_name` VARCHAR(255),
  `first_name` VARCHAR(50),
  `last_name` VARCHAR(50),
  `birthdate` DATE,
  `marital_status` ENUM ('single', 'married', 'widowed', 'divorced', 'separated'),
  `dept_id` INT,
  `email` VARCHAR(50),
  `nic` VARCHAR(15),
  `status_id` INT,
  `contract_id` INT,
  `title_id` INT,
  `supervisor_id` VARCHAR(5),
  `paygrade_id` INT,
  PRIMARY KEY (`emp_id`),
  FOREIGN KEY (`status_id`) REFERENCES `status`(`status_id`),
  FOREIGN KEY (`dept_id`) REFERENCES `department`(`dept_id`),
  FOREIGN KEY (`supervisor_id`) REFERENCES `employee`(`emp_id`),
  FOREIGN KEY (`title_id`) REFERENCES `title`(`title_id`),
  FOREIGN KEY (`contract_id`) REFERENCES `contract`(`contract_id`),
  FOREIGN KEY (`paygrade_id`) REFERENCES `paygrade`(`paygrade_id`)
);

CREATE TABLE `user_access` (
  `role` VARCHAR(50),
  `access_level` VARCHAR(50),
  PRIMARY KEY (`role`)
);

CREATE TABLE `user` (
  `user_id` INT,
  `emp_id` VARCHAR(5),
  `role` VARCHAR(50),
  `password` VARCHAR(255),
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`),
  FOREIGN KEY (`role`) REFERENCES `user_access`(`role`)
);

CREATE TABLE `emergency_contact` (
  `emergency_contact_id` INT,
  `emp_id` VARCHAR(5),
  `contact_name` VARCHAR(255),
  `phone_no` VARCHAR(15),
  `address` VARCHAR(255),
  `relationship_to_emp` VARCHAR(50),
  PRIMARY KEY (`emergency_contact_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`)
);

CREATE TABLE `custom_field` (
  `field_id` INT,
  `field_name` VARCHAR(50),
  PRIMARY KEY (`field_id`)
);

CREATE TABLE `emp_custom_field` (
  `field_id` INT,
  `emp_id` VARCHAR(5),
  `field_val` VARCHAR(100),
  PRIMARY KEY (`field_id`, `emp_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`),
  FOREIGN KEY (`field_id`) REFERENCES `custom_field`(`field_id`)
);

CREATE TABLE `leave_balance` (
  `emp_id` VARCHAR(5),
  `year` YEAR,
  `annual` INT,
  `casual` INT,
  `maternity` INT,
  `no_pay` INT,
  PRIMARY KEY (`emp_id`, `year`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`)
);

CREATE TABLE `leave_application` (
  `leave_id` INT,
  `emp_id` VARCHAR(5),
  `leave_type` ENUM ('annual', 'casual', 'no_pay', 'maternity'),
  `date` DATE,
  `reason` VARCHAR(255),
  `status` ENUM ('pending', 'approved', 'declined'),
  PRIMARY KEY (`leave_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`)
);

CREATE TABLE `org_info` (
  `org_name` VARCHAR(255),
  `head_office` INT,
  `reg_no` VARCHAR(15)
);

CREATE TABLE `dependant` (
  `dep_id` INT,
  `emp_id` VARCHAR(5),
  `dep_name` VARCHAR(255),
  `dep_birthdate` DATE,
  `relationship_to_emp` VARCHAR(50),
  PRIMARY KEY (`dep_id`),
  FOREIGN KEY (`emp_id`) REFERENCES `employee`(`emp_id`)
);

