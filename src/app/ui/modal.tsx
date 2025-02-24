'use client'

import Link from 'next/link';
import clsx from 'clsx';
import { useTheme } from '@/context/theme-context';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/ui/button';

const Modal = ({ message, link }: { message: string, link: string }) => {
  const { theme } = useTheme();
  const pathname = usePathname();

  console.log('theme', theme, pathname)

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className={clsx('p-8 border w-96 shadow-lg rounded-md', 
          {
            'bg-white text-gray-600': theme === 'light',
            'bg-gray-900 text-gray-300': theme === 'dark',
          })}>
        <div className="text-center">
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">{ message }</p>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              href={ link }
            >
              <Button className="px-4 py-2">Close</Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;