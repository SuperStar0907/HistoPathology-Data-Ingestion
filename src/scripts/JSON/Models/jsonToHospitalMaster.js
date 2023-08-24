// model for adding data in hospitalMaster table
const HospitalMaster = require('../../../models/hospitalMaster');

async function dataIngestingInHospitalMaster(visit) {
  if (visit) {
    let hospitalInDb = await HospitalMaster.findOne({
      where: { hospital_name: visit.hospital_name },
    });
    if (!hospitalInDb) {
      hospitalInDb = await HospitalMaster.create({
        hospital_name: visit.hospital_name,
        hospital_address: visit.hospital_address,
      });
    }
    return hospitalInDb.hospital_id;
  }
  return -1;
}

module.exports = dataIngestingInHospitalMaster;
