// model for adding data in patientMeta table
const PatientMeta = require('../../../models/patientMeta');

async function dataIngestingInPatientMeta(purpose, patientId, purposeId) {
  if (purposeId && patientId && purpose) {
    const patientMetaInDb = await PatientMeta.create({
      purpose_id: purposeId,
      patient_id: patientId,
      is_resolved: purpose.is_resolved,
    });
    return patientMetaInDb.patient_purpose_id;
  }
  return -1;
}

module.exports = dataIngestingInPatientMeta;
