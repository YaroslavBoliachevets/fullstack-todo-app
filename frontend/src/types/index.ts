export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}

export type FilterStatus = 'all' | 'done' | 'undone';
export type FilterSortBy = 'priority' | 'created_at';
export type FilterOrder = 'asc' | 'desc';
