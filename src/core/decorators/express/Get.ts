import { makeHttpVerb } from './common';

export const Get = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return makeHttpVerb('get')(path);
};
