import express, {
  Application as ExpressApplication,
  RequestHandler,
  Router
} from 'express';
import { IProvider } from './interfaces/Provider';
import { Container } from 'inversify';
import { IAppConfig } from '@config';
import config from '@/config/config';
import container from '@di/container';

abstract class Application {
  providers: IProvider[] = [];
  server: ExpressApplication;
  config: IAppConfig;

  protected constructor() {
    this.server = express();
    this.config = config;
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
      // start setup
      this.setup(this.config, container);

      console.log(container);

      // initialize providers
      this.setupProviders();

      // create and configure routes
      const router = Router();
      this.setupRoutes(router);
      this.server.use(router);

      this.server.listen(port, async () => {});
    } catch (error) {
      console.error(error);
      process.exit(-1);
    }
  }
}

export default Application;
