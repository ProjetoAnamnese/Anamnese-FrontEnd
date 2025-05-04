export interface PagedResponse<T> {
  items: T[];
  total_count: number;
  per_page: number;
}
