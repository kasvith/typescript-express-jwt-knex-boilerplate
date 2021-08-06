import express, {
  Application as ExpressApplication,
  RequestHandler,
  Router
} from 'express';
import { configureControllers } from './Controller';
import { IProvider } from './interfaces/Provider';
import { ILogger } from './logging/Logger';
import { UserController } from './UserController';
import { WinstonLogFormat, WinstonLogger } from './WinstonLogger';

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

  public abstract setupRoutes(router: Router): void;

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
