// model for adding data in sampleFieldValue table
const SampleFieldValue = require('../../../models/sampleFieldValue');

async function dataIngestingInSampleFieldValue(field, fieldId, visitSampleId) {
  if (field && fieldId && visitSampleId) {
    await SampleFieldValue.create({
      visit_sample_id: visitSampleId,
      field_id: fieldId,
      field_value: field.field_value,
    });
  }
  return -1;
}

module.exports = dataIngestingInSampleFieldValue;
