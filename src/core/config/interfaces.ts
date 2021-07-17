export interface ILogConfig {
  level?: string;
  colored?: boolean;
}

export interface IAppConfig {
  port: number;
  app?: string;
  env: string;
  secret?: string;
  hostname?: string;

  isDevEnv: boolean;
  isTestEnv: boolean;
  isProdEnv: boolean;

  logging?: ILogConfig;
}
