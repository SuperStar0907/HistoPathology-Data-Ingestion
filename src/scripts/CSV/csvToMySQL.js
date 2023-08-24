const Log = require('../../logger');
const fs = require('fs');
const { parse } = require('csv-parse');
const ObjectsToCsv = require('objects-to-csv');
const extractPatientDetails = require('./Models/csvToPatientMaster');
const extractPatientHistoryDetail = require('./Models/csvToHistoryMaster');
const extractPurposeDetail = require('./Models/csvToPurposeMaster');
const dataIngestingInPatientMeta = require('./Models/csvToPatientMeta');
const dataIngestingInHospitalMaster = require('./Models/csvToHospitalMaster');
const dataIngestingInVisitMaster = require('./Models/csvToVisitMaster');
const dataIngestingInSampleMaster = require('./Models/csvToSampleMaster');
const dataIngestingInVisitSampleMaster = require('./Models/csvToVisitSampleMaster');
const dataIngestingInSampleFieldMaster = require('./Models/csvToSampleFieldMaster');
const dataIngestingInSampleFieldValue = require('./Models/csvToSampleFieldValue');

async function ingestData(data) {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      const dataEntry = data[i];
      const patient = {
        patient_gender: dataEntry[2],
        patient_name: dataEntry[0],
        aadhar_number: dataEntry[1],
        patient_birthdate: new Date(dataEntry[3]),
        patient_email: dataEntry[4],
        patient_mobile_no: dataEntry[5],
        patient_address: {
          street: dataEntry[6],
          city: dataEntry[7],
          state: dataEntry[8],
          zip: dataEntry[9],
        },
        patient_consent: dataEntry[10] === 'True',
        patient_height: parseFloat(dataEntry[11]),
        patient_weight: parseFloat(dataEntry[12]),
      };
      // data ingestion for PatientMaster table
      await extractPatientDetails(patient)
        .then(async (patientId) => {
          Log.debug(`Data for patient ${patientId} added to database patientMaster`);

          const patientHistory = {
            patient_id: patientId,
            smoking: dataEntry[13] === 'True',
            alcoholic: dataEntry[14] === 'True',
            diabetic: dataEntry[15] === 'True',
            hypertension: dataEntry[16] === 'True',
            jandice: dataEntry[17] === 'True',
            weight_loss: dataEntry[18] === 'True',
            bleeding: dataEntry[19] === 'True',
            white_discharge_from_vagina: dataEntry[20] === 'True',
            others: dataEntry[21],
          };
          // data ingestion for history master table
          await extractPatientHistoryDetail(patientHistory)
            .then(() => Log.debug(`Data for patient ${patientId} added to database historyMaster`))
            .catch((error) => {
              Log.error(error, ': historyMaster');
            });

          const purpose = {
            purpose_name: dataEntry[22],
            purpose_description: dataEntry[23],
            is_resolved: dataEntry[10] === 'True',
          };
          // data ingestion for purposeMaster table
          await extractPurposeDetail(purpose)
            .then(async (purposeId) => {
              // data ingestion for patientMeta table
              await dataIngestingInPatientMeta(purposeId, patientId, purpose.is_resolved)
                .then(async (patientPurposeId) => {
                  const visit = {
                    hospital_name: dataEntry[24],
                    hospital_address: dataEntry[24],
                    visit_date: new Date(dataEntry[25]),
                    visit_type: null,
                    visit_conclusion: dataEntry[26],
                    disease_condition: dataEntry[27],
                  };
                  // data ingestion for hospitalMaster table
                  await dataIngestingInHospitalMaster(visit)
                    .then(async (hospitalId) => {
                      // data ingestion for visitMaster table
                      await dataIngestingInVisitMaster(visit, patientPurposeId, hospitalId)
                        .then(async (visitId) => {
                          const sample = {
                            sample_name: dataEntry[28],
                            sample_detail: dataEntry[29],
                          };
                          if (sample.sample_name !== '' && sample.sample_detail !== '') {
                            // data ingestion for sampleMaster table
                            await dataIngestingInSampleMaster(sample)
                              .then(async (sampleId) => {
                                // data ingestion for visitSampleMaster table
                                await dataIngestingInVisitSampleMaster(sampleId, visitId)
                                  .then(async (visitSampleId) => {
                                    const field = {
                                      field_name: dataEntry[30],
                                      field_value: dataEntry[31],
                                    };
                                    // data ingestion for sampleFieldMaster table
                                    await dataIngestingInSampleFieldMaster(field)
                                      .then(async (fieldId) => {
                                        // data ingestion for sampleFieldValue table
                                        await dataIngestingInSampleFieldValue(field, fieldId, visitSampleId)
                                          .then(() => Log.debug(`Data for patient ${patientId} added to database sampleFieldValue`))
                                          .catch((error) => {
                                            Log.error(error, ': sampleFieldValue');
                                          });
                                      })
                                      .catch((error) => {
                                        Log.error(error, ': sampleFieldMaster');
                                      });
                                  })
                                  .catch((error) => {
                                    Log.error(error, ': visitSampleMaster');
                                  });
                              })
                              .catch((error) => {
                                Log.error(error, ': sampleMaster');
                              });
                          }
                        })
                        .catch((error) => {
                          Log.error(error, ': visitMaster');
                        });
                    })
                    .catch((error) => {
                      Log.error(error, ': hospitalMaster');
                    });
                })
                .catch((error) => {
                  Log.error(error, ': patientMeta');
                });
            })
            .catch((error) => {
              Log.error(error, ': purposeMaster');
            });
        })
        .catch((error) => {
          Log.error(error, ': patientMaster');
        });
    }
  }
}

