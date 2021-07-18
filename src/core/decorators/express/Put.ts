import { makeHttpVerb } from './common';

export const Put = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return makeHttpVerb('put')(path);
};
