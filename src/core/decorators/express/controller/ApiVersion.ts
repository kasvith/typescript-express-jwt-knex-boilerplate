import { RouteConfig } from '../common';
export const ApiVersion = (version = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object) => {
    const prevApiVersions = Reflect.getMetadata('router:apiVersion', target);
    const newApiVersions = [];
    if (prevApiVersions) {
      newApiVersions.push(...prevApiVersions);
    }
    newApiVersions.push(version);
    Reflect.defineMetadata('router:apiVersion', newApiVersions, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', new Map<string, RouteConfig>(), target);
    }
  };
};
