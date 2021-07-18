import { makeHttpVerb } from './common';

export const Patch = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return makeHttpVerb('patch')(path);
};
