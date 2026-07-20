'use client';

import { Todo } from '@/hooks/useTodos';
interface TodoItemProps {
  todo: Todo;
  deleteTodo: (deleteId: number) => void;
  isDeleting: boolean;
  deleteVariables: number | undefined;
  toggleTodo: (args: { id: number; completed: boolean }) => void;
  isToggling: boolean;
  toggleVariables: { id: number; completed: boolean } | undefined;
}

export const TodoItem = ({
  todo,
  deleteTodo,
  isDeleting,
  deleteVariables,
  toggleTodo,
  isToggling,
  toggleVariables,
}: TodoItemProps) => {
  // check stats for this particular item
  const isCurrentToggling = isToggling && toggleVariables?.id === todo.id;
  const isCurrentDeleting = isDeleting && deleteVariables === todo.id;
  const isDisabled = isCurrentToggling || isCurrentDeleting;

  return (
    <li
      className={`flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white shadow-sm transition-opacity ${
        isCurrentDeleting ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        {/* Семантическая связка через label для a11y */}
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          disabled={isDisabled}
          onChange={(e) => toggleTodo({ id: todo.id, completed: e.target.checked })}
          className="w-4 h-4 cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <label
          htmlFor={`todo-${todo.id}`}
          className={`font-medium cursor-pointer select-none grow ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </label>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold text-gray-600 shrink-0">
          Priority: {todo.priority}
        </span>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        disabled={isDisabled}
        className="ml-4 cursor-pointer px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isCurrentDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};
