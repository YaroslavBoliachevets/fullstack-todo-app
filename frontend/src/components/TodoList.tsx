'use client';

import { useTodos } from '@/hooks/useTodos';

export const TodoList = () => {
  const { todos, isLoading, isError, error, deleteTodo, isDeleting, toggleTodo, isToggling } =
    useTodos();

  if (isLoading) return <div>Task list loading...</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'Loading error'}</div>;

  return (
    <div>
      <h3>list</h3>
      <ul className="grid gap-2">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="border-2 gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                disabled={isToggling}
                onChange={(e) => toggleTodo({ id: todo.id, completed: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <p>{todo.title}</p>
              <p>{todo.priority}</p>
              <button
                onClick={() => deleteTodo(todo.id)}
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
