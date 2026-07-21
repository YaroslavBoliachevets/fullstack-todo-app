export interface Todo {
  id: number;
  title: string;
  completed?: boolean;
  description?: string;
  priority: number;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'completed'>;

export type FilterStatus = 'all' | 'done' | 'undone';
export type FilterSortBy = 'priority' | 'created_at';
export type FilterOrder = 'asc' | 'desc';
