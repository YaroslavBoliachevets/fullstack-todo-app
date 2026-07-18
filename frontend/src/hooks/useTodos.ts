import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { toast } from 'sonner';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}

export type FilterStatus = 'all' | 'done' | 'undone';

export function useTodos(filter: FilterStatus) {
  // for invalidate data
  const queryClient = useQueryClient();

  const buildUrl = () => {
    if (filter === 'all') return '/todos';
    return `/todos?status=${filter}`;
  };

  const todosQuery = useQuery<Todo[]>({
    queryKey: ['todos', filter],
    queryFn: () => api.get<Todo[]>(buildUrl()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task deleted successfully');
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,
    deleteTodo: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
