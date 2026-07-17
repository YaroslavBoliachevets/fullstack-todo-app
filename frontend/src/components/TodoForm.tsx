'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: string) => api.post('/todos', { title: newTodo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
      toast.success('Task added successfully');
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate(title);
  };

  return (
    <form className="flex gap-2 max-w-md" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        disabled={mutation.isPending}
        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm disabled:ring-indigo-300"
      />
      <button
        type="submit"
        disabled={mutation.isPending || !title.trim()}
        className="flex items-center justify-center 
    min-w-[90px] h-[42px] cursor-pointer px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors active:scale-95 disabled:bg-slate-300 disabled:cursor-default"
      >
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add'}
      </button>
    </form>
  );
};
