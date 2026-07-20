'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function useModal(modalKey = 'modal') {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get(modalKey) === 'true';

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(modalKey, 'true');

    router.push(`${pathname}?${params.toString}`);
  };

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(modalKey);
    router.replace(`${pathname}?${params}`);
  };

  return { isOpen, openModal, closeModal };
}
