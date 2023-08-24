const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const PatientMaster = sequelize.define(
  'patientMaster',
  {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true,
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aadhar_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    patient_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_mobile_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_consent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    patient_weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = PatientMaster;
