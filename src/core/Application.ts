import { IProvider } from './interfaces/Provider';
import express, { Application as ExpressApplication } from 'express';
import { IAppConfig } from './interfaces/AppConfig';
import { WinstonLogger } from './WinstonLogger';
import { ILogger } from './logging/Logger';

class App {
  providers: IProvider[] = [];
  app: ExpressApplication;
  config: IAppConfig;
  logger: ILogger;

  constructor(config: IAppConfig) {
    this.config = config;
    this.app = express();
    this.logger = new WinstonLogger({});
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

        this.logger.error('fdgf');
        this.logger.error('s', new Error('asd'), { abc: 1 });
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
