import SequelizeHelper from '@/main/config/sequelize';
import { DataTypes, Model } from 'sequelize';

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUID
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hashed: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'user',
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    deletedAt: 'removedAt',
    underscored: true,
    sequelize: SequelizeHelper
  }
);

export default UserModel;
