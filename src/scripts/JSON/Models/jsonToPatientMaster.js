// model for adding data in patientMaster table
const PatientMaster = require('../../../models/patientMaster');

async function extractPatientDetails(patient) {
  if (patient) {
    const patientInDb = await PatientMaster.create({
      patient_gender: patient.patient_gender,
      patient_name: patient.patient_name,
      aadhar_number: patient.aadhar_number,
      patient_birthdate: new Date(patient.patient_birthdate),
      patient_email: patient.patient_email,
      patient_mobile_no: patient.patient_mobile_no,
      patient_address: `${patient.patient_address.street}, ${patient.patient_address.city}, ${patient.patient_address.state} ${patient.patient_address.zip}`,
      patient_consent: patient.patient_consent,
      patient_height: parseFloat(patient.patient_height),
      patient_weight: parseFloat(patient.patient_weight),
    });
    return patientInDb.patient_id;
  }
  return -1;
}

module.exports = extractPatientDetails;
