const oEnv = {
  test: { PORT: 8001 },
  dev: { PORT: process.env.PORT },
  stag: { PORT: process.env.PORT },
  prod: { PORT: process.env.PORT }
}

module.exports = oEnv[process.env.NODE_ENV || "test"]