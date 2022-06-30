import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
});

export default User;
