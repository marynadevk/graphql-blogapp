import 'dotenv/config';

export const config = {
  database: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  token: {
    expire: process.env.TOKEN_EXPIRES_IN
  },
};

export const validationConfig = {
  PASSWORD_MIN_LENGTH: 5,
  PASSWORD_MAX_LENGTH: 15,
}