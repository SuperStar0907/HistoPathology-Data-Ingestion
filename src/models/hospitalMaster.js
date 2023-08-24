const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const HospitalMaster = sequelize.define(
  'hospitalMaster',
  {
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hospital_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hospital_address: {
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

module.exports = HospitalMaster;
