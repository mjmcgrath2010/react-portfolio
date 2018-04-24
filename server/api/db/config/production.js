module.exports = {
  // disbable logging for production
  logging: false,
  db: {
    url: process.env.MONGODB_URI,
  },
};
