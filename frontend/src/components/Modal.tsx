'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
}

export function Modal({ children, title = 'Header' }: ModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isOpen = searchParams.get('modal') === 'true';

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('modal', 'true');

    router.push(`${pathname}?${params.toString()}`);
  };

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('modal');
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="capitalize bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <button
          onClick={closeModal}
          className="mt-2 cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
