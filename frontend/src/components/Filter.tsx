'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FilterStatus } from '@/types';

import { Button } from '@/components/ui/button';

export const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeFilter = (searchParams.get('status') as FilterStatus) || 'all';
  // const statuses: FilterStatus[] = ['all', 'done', 'undone'];

  const statuses: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'In progress', value: 'undone' },
    { label: 'Ready', value: 'done' },
  ];

  const handleFilterChange = (status: FilterStatus) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    // _rsc - service tail in the end
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <ul className="flex gap-3">
      {statuses.map((status) => {
        const isActive = activeFilter === status.value;
        return (
          <li key={status.value}>
            <Button
              key={status.value}
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              onClick={() => handleFilterChange(status.value)}
              className="h-9 px-3 text-xs"
            >
              {status.label}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
