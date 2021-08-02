import { makeHttpVerb } from '../common';

export const Delete = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return makeHttpVerb('delete')(path);
};
