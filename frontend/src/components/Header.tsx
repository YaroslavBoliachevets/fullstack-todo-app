'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

useRouter;

export const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('modal', 'true');
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <header className="flex items-center justify-between pb-6 mb-6 border-b">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-sm text-muted-foreground">Manage and track your daily tasks</p>
      </div>

      <Button onClick={openModal} className="gap-2">
        <Plus className="h-4 w-4" />
        <span>Add Task</span>
      </Button>
    </header>
  );
};
