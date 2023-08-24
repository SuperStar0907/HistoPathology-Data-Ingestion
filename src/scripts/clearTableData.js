const Log = require('../logger');
const PatientMaster = require('../models/patientMaster');
const HistoryMaster = require('../models/historyMaster');
const PurposeMaster = require('../models/purposeMaster');
const HospitalMaster = require('../models/hospitalMaster');
const PatientMeta = require('../models/patientMeta');
const VisitMaster = require('../models/visitMaster');
const SampleMaster = require('../models/sampleMaster');
const VisitSampleMaster = require('../models/visitSampleMaster');
const SampleFieldMaster = require('../models/sampleFieldMaster');
const SampleFieldValue = require('../models/sampleFieldValue');

async function clearData() {
  try {
    await PatientMaster.destroy({ where: {} });
    await HistoryMaster.destroy({ where: {} });
    await PurposeMaster.destroy({ where: {} });
    await VisitMaster.destroy({ where: {} });
    await VisitSampleMaster.destroy({ where: {} });
    await SampleFieldMaster.destroy({ where: {}});
    await SampleMaster.destroy({ where: {} });
    await SampleFieldValue.destroy({ where: {} });
    await HospitalMaster.destroy({ where: {} });
    await PatientMeta.destroy({ where: {} });

    Log.info("All data cleared successfully.")
  } catch (err) {
    Log.error(err,'Clearing Data');
  }
}

module.exports = {
  clearData,
};
