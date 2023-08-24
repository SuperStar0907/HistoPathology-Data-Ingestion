// model for adding data in patientMeta table
const PatientMeta = require('../../../models/patientMeta');

async function dataIngestingInPatientMeta(purposeId, patientId) {
  if (purposeId && patientId) {
    let patientMetaInDb = await PatientMeta.findOne({
      where: {
        purpose_id: purposeId,
        patient_id: patientId,
      }
    });
    if (!patientMetaInDb) {
      patientMetaInDb = await PatientMeta.create({
        purpose_id: purposeId,
        patient_id: patientId,
        is_resolved: true,
      });
    }
    return patientMetaInDb.patient_purpose_id;
  }
  return -1;
}

module.exports = dataIngestingInPatientMeta;
