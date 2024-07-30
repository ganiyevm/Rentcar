export default () => ({
  port: parseInt(process.env.PORT, 10),
  bcrypt_salt: Number(process.env.BCRYPT_SALT),
  jwt: {
    accessTime: process.env.ACCESS_TIME,
    refreshTime: process.env.REFRESH_TIME,
    tokenSecret: process.env.TOKEN_SECRET,
  },
});
