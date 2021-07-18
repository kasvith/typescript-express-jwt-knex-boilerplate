import { RouteConfig } from '../common';
import { ROUTER_ROUTES, ROUTER_API_VERSION } from '../constants/meta';

export const ApiVersion = (version = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object) => {
    const prevApiVersions = Reflect.getMetadata(ROUTER_API_VERSION, target);
    const newApiVersions = [];
    if (prevApiVersions) {
      newApiVersions.push(...prevApiVersions);
    }
    newApiVersions.push(version);
    Reflect.defineMetadata(ROUTER_API_VERSION, newApiVersions, target);

    if (!Reflect.hasMetadata(ROUTER_ROUTES, target)) {
      Reflect.defineMetadata(
        ROUTER_ROUTES,
        new Map<string, RouteConfig>(),
        target
      );
    }
  };
};
