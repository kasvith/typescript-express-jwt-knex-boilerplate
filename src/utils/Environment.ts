import { EnvironmentError } from '../errors/EnvironmentError';

export function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new EnvironmentError(name);
  }

  return value;
}

export function getEnv(name: string): string | undefined {
  return process.env[name];
}
