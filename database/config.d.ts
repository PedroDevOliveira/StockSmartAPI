import { Options } from 'sequelize/types/sequelize';

declare module './dbConfig' {
  export interface config extends Options {}
}
