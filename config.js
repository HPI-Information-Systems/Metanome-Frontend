var shared = {
  API: process.env.API_URL || "http://localhost:8081",
  TOKEN: process.env.API_TOKEN
};



var environments = {
  development: {
    ENV_VARS: shared
  },
  production: {
     ENV_VARS: shared
    }
};


module.exports = environments;
