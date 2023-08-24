const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const SampleMaster = require('./sampleMaster');
const VisitMaster = require('./visitMaster');

const VisitSampleMaster = sequelize.define(
  'visitSampleMaster',
  {
    visit_sample_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    visit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sample_id: {
      type: DataTypes.INTEGER,
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

// import sample_id and visit_id as a foreign key from respective table
VisitSampleMaster.hasMany(SampleMaster, {
  foreignKey: 'sample_id',
  sourceKey: 'sample_id',
});

SampleMaster.belongsTo(VisitSampleMaster, {
  foreignKey: 'sample_id',
  targetKey: 'sample_id',
});

VisitSampleMaster.hasMany(VisitMaster, {
  foreignKey: 'visit_id',
  sourceKey: 'visit_id',
});

VisitMaster.belongsTo(VisitSampleMaster, {
  foreignKey: 'visit_id',
  targetKey: 'visit_id',
});

module.exports = VisitSampleMaster;
