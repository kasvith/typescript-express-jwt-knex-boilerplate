export interface Config {
  port: number;
  name?: string;
  env: string;
  secret: string;
  hostname: string;
  mongo: {
    uri: string;
  };
  transporter?: {
    smtp?: {
      host?: string;
      port?: number;
      username?: string;
      password?: string;
    };
  };
  isDevEnv: boolean;
}
