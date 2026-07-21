'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { toast } from 'sonner';
import { CreateTodoInput } from '@/types';
import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Loader2 } from 'lucide-react';

export const TodoForm = () => {
  const { closeModal } = useModal('modal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: CreateTodoInput) => api.post('/todos', newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
      setDescription('');
      setPriority(1);
      toast.success('Task added successfully');
      closeModal();
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
      priority: Number(priority),
    });
  };

  return (
    <form className=" max-w-md" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="mb-3">
        <label className="text-xs font-medium text-slate-300">
          Title <span className="text-red-400">*</span>
        </label>
        <Input
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          disabled={mutation.isPending}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="text-xs font-medium text-slate-300">Description (optional)</label>
        <Textarea
          rows={3}
          placeholder="Add more details..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          disabled={mutation.isPending}
          className="resize-none"
        />
      </div>

      {/* Priority Slider (1 - 10) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-medium text-slate-300">Priority</label>
          {/* Badge */}
          <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
            {priority} / 10
          </span>
        </div>

        <Slider
          value={[priority]}
          min={1}
          max={10}
          step={1}
          onValueChange={(val) => setPriority(val[0])}
          disabled={mutation.isPending}
        />

        {/* Marks under Slider*/}
        <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
          <span>1 (Low)</span>
          <span>5 (Medium)</span>
          <span>10 (High)</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-2">
        <Button type="button" onClick={closeModal} disabled={mutation.isPending}>
          Cancel
        </Button>

        <Button type="submit" disabled={mutation.isPending || !title.trim()}>
          {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};
