import 'dotenv/config';

const jwtSecret = process.env.API_SECRET;

export const jwtConstants = {
  secret: jwtSecret,
};
