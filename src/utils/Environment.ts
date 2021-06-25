import { EnvironmentError } from '../errors/EnvironmentError';

type Primitive = string | number | boolean;

export function getEnv<T extends Primitive>(name: string): T {
  if (process.env[name]) {
    return (process.env[name] || '') as T;
  }
  throw new EnvironmentError(name);
}

export function getEnvWithDefault<T extends Primitive>(
  name: string,
  defaultValue: T
): T {
  const envValue = process.env[name];
  if (envValue) {
    return envValue as T;
  }
  return defaultValue;
}
