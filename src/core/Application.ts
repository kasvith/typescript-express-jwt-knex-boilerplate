import { IProvider } from './interfaces/Provider';
import express, { Application as ExpressApplication } from 'express';
import { IAppConfig } from './interfaces/AppConfig';
import { Logger, LogLevel } from './WinstonLogger';
import { ILogger } from './interfaces/Logger';

class App {
  providers: IProvider[] = [];
  app: ExpressApplication;
  config: IAppConfig;
  logger: ILogger;

  constructor(config: IAppConfig) {
    this.config = config;
    this.app = express();
    this.logger = new Logger(LogLevel.Info);
  }

  registerProvider(provider: IProvider): void {
    this.providers.push(provider);
  }

  setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeProviders(): void {
    for (let i = 0; i < this.providers.length; i++) {
      this.providers[i].setup();
    }
  }

  start(): void {
    try {
      this.initializeProviders();
      this.setupMiddlewares();

      this.app.listen(this.config.port, async () => {
        this.logger.info('working');
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
