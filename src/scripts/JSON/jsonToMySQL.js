const fs = require('fs');
const Log = require('../../logger');
const extractPatientDetails = require('./Models/jsonToPatientMaster');
const extractPatientHistoryDetail = require('./Models/jsonToHistoryMaster');
const extractPurposeDetail = require('./Models/jsonToPurposeMaster');
const dataIngestingInPatientMeta = require('./Models/jsonToPatientMeta');
const dataIngestingInHospitalMaster = require('./Models/jsonToHospitalMaster');
const dataIngestingInVisitMaster = require('./Models/jsonToVisitMaster');
const dataIngestingInSampleMaster = require('./Models/jsonToSampleMaster');
const dataIngestingInVisitSampleMaster = require('./Models/jsonToVisitSampleMaster');
const dataIngestingInSampleFieldMaster = require('./Models/jsonToSampleFieldMaster');
const dataIngestingInSampleFieldValue = require('./Models/jsonToSampleFieldValue');

async function loadData(data) {
  if(!data) {
    data = JSON.parse(fs.readFileSync('src/data/data.json', 'utf-8'));
    Log.debug('Data loaded successfully');
  }

  Log.info(`Json to SQL script called for data length: ${data.length}`);
  // iteration over n-patient data
  for (let i = 0; i < data.length; i += 1) {
    const dataEntry = data[i];
    // data ingestion for PatientMaster table
    await extractPatientDetails(dataEntry)
      .then(async (patientId) => {
        Log.debug(`Data for patient ${patientId} added to database patientMaster`);

        // data ingestion for history master table
        await extractPatientHistoryDetail(dataEntry, patientId)
          .then(() => Log.debug(`Data for patient ${patientId} added to database historyMaster`))
          .catch((error) => { Log.error(error, ': historyMaster'); });

        const { patientPurpose } = dataEntry;

        // iterate over n-purpose if exist
        if (patientPurpose) {
          for (let j = 0; j < patientPurpose.length; j += 1) {
            const purpose = patientPurpose[j];

            // data ingestion for purposeMaster table
            await extractPurposeDetail(purpose)
              .then(async (purposeId) => {
                Log.debug(`Data for purpose ${purposeId}, patient ${patientId} added to database purposeMaster`)
                // data ingestion for patientMeta table
                await dataIngestingInPatientMeta(purpose, patientId, purposeId)
                .then(async (patientPurposeId) => {
                    Log.debug(`Data for purpose ${purposeId}, patient ${patientId} added to database purposeMeta`)
                    const patientVisit = purpose.visit_info;

                    // iterate over visit of patient 
                    if (patientVisit) {
                      for (let k = 0; k < patientVisit.length; k += 1) {
                        const visit = patientVisit[k];

                        // data ingestion for hospitalMaster table
                        await dataIngestingInHospitalMaster(visit)
                          .then(async (hospitalId) => {
                            Log.debug(`Data for hospital ${hospitalId} added to database hospitalMaster`);
                            // data ingestion for visitMaster table
                            await dataIngestingInVisitMaster(visit, patientPurposeId, hospitalId)
                              .then(async (visitId) => {
                                Log.debug(`Data for visit ${visit}, patient ${patientId} added to database visitMaster`)
                                const { samples } = visit;

                                // iterate over n-samples
                                if (samples) {
                                  for (let n = 0; n < samples.length; n += 1) {
                                    const sample = samples[n];

                                    // data ingestion for sampleMaster table
                                    await dataIngestingInSampleMaster(sample)
                                      .then(async (sampleId) => {
                                        Log.debug(`Data for sample ${sampleId} added to database sampleMaster`)
                                        // data ingestion for visitSampleMaster table
                                        await dataIngestingInVisitSampleMaster(sampleId, visitId)
                                          .then(async (visitSampleId) => {
                                            const sampleFields = sample.sample_fields;

                                            // iterate over n-fields
                                            if (sampleFields) {
                                              for (let m = 0; m < sampleFields.length; m += 1) {
                                                const sampleField = sampleFields[m];

                                                // data ingestion for sampleFieldMaster table
                                                await dataIngestingInSampleFieldMaster(sampleField)
                                                  .then(async (fieldId) => {
                                                    // data ingestion for sampleFieldValue table
                                                    await dataIngestingInSampleFieldValue(
                                                      sampleField,
                                                      fieldId,
                                                      visitId,
                                                      visitSampleId
                                                    )
                                                      .then(async () => {
                                                      })
                                                      .catch((error) => { Log.error(error, ': sampleFieldValue'); });
                                                  })
                                                  .catch((error) => { Log.error(error, ': sampleFieldMaster'); });
                                              }
                                            }
                                          })
                                          .catch((error) => { Log.error(error, ': visitSampleMaster'); });
                                      })
                                      .catch((error) => { Log.error(error, ': sampleMaster'); });
                                  }
                                }
                              })
                              .catch((error) => { Log.error(error, ': visitMaster'); });
                          })
                          .catch((error) => { Log.error(error, ': hospitalMaster'); });
                      }
                    }
                  })
                  .catch((error) => { Log.error(error, ': patientMeta'); });
              })
              .catch((error) => { Log.error(error, ': purposeMaster'); });
          }
        }
      })
      .catch((error) => { Log.error(error, ': patientMaster'); });
    Log.info('Data Ingested Successfully.');
  }
}

module.exports = {
  loadData,
};
