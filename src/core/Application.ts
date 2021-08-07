import express, {
  Application as ExpressApplication,
  RequestHandler,
  Router
} from 'express';
import { configureControllers } from './utils/Controller';
import { IProvider } from './interfaces/Provider';
import { ILogger } from './logging/Logger';
import { UserController } from './UserController';
import { WinstonLogFormat, WinstonLogger } from './WinstonLogger';
import { Container } from 'inversify';
import { IAppConfig } from '@config';

abstract class Application {
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
    for (const provider of this.providers) {
      provider.setup();
    }
  }

  /**
   * Setup routes
   *
   * @abstract
   * @param {Router} router
   * @memberof Application
   */
  public abstract setupRoutes(router: Router): void;

  /**
   *
   *
   * @abstract
   * @param {IAppConfig} config
   * @param {Container} container
   * @memberof Application
   */
  public abstract setup(config: IAppConfig, container: Container): void;

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
