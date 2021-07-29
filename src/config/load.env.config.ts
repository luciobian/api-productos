export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
  DATABASE: {
    host: envs.DATABASE_HOST,
    port: parseInt(envs.DATABASE_PORT, 10) || 5432,
    username: envs.DATABASE_USER,
    password: envs.DATABASE_PASS,
    database: envs.DATABASE_NAME,
    type: envs.DATABASE_TYPE,
    synchronize: envs.DATABASE_SYNC,
    autoLoadEntities: envs.DATABASE_AUTO_LOAD_ENTITIES,
    keepConnectionAlive: envs.DATABASE_KEEP_CONNECTION_ALIVE
  }
});
