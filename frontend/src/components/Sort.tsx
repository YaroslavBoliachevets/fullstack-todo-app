'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

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
    <div className="flex flex-wrap gap-4 p-3 mb-4 bg-gray-50 rounded-lg border border-gray-200">
      {/* Выбор поля сортировки */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Сортировка:</label>
        <select
          value={currentSortBy}
          onChange={(e) => handleSortChange('sort_by', e.target.value)}
          className="p-1.5 text-sm bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          <option value="priority">По приоритету</option>
          <option value="created_at">По дате создания</option>
        </select>
      </div>

      {/* Выбор направления */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Порядок:</label>
        <select
          value={currentOrder}
          onChange={(e) => handleSortChange('order', e.target.value)}
          className="p-1.5 text-sm bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        >
          <option value="asc">Возрастание (1 → 10 / Сначала старые)</option>
          <option value="desc">Убывание (10 → 1 / Сначала новые)</option>
        </select>
      </div>
    </div>
  );
};
