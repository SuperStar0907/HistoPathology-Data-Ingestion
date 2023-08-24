'use strict';

const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = require('../src/database');

module.exports = {
  async up (queryInterface, Sequelize) {
    // Create database
    // await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
    await sequelize.sync({ force: true });

    // Define models
    const PatientMaster = require('../src/models/patientMaster');
    await PatientMaster.sync();
    const PurposeMaster = require('../src/models/purposeMaster');
    await PurposeMaster.sync();
    const HospitalMaster = require('../src/models/hospitalMaster');
    await HospitalMaster.sync();
    const SampleMaster = require('../src/models/sampleMaster');
    await SampleMaster.sync();
    const HistoryMaster = require('../src/models/historyMaster');
    await HistoryMaster.sync();
    const PatientMeta = require('../src/models/patientMeta');
    await PatientMeta.sync();
    const VisitMaster = require('../src/models/visitMaster');
    await VisitMaster.sync();
    const VisitSampleMaster = require('../src/models/visitSampleMaster');
    await VisitSampleMaster.sync();
    const SampleFieldMaster = require('../src/models/sampleFieldMaster');
    await SampleFieldMaster.sync();
    const SampleFieldValue = require('../src/models/sampleFieldValue');
    await SampleFieldValue.sync();

    // Create tables
  },

  async down (queryInterface, Sequelize) {
    // Drop tables
    await PatientMaster.drop();
    await PurposeMaster.drop();
    await HospitalMaster.drop();
    await SampleMaster.drop();
    await HistoryMaster.drop();
    await PatientMeta.drop();
    await VisitMaster.drop();
    await VisitSampleMaster.drop();
    await SampleFieldMaster.drop();
    await SampleFieldValue.drop();

    // Drop database
    await sequelize.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
  }
};
