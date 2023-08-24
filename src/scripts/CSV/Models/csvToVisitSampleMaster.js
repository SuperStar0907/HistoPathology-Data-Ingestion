// model for adding data in visitSampleMaster table
const VisitSampleMaster = require('../../../models/visitSampleMaster');

async function dataIngestingInVisitSampleMaster(sampleId, visitId) {
  if (sampleId && visitId) {
    const visitSampleDataInDb = await VisitSampleMaster.create({
      visit_id: visitId,
      sample_id: sampleId,
    });
    return visitSampleDataInDb.visit_sample_id;
  }
  return -1;
}

module.exports = dataIngestingInVisitSampleMaster;
