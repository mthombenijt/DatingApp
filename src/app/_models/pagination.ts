export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;

}

// use paginated result method to add the list of users in the pagination page when the event is clicked
export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;

}
