'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FilterStatus } from '@/types';

export const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeFilter = (searchParams.get('status') as FilterStatus) || 'all';
  const statuses: FilterStatus[] = ['all', 'done', 'undone'];

  const handleFilterChange = (status: FilterStatus) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    // _rsc - service tail in the end
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="flex gap-3">
      {statuses.map((status) => (
        <li key={status}>
          <button
            disabled={activeFilter === status}
            onClick={() => handleFilterChange(status)}
            className={`px-4 py-2 border rounded cursor-pointer transition-all ${
              activeFilter === status
                ? 'bg-blue-500 text-white border-blue-500 disabled:opacity-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All' : status === 'done' ? 'Done' : 'Undone'}
          </button>
        </li>
      ))}
    </ul>
  );
};
