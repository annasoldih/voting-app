import { Model, DataTypes } from 'sequelize';
import db from '.';

class Vote extends Model {
  public id: number;

  public candidateId: number;
}

Vote.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  candidateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'candidates',
      key: 'id',
    },
    field: 'candidate_id',
  },
}, {
  sequelize: db,
  modelName: 'Vote',
  tableName: 'Votes',
  timestamps: false,
  underscored: true,
});

export default Vote;
