const Boom = require('boom');

module.exports = app => {
  app.use((req, res) => {
    const { user } = req;
    const message = '404 Not Found';

    res.status(404);
    if (req.xhr) {
      res.send(Boom.notFound().output.payload);
    } else {
      res.render('error.njk', { user, message });
    }
  });

  app.use((err, req, res, next) => {
    const { user } = req;

    err = err.isBoom ? err : Boom.boomify(err, { statusCode: 500 });
    let { payload } = err.output;
    let { message } = payload;

    res.status(500);
    if (req.xhr) {
      res.send(err.output);
    } else {
      res.render('error.njk', { user, message });
    }
  });
};
