module.exports = function(session) {
  var RedisStore = require('connect-redis')(session);

  return new RedisStore({
    db: 2
  });
};

