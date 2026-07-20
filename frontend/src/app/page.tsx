import { Suspense } from 'react';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { Filter } from '@/components/Filter';
import { Sort } from '@/components/Sort';
import { Search } from '@/components/Search';

export default function Home() {
  return (
    <>
      {/* prevent error on next build stage */}
      <Suspense fallback={<div>Loading navigation...</div>}>
        <TodoForm />
        <Search />
        <Filter />
        <Sort />
        <TodoList />
      </Suspense>
    </>
  );
}
