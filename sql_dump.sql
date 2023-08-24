CREATE TABLE `patientMaster` (
  `patient_id` integer PRIMARY KEY,
  `patient_gender` ENUM ('Male', 'Female', 'Other'),
  `patient_name` varchar(255),
  `aadhar_number` varchar(255),
  `patient_birthdate` date,
  `patient_email` varchar(255),
  `patient_age` integer,
  `patient_mobile_no` varchar(255),
  `patient_address` text,
  `patient_consent` varchar(255),
  `patient_height` float,
  `patient_weight` float,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `purposeMaster` (
  `purpose_id` integer PRIMARY KEY,
  `purpose_name` varchar(255),
  `purpose_detail` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `patientMeta` (
  `patient_purpose_id` integer PRIMARY KEY,
  `purpose_id` integer,
  `patient_id` integer,
  `is_resolved` boolean,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `historyMaster` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `patient_id` int,
  `smoking` bool,
  `alcoholic` bool,
  `diabetic` bool,
  `hypertension` bool,
  `jandice` bool,
  `weight_loss` bool,
  `bleeding` bool,
  `white_discharge_from_vagina` bool,
  `others` text,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `hospitalMaster` (
  `hospital_id` integer PRIMARY KEY,
  `hospital_name` varchar(255),
  `hospital_address` text,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `visitMaster` (
  `visit_id` integer PRIMARY KEY,
  `patient_purpose_id` integer,
  `hospital_id` integer,
  `visit_date` datetime,
  `visit_type` ENUM ('Evaluation', 'Treatment', 'Complete', 'Closed'),
  `visit_conclusion` text,
  `disease_condition` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `sampleMaster` (
  `sample_id` integer PRIMARY KEY,
  `sample_name` varchar(255),
  `sample_detail` text,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `sampleFieldMaster` (
  `field_id` integer PRIMARY KEY,
  `field_name` varchar(255),
  `field_datatype` varchar(255),
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `visitSampleMaster` (
  `visit_sample_id` integer PRIMARY KEY,
  `visit_id` integer,
  `sample_id` integer,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `sampleFieldValue` (
  `id` integer PRIMARY KEY,
  `visit_sample_id` integer,
  `field_id` integer,
  `field_value` field_datatype,
  `created_at` datetime,
  `updated_at` datetime
);

ALTER TABLE `patientMeta` ADD FOREIGN KEY (`purpose_id`) REFERENCES `purposeMaster` (`purpose_id`);

ALTER TABLE `patientMeta` ADD FOREIGN KEY (`patient_id`) REFERENCES `patientMaster` (`patient_id`);

ALTER TABLE `historyMaster` ADD FOREIGN KEY (`patient_id`) REFERENCES `patientMaster` (`patient_id`);

ALTER TABLE `visitMaster` ADD FOREIGN KEY (`hospital_id`) REFERENCES `hospitalMaster` (`hospital_id`);

ALTER TABLE `visitMaster` ADD FOREIGN KEY (`patient_purpose_id`) REFERENCES `patientMeta` (`patient_purpose_id`);

ALTER TABLE `visitSampleMaster` ADD FOREIGN KEY (`visit_id`) REFERENCES `visitMaster` (`visit_id`);

ALTER TABLE `visitSampleMaster` ADD FOREIGN KEY (`sample_id`) REFERENCES `sampleMaster` (`sample_id`);

ALTER TABLE `sampleFieldValue` ADD FOREIGN KEY (`visit_sample_id`) REFERENCES `visitSampleMaster` (`visit_sample_id`);

ALTER TABLE `sampleFieldValue` ADD FOREIGN KEY (`field_id`) REFERENCES `sampleFieldMaster` (`field_id`);
