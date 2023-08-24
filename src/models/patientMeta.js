const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const PatientMaster = require('./patientMaster');
const PurposeMaster = require('./purposeMaster');

const PatientMeta = sequelize.define(
  'patientMeta',
  {
    patient_purpose_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    purpose_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_resolved: {
      type: DataTypes.BOOLEAN,
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

// import patient_id and purpose_id as a foreign key from respective table
PatientMeta.hasMany(PatientMaster, {
  foreignKey: 'patient_id',
  sourceKey: 'patient_id',
});

PatientMaster.belongsTo(PatientMeta, {
  foreignKey: 'patient_id',
  targetKey: 'patient_id',
});

PatientMeta.hasMany(PurposeMaster, {
  foreignKey: 'purpose_id',
  sourceKey: 'purpose_id',
});

PurposeMaster.belongsTo(PatientMeta, {
  foreignKey: 'purpose_id',
  targetKey: 'purpose_id',
});

module.exports = PatientMeta;
