const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const VisitSampleMaster = require('./visitSampleMaster');
const SampleFieldMaster = require('./sampleFieldMaster');

const SampleFieldValue = sequelize.define(
  'sampleFieldValue',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    visit_sample_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    field_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    field_value: {
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

// import visit_sample_id and field_id as a foreign key from respective table
SampleFieldValue.hasMany(VisitSampleMaster, {
  foreignKey: 'visit_sample_id',
  sourceKey: 'visit_sample_id',
});

VisitSampleMaster.belongsTo(SampleFieldValue, {
  foreignKey: 'visit_sample_id',
  targetKey: 'visit_sample_id',
});

SampleFieldValue.hasMany(SampleFieldMaster, {
  foreignKey: 'field_id',
  sourceKey: 'field_id',
});

SampleFieldMaster.belongsTo(SampleFieldValue, {
  foreignKey: 'field_id',
  targetKey: 'field_id',
});

module.exports = SampleFieldValue;
