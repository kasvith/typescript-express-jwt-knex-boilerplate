import { IProvider } from './interfaces/Provider';
import express, {
  Application as ExpressApplication,
  RequestHandler,
  Router
} from 'express';

import { WinstonLogFormat, WinstonLogger } from './WinstonLogger';
import { ILogger } from './logging/Logger';
import { RouteConfig } from './decorators/express/common/RouteConfig';
import { UserController } from './UserController';

function configureControllers(router: Router, controllers: any[]) {
  controllers.forEach((controller) => {
    // This is our instantiated class
    const instance = new controller();
    // The prefix saved to our controller
    const prefix = Reflect.getMetadata('router:prefix', controller);
    // Our `routes` array containing all our routes for this controller
    const routes: Map<string, RouteConfig> = Reflect.getMetadata(
      'routes',
      controller
    );

    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      console.log(
        `config:route ${route.requestMethod?.toUpperCase()} ${prefix}${
          route.path
        }`
      );
      // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
      // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
      // this should be enough for now.

      if (route.requestMethod) {
        const path = prefix + route.path;
        const params = [];

        if (route.middlewares) {
          // remember decoraters returns result bottom to top
          // so inorder to maintain order we have to reverse array of middlewares
          params.push(route.middlewares.reverse());
        }

        const invoker = (req: express.Request, res: express.Response) => {
          // Execute our method for this path and pass our express request and response object.
          instance[route.methodName](req, res);
        };

        params.push(invoker);
        router[route.requestMethod](path, ...params);
      }
    });
  });
}

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
