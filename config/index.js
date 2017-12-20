module.exports = {
  port: process.env.PORT || 3000,

  session: {
    secret: 'session-big-secret'
  },

  mongo: {
    connectUri: '',

    options: {

    }
  }
};
