const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const SampleFieldMaster = sequelize.define(
  'sampleFieldMaster',
  {
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    field_datatype: {
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

module.exports = SampleFieldMaster;
