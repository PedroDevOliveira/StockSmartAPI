import SequelizeHelper from '@/main/config/sequelize';
import { DataTypes, Model } from 'sequelize';

class ProductModel extends Model {}

export default ProductModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'product',
    timestamps: false,
    sequelize: SequelizeHelper
  }
);
