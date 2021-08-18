export const envFilePathConfiguration = (): string => {
  let envFilePath = `.env`;
  if (process.env.NODE_ENV === 'local') envFilePath = `${envFilePath}.${process.env.NODE_ENV}`;
  return envFilePath;
};
