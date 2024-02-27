function getEnv(key: string): string {
  const envVar = process.env[key];
  if (!envVar) throw new Error(`Missing environment variable: ${key}`);
  return envVar;
}

export const config = {
  JWT_PRIVATE_KEY: getEnv("JWT_PRIVATE_KEY"),
};
