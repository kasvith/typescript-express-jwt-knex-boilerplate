import { RouteConfig } from './common';
export const Controller = (prefix = ''): ClassDecorator => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Object) => {
    Reflect.defineMetadata('router:prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', new Map<string, RouteConfig>(), target);
    }
  };
};
