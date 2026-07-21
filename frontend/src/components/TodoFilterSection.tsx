import { Filter } from '@/components/Filter';
import { Sort } from '@/components/Sort';
import { Search } from '@/components/Search';

export default function TotoFilterSection() {
  return (
    <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-card border rounded-xl shadow-sm mb-6">
      <div className="flex-1 min-w-[200px]">
        <Search />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <Filter />
        <Sort />
      </div>
    </section>
  );
}
