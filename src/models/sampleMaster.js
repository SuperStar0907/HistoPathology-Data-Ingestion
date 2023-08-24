const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const SampleMaster = sequelize.define(
  'sampleMaster',
  {
    sample_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sample_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sample_detail: {
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

module.exports = SampleMaster;
