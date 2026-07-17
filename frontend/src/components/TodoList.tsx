'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';
import { toast } from 'sonner';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}

export const TodoList = () => {
  const queryClient = useQueryClient();
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({ queryKey: ['todos'], queryFn: () => api.get<Todo[]>('/todos') });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/todos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task deleted successfully');
    },
  });

  return (
    <div>
      <h3>list</h3>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <p>{todo.title}</p>
              <button
                onClick={() => deleteMutation.mutate(todo.id)}
                className="cursor-pointer p-3 bg-yellow-400"
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
