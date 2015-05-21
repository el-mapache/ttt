module.exports = function(storeConfig) {
  return {
    secret: 'notarealsessionsecretatall',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 3600 },
    store: storeConfig
  };
};

