'use client';

import { Todo } from '@/types';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';

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

  const getPriorityBadgeVariant = (priority: number) => {
    if (priority >= 8) return 'destructive';
    if (priority >= 5) return 'secondary';
    return 'outline';
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0 grow">
          {/* Семантическая связка через label для a11y */}
          <Checkbox
            id={`todo-${todo.id}`}
            // type="checkbox"
            checked={todo.completed}
            disabled={isDisabled}
            onCheckedChange={(checked) => toggleTodo({ id: todo.id, completed: Boolean(checked) })}
            className="mt-1"
          />
          <div className="flex flex-col min-w-0 grow gap-1">
            <label
              htmlFor={`todo-${todo.id}`}
              className={`font-medium leading-none cursor-pointer select-none truncate ${
                todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {todo.title}
            </label>

            {todo.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                {todo.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Badge variant={getPriorityBadgeVariant(todo.priority)}>Priority: {todo.priority}</Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo(todo.id)}
            disabled={isDisabled}
            className="text-muted-foreground hover:text-destructive transition-colors h-8 w-8"
          >
            {isCurrentDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
