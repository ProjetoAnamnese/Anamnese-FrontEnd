export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  per_page: number;
}
