'use client';

import { useTodos } from '@/hooks/useTodos';

export const TodoList = () => {
  const { todos, isLoading, isError, error, deleteTodo, isDeleting } = useTodos();

  if (isLoading) return <div>Task list loading...</div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'Loading error'}</div>;

  return (
    <div>
      <h3>list</h3>
      <ul className="grid gap-2">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="border-2 gap-2">
              {todo.completed ? <p>completed</p> : <p>in process</p>}
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
