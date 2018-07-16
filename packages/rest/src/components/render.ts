import * as Koa from "koa";
import { Pageable, IndexedPage, paginate } from "@panderalabs/koa-pageable";

export class RenderCtx {
  constructor() {}

  public renderSuccess(
    ctx: Koa.Context,
    status: number,
    type: string,
    data: any
  ) {
    ctx.status = status;
    const pageable: Pageable = ctx.state.pageable;

    ctx.body = {
      success: true,
      type: type,
      pageable,
      data: data,
    };
  }

  public renderFaild(
    ctx: Koa.Context,
    status: number,
    type: string,
    errors: any
  ) {
    ctx.status = status;
    const pageable: Pageable = ctx.state.pageable;

    ctx.body = {
      success: false,
      type: type,
      pageable,
      errors: errors,
    };
  }
}
