// model for adding data in historymaster table
const HistoryMaster = require('../../../models/historyMaster');

async function extractPatientHistoryDetail(patient, patientId) {
  if (patient && patientId && patient.patient_history) {
    const patientHistory = patient.patient_history;
    await HistoryMaster.create({
      patient_id: patientId,
      smoking: patientHistory.smoking,
      alcoholic: patientHistory.alcoholic,
      diabetic: patientHistory.diabetic,
      hypertension: patientHistory.hypertension,
      jandice: patientHistory.jandice,
      weight_loss: patientHistory.weight_loss,
      bleeding: patientHistory.bleeding,
      white_discharge_from_vagina: patientHistory.white_discharge_from_vagina,
      others: patientHistory.others,
    });
  }
  return -1;
}

module.exports = extractPatientHistoryDetail;
