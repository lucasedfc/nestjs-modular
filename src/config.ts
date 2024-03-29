import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.PORT,
    },
    apiKey: process.env.API_KEY,
    configuration: process.env.CONFIGURATION,
  };
});
