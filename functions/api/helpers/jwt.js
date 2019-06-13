const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
      '/users',
      '/'
    ]
  }, (req) => {
    const ext = url.parse(req.originalUrl).pathname.substr(-4);
    return ['.jpg', '.html', '.css', '.js', 'ico'].indexOf(ext) !== -1
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
  return null
}
