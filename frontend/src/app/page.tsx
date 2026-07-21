import { Suspense } from 'react';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
// import { Filter } from '@/components/Filter';
// import { Sort } from '@/components/Sort';
// import { Search } from '@/components/Search';
import { Modal } from '@/components/Modal';
import { Header } from '@/components/Header';
import TotoFilterSection from '@/components/TodoFilterSection';

export default function Home() {
  return (
    <>
      {/* prevent error on next build stage */}
      <Suspense fallback={<div>Loading navigation...</div>}>
        <Header />
        {/* <Search />
        <Filter />
        <Sort /> */}
        <TotoFilterSection />
        <TodoList />
        <Modal title={'create task'}>
          <TodoForm />
        </Modal>
      </Suspense>
    </>
  );
}
