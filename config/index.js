module.exports = {
  port: process.env.PORT || 3000,

  session: {
    secret: 'session-big-secret'
  },

  mongo: {
    connectUri: 'mongodb://localhost:27017/webp',

    options: {
      useMongoClient: true,
      keepAlive: true,
    },
  }
};
