import { NextFunction, Request, Response, Router } from 'express';
import { ServerResponse } from 'http';
import urljoin from 'url-join';
import { RouteConfig } from '@decorators/express/common';
import {
  ROUTER_API_VERSION,
  ROUTER_PREFIX,
  ROUTER_ROUTES,
  ROUTER_SCOPE
} from '@decorators/express/constants/meta';

export function configureControllers(router: Router, controllers: any[]): void {
  controllers.forEach((controller) => {
    // This is our instantiated class
    const instance = new controller();
    // The prefix saved to our controller
    const scope = Reflect.getMetadata(ROUTER_SCOPE, controller);
    const prefix = Reflect.getMetadata(ROUTER_PREFIX, controller);

    const apiVersions = Reflect.getMetadata(
      ROUTER_API_VERSION,
      controller
    ) as Array<string>;

    // Our `routes` array containing all our routes for this controller
    const routes: Map<string, RouteConfig> = Reflect.getMetadata(
      ROUTER_ROUTES,
      controller
    );

    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      if (route.path) {
        let paths: string[] = [];
        const basePath = urljoin(prefix, route.path);

        if (apiVersions) {
          apiVersions.forEach((version) =>
            paths.push(urljoin(version, basePath))
          );
        } else {
          paths.push(basePath);
        }

        if (scope) {
          paths = paths.map((path) => urljoin(scope, path));
        }

        paths = paths.map((path) => urljoin('/', path)).reverse();

        const params: any[] = [];

        if (route.middlewares) {
          // remember decoraters returns result bottom to top
          // so inorder to maintain order we have to reverse array of middlewares
          params.push(route.middlewares.reverse());
        }

        const executor = async (
          req: Request,
          res: Response,
          next: NextFunction
        ) => {
          // Execute our method for this path and pass our express request and response object.
          try {
            const response = await instance[route.methodName](req, res);

            // if nothing, send HTTP 200 OK empty response
            if (!response) {
              return res.send();
            }

            // this happens if res.send already sent
            if (response instanceof ServerResponse) {
              return;
            }

            // handle any return value
            switch (typeof response) {
              case 'object':
                return res.json(response);

              default:
                return res.send(response);
            }
          } catch (error) {
            next(error);
          }
        };
        params.push(executor);

        paths.forEach((path) => {
          if (route.requestMethod) {
            router[route.requestMethod](path, ...params);

            console.debug(
              `config:route ${route.requestMethod.toUpperCase()} ${path}`
            );
          }
        });
      }
    });
  });
}
