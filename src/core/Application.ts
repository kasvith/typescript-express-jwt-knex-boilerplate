import { IProvider } from './interfaces/Provider';
import express, {
  Application as ExpressApplication,
  RequestHandler
} from 'express';
import { IAppConfig } from './config';
import { WinstonLogFormat, WinstonLogger } from './WinstonLogger';
import { ILogger } from './logging/Logger';
import container from './di/container';

class Application {
  providers: IProvider[] = [];
  app: ExpressApplication;
  config: IAppConfig;
  logger: ILogger;

  constructor(config: IAppConfig) {
    this.config = config;
    this.app = express();
    this.logger = new WinstonLogger({
      format: WinstonLogFormat.Simple,
      colorize: true
    });
  }

  registerProvider(provider: IProvider): void {
    this.providers.push(provider);
  }

  registerMiddleware(...handler: RequestHandler[]): void {
    this.app.use(...handler);
  }

  setupMiddlewares(): void {
    this.registerMiddleware(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupProviders(): void {
    for (let i = 0; i < this.providers.length; i++) {
      this.providers[i].setup();
    }
  }

  start(): void {
    try {
      this.setupProviders();

      this.app.listen(this.config.port, async () => {
        this.logger.info(`App is running on ${this.config.port}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  }
}

export default Application;
