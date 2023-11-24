import { Sequelize } from 'sequelize';
import dbConfig from '../../database/config.js';
export default new Sequelize(dbConfig);
