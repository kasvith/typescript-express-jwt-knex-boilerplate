import { RouteConfig } from '../common';
import { ROUTER_PREFIX, ROUTER_ROUTES, ROUTER_SCOPE } from '../constants/meta';

export const ApiController = (prefix = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object) => {
    Reflect.defineMetadata(ROUTER_SCOPE, 'api', target);
    Reflect.defineMetadata(ROUTER_PREFIX, prefix, target);

    if (!Reflect.hasMetadata(ROUTER_ROUTES, target)) {
      Reflect.defineMetadata(
        ROUTER_ROUTES,
        new Map<string, RouteConfig>(),
        target
      );
    }
  };
};
