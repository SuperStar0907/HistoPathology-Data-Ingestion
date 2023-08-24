// model for adding data in visitMaster table
const VisitMaster = require('../../../models/visitMaster');

async function dataIngestingInVisitMaster(visit, patientPurposeId, hospitalId) {
  if (visit && patientPurposeId) {
    let visitInDb = await VisitMaster.findOne({
      where: {
        patient_purpose_id: patientPurposeId,
        hospital_id: hospitalId,
        visit_date: new Date(visit.visit_date),
      },
    });
    if (!visitInDb) {
      console.log(visit.visit_date);
      visitInDb = await VisitMaster.create({
        patient_purpose_id: patientPurposeId,
        hospital_id: hospitalId,
        visit_date: new Date(visit.visit_date),
        visit_type: visit.visit_type,
        visit_conclusion: visit.visit_conclusion,
        disease_condition: visit.disease_condition,
      });
    }
    return visitInDb.visit_id;
  }
  return -1;
}

module.exports = dataIngestingInVisitMaster;
