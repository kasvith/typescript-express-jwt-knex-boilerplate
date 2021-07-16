export interface ILogConfig {
  level: string;
  color: boolean;
}

export interface IAppConfig {
  port: number;
  name?: string;
  env: string;
  secret: string;
  hostname: string;

  isDevEnv: boolean;
  isTestEnv: boolean;
  isProdEnv: boolean;
  isEnv(env: string): boolean;

  logging: ILogConfig;
}
