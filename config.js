var shared = {
  apiUrl: process.env.API_URL || "http://localhost:8081",
  apiToken: process.env.API_TOKEN
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
