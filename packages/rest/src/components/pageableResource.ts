import { Page, PageableRequest } from "../typings/page.interface";

export default class PageableResource<T = any> implements Page<T> {
  content: T[];
  size: number = 20;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  sort?: any;
  totalElements: number;
  totalPages: number;

  public setPage(
    request: PageableRequest,
    content: T[],
    totalElements: number
  ): void {
    const size: number = request.size ? request.size : this.size;
    const numberOfElements: number = content.length;
    const totalPages: number = Math.ceil(totalElements / size);

    this.content = content;
    this.size = size;
    this.first = true;
    this.last = false;
    this.number = request.number || 0;
    this.numberOfElements = numberOfElements;
    this.sort = null;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }

  public createPage(): Page {
    return {
      content: this.content,
      size: this.size,
      first: this.first,
      last: this.last,
      number: this.number,
      numberOfElements: this.numberOfElements,
      sort: this.sort,
      totalElements: this.totalElements,
      totalPages: this.totalPages,
    };
  }
}
