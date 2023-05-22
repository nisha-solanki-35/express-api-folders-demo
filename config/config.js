const oEnv = {
  test: { PORT: 8001 },
  dev: { PORT: process.env.PORT },
  stag: { PORT: process.env.PORT },
  prod: { PORT: process.env.PORT },
};

const JWT_KEY = process.env.JWT_SECRET_KEY

module.exports = { PORT: oEnv[process.env.NODE_ENV || 'test'].PORT, JWT_KEY }
