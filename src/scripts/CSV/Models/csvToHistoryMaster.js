// model for adding data in historymaster table
const HistoryMaster = require('../../../models/historyMaster');

async function extractPatientHistoryDetail(patientHistory) {
  if (patientHistory) {
    const patientHistoryInDb = await HistoryMaster.findOne({
      where: {
        patient_id: patientHistory.patient_id,
      },
    });
    if (!patientHistoryInDb) {
      await HistoryMaster.create({
        patient_id: patientHistory.patient_id,
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
  }
  return -1;
}

module.exports = extractPatientHistoryDetail;
