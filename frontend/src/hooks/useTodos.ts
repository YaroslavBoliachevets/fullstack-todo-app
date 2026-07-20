import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}

type FilterStatus = 'all' | 'done' | 'undone';
type FilterSortBy = 'priority' | 'created_at';
type FilterOrder = 'asc' | 'desc';

export function useTodos() {
  const searchParams = useSearchParams();

  const filterStatus = (searchParams.get('status') as FilterStatus) || 'all';
  const filterSortBy = (searchParams.get('sort_by') as FilterSortBy) || 'priority';
  const filterOrder = (searchParams.get('order') as FilterOrder) || 'asc';

  // for invalidate data
  const queryClient = useQueryClient();

  const buildUrl = () => {
    const params = new URLSearchParams();

    if (filterStatus !== 'all') params.set('status', filterStatus);
    params.set('sort_by', filterSortBy);
    params.set('order', filterOrder);
    return `/todos?${params.toString()}`;
  };

  const todosQuery = useQuery<Todo[]>({
    queryKey: ['todos', filterStatus, filterSortBy, filterOrder],
    queryFn: () => api.get<Todo[]>(buildUrl()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task deleted successfully');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      api.patch(`/todos/${id}`, { completed }),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ['todos'] }),
        toast.success('Task update successfully'));
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,

    deleteTodo: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteVariables: deleteMutation.variables, // current delete id

    toggleTodo: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
    toggleVariables: toggleMutation.variables, // obj args
  };
}