async function mergeCSVFiles() {
  const patientDetails = [];
  const patientHistory = [];
  const visitDetails = [];

  // Read patient details CSV file
  fs.createReadStream('src/data/patient_details.csv')
    .pipe(csv())
    .on('data', (data) => patientDetails.push(data))
    .on('end', () => {
      // Read patient history CSV file
      fs.createReadStream('src/data/patient_history.csv')
        .pipe(csv())
        .on('data', (data) => patientHistory.push(data))
        .on('end', () => {
          // Read visit details CSV file
          fs.createReadStream('src/data/visit_details.csv')
            .pipe(csv())
            .on('data', (data) => visitDetails.push(data))
            .on('end', () => {
              // Merge the data from all three CSV files
              const mergedData = patientDetails.map((patient, index) => ({
                ...patient,
                ...patientHistory[index],
                ...visitDetails[index],
              }));

              // Convert the merged data to a CSV string
              const csvString = new ObjectsToCsv(mergedData).toString();

              // Write the merged data to the output file (data.csv)
              fs.writeFile('src/data/data2.csv', csvString, (err) => {
                if (err) {
                  console.error('An error occurred while writing the file:', err);
                } else {
                  console.log('Merged CSV files successfully.');
                }
              });
            });
        });
    });
}

function loadData(data) {
  if (!data) {
    // for single csv file
    // const dataCSV = [];
    // fs.createReadStream('src/data/data.csv')
    //   .pipe(parse({ delimiter: ',', from_line: 2 }))
    //   .on('data', (row) => {
    //     dataCSV.push(row);
    //   })
    //   .on('error', (error) => {
    //     Log.error(error.message);
    //   })
    //   .on('end', () => {
    //     ingestData(dataCSV);
    //   });

    // for multiple csv files
    // mergeCSVFiles();
    const dataCSV = [];
    fs.createReadStream('src/data/data2.csv')
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        dataCSV.push(row);
      }
      )
      .on('error', (error) => {
        Log.error(error.message);
      }
      )
      .on('end', () => {
        ingestData(dataCSV);
      }
      );
  }
  Log.info(`CSV to SQL script called`);
  ingestData(data);
}

module.exports = {
  loadData,
};
