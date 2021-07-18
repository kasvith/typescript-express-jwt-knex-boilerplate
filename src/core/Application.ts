import { IProvider } from './interfaces/Provider';
import express, {
  Application as ExpressApplication,
  RequestHandler
} from 'express';

import { WinstonLogFormat, WinstonLogger } from './WinstonLogger';
import { ILogger } from './logging/Logger';

import { UserController } from './UserController';
import { configureControllers } from './Controller';

class Application {
  providers: IProvider[] = [];
  server: ExpressApplication;
  logger: ILogger;

  constructor() {
    this.server = express();
    this.logger = new WinstonLogger({
      format: WinstonLogFormat.Simple,
      colorize: true
    });
  }

  registerProvider(provider: IProvider): void {
    this.providers.push(provider);
  }

  registerMiddleware(...handler: RequestHandler[]): void {
    this.server.use(...handler);
  }

  setupMiddlewares(): void {
    this.registerMiddleware(express.json());
    this.registerMiddleware(express.urlencoded({ extended: true }));
  }

  private setupProviders(): void {
    for (let i = 0; i < this.providers.length; i++) {
      this.providers[i].setup();
    }
  }

  start(port: number): void {
    try {
      this.setupProviders();
      const router = express.Router();
      configureControllers(router, [UserController]);
      this.server.use(router);

      this.server.listen(port, async () => {
        this.logger.info(`App is running on ${port}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  }
}

export default Application;
