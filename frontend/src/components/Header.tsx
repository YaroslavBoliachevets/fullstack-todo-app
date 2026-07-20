'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

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
    <button
      onClick={openModal}
      className="flex items-center justify-center 
    max-w-[90px] h-[42px] cursor-pointer px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors active:scale-95 disabled:bg-slate-300 disabled:cursor-default"
    >
      ++ Add task
    </button>
  );
};
