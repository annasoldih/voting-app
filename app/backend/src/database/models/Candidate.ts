import { Model, DataTypes } from 'sequelize';
import db from '.';

class Candidate extends Model {
  public id: number;

  public name: string;
}

Candidate.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Candidate',
  tableName: 'Candidates',
  timestamps: false,
});

export default Candidate;
