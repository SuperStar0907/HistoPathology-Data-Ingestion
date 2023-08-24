const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const PatientMaster = require('./patientMaster');

const HistoryMaster = sequelize.define(
  'historyMaster',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    smoking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    alcoholic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    diabetic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    hypertension: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    jandice: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    weight_loss: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    bleeding: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    white_discharge_from_vagina: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    others: {
      type: DataTypes.STRING,
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


// HistoryMaster Table have foreign key from PatientMaster table
HistoryMaster.hasMany(PatientMaster, {
  foreignKey: 'patient_id',
  sourceKey: 'patient_id',
});

PatientMaster.belongsTo(HistoryMaster, {
  foreignKey: 'patient_id',
  targetKey: 'patient_id',
});

module.exports = HistoryMaster;
