// model for adding data in sampleMaster table
const SampleMaster = require('../../../models/sampleMaster');

async function dataIngestingInSampleMaster(sample) {
  if (sample) {
    let sampleInDb = await SampleMaster.findOne({
      where: { sample_name: sample.sample_name, sample_detail: sample.sample_detail },
    });
    if (!sampleInDb) {
      sampleInDb = await SampleMaster.create({
        sample_name: sample.sample_name,
        sample_detail: sample.sample_detail,
      });
    }
    return sampleInDb.sample_id;
  }
  return -1;
}

module.exports = dataIngestingInSampleMaster;
