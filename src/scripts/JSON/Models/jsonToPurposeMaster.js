// model for adding data in purposeMaster table
const PurposeMaster = require('../../../models/purposeMaster');

async function extractPurposeDetail(purpose) {
  if (purpose) {
    const purposeInDb = await PurposeMaster.create({
      purpose_name: purpose.purpose_name,
      purpose_detail: purpose.purpose_description,
    });
    return purposeInDb.purpose_id;
  }
  return -1;
}

module.exports = extractPurposeDetail;
