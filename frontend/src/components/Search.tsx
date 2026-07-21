// src/components/Search.tsx
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, X } from 'lucide-react';

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [text, setText] = useState(searchParams.get('search')?.toString() || '');
  const debouncedText = useDebounce(text, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedText.trim()) {
      params.set('search', debouncedText.trim());
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedText, pathname, replace]);

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"></SearchIcon>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={'Search tasks...'}
        className="pl-9 pr-9 h-10 w-full"
      />
      {text && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => setText('')}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
