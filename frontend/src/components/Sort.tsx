'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Sort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSortBy = searchParams.get('sort_by') || 'priority';
  const currentOrder = searchParams.get('order') || 'asc';

  const handleSortChange = (key: 'sort_by' | 'order', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentSortBy} onValueChange={(value) => handleSortChange('sort_by', value)}>
        <SelectTrigger className="w-[150px] h-9 text-xs">
          <SelectValue placeholder="Сортировка" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="priority">By Priority</SelectItem>
          <SelectItem value="created_at">By Date</SelectItem>
          <SelectItem value="title">By Title</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentOrder} onValueChange={(value) => handleSortChange('order', value)}>
        <SelectTrigger className="w-[140px] h-9 text-xs">
          <SelectValue placeholder="Порядок" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
