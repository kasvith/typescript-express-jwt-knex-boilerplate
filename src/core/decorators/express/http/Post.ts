import { makeHttpVerb } from '../common';

export const Post = (path: string): MethodDecorator => {
  // `target` equals our class, `propertyKey` equals our decorated method name
  return makeHttpVerb('post')(path);
};
