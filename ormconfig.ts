try {
    const Dotenv = require('dotenv');
    const path = require('path');
    const NestEnvConfiguration = require('./src/config/load.env.config');
    const EnvConfiguration = require("./src/config/env.config");
    
    let envData = Dotenv.config({ path: `${path.join(process.env.PWD)}/${EnvConfiguration.envFilePathConfiguration()}` }).parsed
    let envs = NestEnvConfiguration.envModelTransformer(envData);
    module.exports = {
        ...envs.DATABASE,
        migrations: [ "src/migrations/**/*.{ts,js}" ],
        entities: [ "src/models/entities/**/*.{ts,js}" ],
        cli: {
            entitiesDir: "src/models/entities",
            migrationsDir: "src/migrations"
        }
    };
  } catch (error) {
    module.exports = {};
  }