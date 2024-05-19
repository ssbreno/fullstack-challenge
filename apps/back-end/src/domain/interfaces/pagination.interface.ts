export interface FindAllEmployeesParams {
    page: number;
    limit: number;
    sort: string;
    order: 'asc' | 'desc';
  }