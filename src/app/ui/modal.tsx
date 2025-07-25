'use client'

import { ReactNode } from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/app/lib/hooks';
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';

const Modal = ({ message, link }: { message: ReactNode, link: string }) => {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);

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
            <Button 
              className={clsx(
                'flex h-10 grow items-center justify-center gap-2 rounded-md p-3 text-sm '
                + 'font-medium hover:bg-gray-400 hover:rounded-lg md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-gray-500 text-gray-600': theme === 'light',
                  'bg-gray-700 text-gray-300': theme === 'dark',
                },
              )}
              onClick={() => router.push(link)}
            >
              Close              
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
