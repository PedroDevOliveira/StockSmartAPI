import { Sequelize } from 'sequelize';
import dbConfig from '../../../database/config';
export default new Sequelize(dbConfig);
