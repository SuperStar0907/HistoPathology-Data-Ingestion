const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const PatientMeta = require('./patientMeta');
const HospitalMaster = require('./hospitalMaster');

const VisitMaster = sequelize.define(
  'visitMaster',
  {
    visit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_purpose_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    visit_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    visit_type: {
      type: DataTypes.ENUM('Evaluation', 'Treatment', 'Complete', 'Closed'),
      allowNull: true,
    },
    visit_conclusion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disease_condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // sample_picture: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
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

// import patient_purpose_id and hospital_id as a foreign key from respective table
VisitMaster.hasMany(PatientMeta, {
  foreignKey: 'patient_purpose_id',
  sourceKey: 'patient_purpose_id',
});

PatientMeta.belongsTo(VisitMaster, {
  foreignKey: 'patient_purpose_id',
  targetKey: 'patient_purpose_id',
});

VisitMaster.hasMany(HospitalMaster, {
  foreignKey: 'hospital_id',
  sourceKey: 'hospital_id',
});

HospitalMaster.belongsTo(VisitMaster, {
  foreignKey: 'hospital_id',
  targetKey: 'hospital_id',
});

module.exports = VisitMaster;
