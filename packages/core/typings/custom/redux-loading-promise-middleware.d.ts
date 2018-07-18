declare module "redux-loading-promise-middleware" {
  export interface AsyncAction<P> {
    type: string;
    payload: P;
    isLoading: boolean;
    error?: any;
  }

  import { Middleware } from "redux";
  const promiseMiddleware: Middleware;
  export default promiseMiddleware;
}
