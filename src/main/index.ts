import app from '@/main/config/app';
import sequelize from '@config/sequelize';

const SERVER_NAME: string = 'HOST';
const SERVER_PORT: number = 3000;
const SERVER_HOST: string = 'localhost';

sequelize
  .sync()
  .then(async () => {
    console.log('[DATABASE]: Connection established!');
    app.listen(SERVER_PORT, () => {
      console.log(`[${SERVER_NAME}]: Running on http://${SERVER_HOST}:${SERVER_PORT}`);
    });
  })
  .catch((err: { message: string }) => {
    console.log('[DATABASE]: ' + err.message);
  });
