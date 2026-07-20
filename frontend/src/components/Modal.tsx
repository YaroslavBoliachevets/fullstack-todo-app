'use client';

import { useModal } from '@/hooks/useModal';
import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  title: string;
}

export function Modal({ children, title = 'Header' }: ModalProps) {
  const { isOpen } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="capitalize bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-slate-600">{title}</h2>
        {children}
      </div>
    </div>
  );
}
