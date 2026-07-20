'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

interface Todo {
  title: string;
  completed?: boolean;
  description?: string;
  priority: number;
}

export const TodoForm = () => {
  const { closeModal } = useModal('modal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: Todo) => api.post('/todos', newTodo),
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
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          disabled={mutation.isPending}
          className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm disabled:bg-slate-50"
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-slate-600 mb-1">
          Description (optional)
        </label>
        <textarea
          rows={3}
          placeholder="Add more details..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          disabled={mutation.isPending}
          className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none disabled:bg-slate-50"
        />
      </div>

      {/* Priority Slider (1 - 10) */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-xs font-medium text-slate-600">Priority</label>
          {/* Badge */}
          <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
            {priority} / 10
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          disabled={mutation.isPending}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
        />

        {/* Marks under Slider*/}
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-0.5">
          <span>1 (Low)</span>
          <span>5 (Medium)</span>
          <span>10 (High)</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={closeModal}
          disabled={mutation.isPending}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-sm transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={mutation.isPending || !title.trim()}
          className="flex items-center justify-center min-w-[100px] h-[38px] cursor-pointer px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Task'}
        </button>
      </div>
    </form>
  );
};
