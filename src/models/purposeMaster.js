const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const PurposeMaster = sequelize.define(
  'purposeMaster',
  {
    purpose_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    purpose_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purpose_detail: {
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

module.exports = PurposeMaster;
