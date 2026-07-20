'use client';

import { useTodos } from '@/hooks/useTodos';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const {
    todos,
    isLoading,
    isError,
    error,
    deleteTodo,
    isDeleting,
    deleteVariables,
    toggleTodo,
    isToggling,
    toggleVariables,
  } = useTodos();

  if (isLoading) {
    return <div className="text-center py-6 text-gray-500 font-medium">Loading tasks...</div>;
  }
  if (isError) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg" role="alert">
        <span className="font-bold">Error:</span>{' '}
        {error instanceof Error ? error.message : 'Failed to load tasks'}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
        <p className="text-gray-400 font-medium">No tasks found</p>
      </div>
    );
  }

  return (
    <div>
      <h3>list</h3>
      <ul className="grid gap-2">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              isDeleting={isDeleting}
              deleteVariables={deleteVariables}
              toggleTodo={toggleTodo}
              isToggling={isToggling}
              toggleVariables={toggleVariables}
            />
          );
        })}
      </ul>
    </div>
  );
};
