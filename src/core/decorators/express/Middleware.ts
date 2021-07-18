import { RouteConfig } from './common';
import { RequestHandler } from 'express';
import { ROUTER_ROUTES } from './constants/meta';

export const Middleware = (middleware: RequestHandler): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return <T>(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<T>
  ): void => {
    // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
    // To prevent any further validation simply set it to an empty array here.
    if (!Reflect.hasMetadata(ROUTER_ROUTES, target.constructor)) {
      Reflect.defineMetadata(ROUTER_ROUTES, new Map(), target.constructor);
    }

    // Get the routes stored so far, extend it by the new route and re-set the metadata.
    const routes = Reflect.getMetadata(
      ROUTER_ROUTES,
      target.constructor
    ) as Map<string, RouteConfig>;

    const key = propertyKey.toString();

    const routeConfig = routes.get(key);
    if (routeConfig) {
      routeConfig.middlewares?.push(middleware);
    } else {
      routes.set(key, {
        methodName: propertyKey.toString(),
        middlewares: [middleware]
      });
    }

    Reflect.defineMetadata(ROUTER_ROUTES, routes, target.constructor);
  };
};
