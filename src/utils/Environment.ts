import { EnvironmentError } from '../errors/EnvironmentError';

type PrimitiveType = string | number | boolean;

export enum EnvType {
  string,
  number
}

export function getEnv(
  name: string,
  type: EnvType = EnvType.string
): PrimitiveType {
  const value = process.env[name];
  if (!value) {
    throw new EnvironmentError(name);
  }

  switch (type) {
    case EnvType.string:
      return value;

    case EnvType.number:
      return Number(value);

    default:
      throw new EnvironmentError(name);
      break;
  }
}

export function getEnvWithDefault<T extends PrimitiveType>(
  name: string,
  defaultValue: T
): T {
  const envValue = process.env[name];
  if (envValue) {
    return envValue as T;
  }
  return defaultValue;
}
