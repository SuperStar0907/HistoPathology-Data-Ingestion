// model for adding data in sampleFieldMaster table
const SampleFieldMaster = require('../../../models/sampleFieldMaster');

async function dataIngestingInSampleFieldMaster(field) {
  if (field) {
    let sampleInDb = await SampleFieldMaster.findOne({
      where: { field_name: field.field_name, field_datatype: typeof field.field_value },
    });
    if (!sampleInDb) {
      sampleInDb = await SampleFieldMaster.create({
        field_name: field.field_name,
        field_datatype: typeof field.field_value,
      });
    }
    return sampleInDb.field_id;
  }
  return -1;
}

module.exports = dataIngestingInSampleFieldMaster;
