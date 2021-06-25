import { EnvironmentError } from '../errors/EnvironmentError';

export function getEnv(name: string): string {
  if (process.env[name]) {
    return process.env[name] || '';
  }
  throw new EnvironmentError(name);
}

export function getEnvWithDefault(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}
