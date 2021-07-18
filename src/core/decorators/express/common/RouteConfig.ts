import { RequestHandler } from 'express';

export type HttpRequestMethod =
  | 'get'
  | 'post'
  | 'delete'
  | 'options'
  | 'put'
  | 'patch';

export interface RouteConfig {
  path?: string;

  requestMethod?: HttpRequestMethod;

  methodName: string;

  middlewares?: RequestHandler[];
}
