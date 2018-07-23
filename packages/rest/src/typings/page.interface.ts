export interface Page<T = any> {
  content: T[];
  /**
   * Page size - maximum number of items in content that this page should contain
   */
  size: number;
  first: boolean;
  last: boolean;
  /**
   * Page number using 0-based numbering
   */
  number: number;
  /**
   * Elements returned with this page: content.length
   */
  numberOfElements: number;
  sort?: any;
  /**
   * total amount of elements (some may be left out from this page)
   */
  totalElements: number;
  /**
   * number of total pages
   */
  totalPages: number;
}

/**
 * Request for a Page resource
 */
export interface PageableRequest {
  number: number | undefined;
  size: number | undefined;
  sort: any | undefined;
  query?: { [name: string]: any };
}
