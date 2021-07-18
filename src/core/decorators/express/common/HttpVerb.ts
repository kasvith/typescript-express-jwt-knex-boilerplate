import { HttpRequestMethod, RouteConfig } from './RouteConfig';
import { ROUTER_ROUTES } from '../constants/meta';

export function makeHttpVerb(requestMethod: HttpRequestMethod) {
  return (path: string): MethodDecorator => {
    return <T>(
      // eslint-disable-next-line @typescript-eslint/ban-types
      target: Object,
      propertyKey: string | symbol,
      _descriptor: TypedPropertyDescriptor<T>
    ): void => {
      if (!Reflect.hasMetadata(ROUTER_ROUTES, target.constructor)) {
        Reflect.defineMetadata(
          ROUTER_ROUTES,
          new Map<string, RouteConfig>(),
          target.constructor
        );
      }

      // Get the routes stored so far, extend it by the new route and re-set the metadata.
      const routes = Reflect.getMetadata(
        ROUTER_ROUTES,
        target.constructor
      ) as Map<string, RouteConfig>;

      const methodName = propertyKey.toString();
      const route = routes.get(methodName);
      if (route) {
        routes.set(methodName, {
          path,
          requestMethod,
          ...route
        });
      } else {
        routes.set(methodName, {
          path,
          requestMethod,
          methodName
        });
      }
      Reflect.defineMetadata(ROUTER_ROUTES, routes, target.constructor);
    };
  };
}
