import { Router, Request, Response, NextFunction } from 'express';
import { RouteConfig } from './decorators/express/common/RouteConfig';
import urljoin from 'url-join';
import { ServerResponse } from 'http';

export function configureControllers(router: Router, controllers: any[]): void {
  controllers.forEach((controller) => {
    // This is our instantiated class
    const instance = new controller();
    // The prefix saved to our controller
    const scope = Reflect.getMetadata('router:scope', controller);
    const prefix = Reflect.getMetadata('router:prefix', controller);

    const apiVersion = Reflect.getMetadata('router:apiVersion', controller);
    console.log(apiVersion);
    // Our `routes` array containing all our routes for this controller
    const routes: Map<string, RouteConfig> = Reflect.getMetadata(
      'routes',
      controller
    );

    // Iterate over all routes and register them to our express application
    routes.forEach((route) => {
      if (route.requestMethod && route.path) {
        const pathParams = apiVersion
          ? [apiVersion, prefix, route.path]
          : [prefix, route.path];

        const scopedParams = scope ? [scope, ...pathParams] : pathParams;
        const path = urljoin('/', ...scopedParams);

        const params = [];

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
        router[route.requestMethod](path, ...params);

        console.log(
          `config:route ${route.requestMethod?.toUpperCase()} ${path}`
        );
      }
    });
  });
}
