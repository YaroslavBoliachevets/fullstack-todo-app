// src/components/Search.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const Search = () => {
  //   const debouncedText = useDebounce(text, 400);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [text, setText] = useState(searchParams.get('search')?.toString() || '');

  //   useEffect(() => {
  //     onSearch(debouncedText);
  //   }, [debouncedText, onSearch]);

  const handleSearchChange = (key: 'search', value: string) => {
    setText(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        🔍
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => handleSearchChange('search', e.target.value)}
        placeholder={'search tasks'}
        className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
      />
      {text && (
        <button
          onClick={() => setText('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-xs font-bold"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};
