import { HttpRequestMethod, RouteConfig } from './RouteConfig';

export function makeHttpVerb(requestMethod: HttpRequestMethod) {
  return (path: string): MethodDecorator => {
    return <T>(
      // eslint-disable-next-line @typescript-eslint/ban-types
      target: Object,
      propertyKey: string | symbol,
      _descriptor: TypedPropertyDescriptor<T>
    ): void => {
      // In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
      // To prevent any further validation simply set it to an empty array here.
      if (!Reflect.hasMetadata('routes', target.constructor)) {
        Reflect.defineMetadata(
          'routes',
          new Map<string, RouteConfig>(),
          target.constructor
        );
      }

      // Get the routes stored so far, extend it by the new route and re-set the metadata.
      const routes = Reflect.getMetadata('routes', target.constructor) as Map<
        string,
        RouteConfig
      >;

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
      Reflect.defineMetadata('routes', routes, target.constructor);
    };
  };
}
