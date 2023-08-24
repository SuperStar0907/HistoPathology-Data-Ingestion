// model for adding data in visitMaster table
const VisitMaster = require('../../../models/visitMaster');
const axios = require('axios');

async function fetchImage(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

async function uploadImageToMinIO(imageData) {
  try {
    const byteNumbers = new Uint8Array(imageData);
    const blob = new Blob([byteNumbers], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');

    const config = {
      method: 'post',
      url: process.env.MINIO_URL,
      data: {
        file: imageData,
      },
    }
    const response = await axios.post(process.env.MINIO_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Uploaded to MinIO successfully');
    return response.data;
  } catch (error) {
    console.error('Error uploading to MinIO:', error);
    throw error;
  }
}

async function saveToDatabase(url, metadata) {
  const query = `INSERT INTO images (url, metadata) VALUES (?, ?)`;
  const values = [url, JSON.stringify(metadata)];

  dbConnection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error saving to database:', error);
      throw error;
    }
    console.log('Saved to database successfully');
  });
}

async function dataIngestingInVisitMaster(visit, patientPurposeId, hospitalId) {
  if (visit && patientPurposeId && patientPurposeId) {
    const visitDataInDb = await VisitMaster.create({
      patient_purpose_id: patientPurposeId,
      hospital_id: hospitalId,
      visit_date: new Date(visit.visit_date),
      visit_type: visit.visit_type,
      visit_conclusion: visit.visit_conclusion,
      disease_condition: visit.disease_condition,
    });
    return visitDataInDb.visit_id;
  }
  return -1;
}

module.exports = dataIngestingInVisitMaster;
