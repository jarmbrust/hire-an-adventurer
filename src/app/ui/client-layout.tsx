'use client'

import SideNavbar from "@/app/ui/side-navbar";
import Header from "@/app/ui/header";
import { selectTheme } from '@/app/lib/features/theme/theme-slice';
import { useAppSelector } from '@/app/lib/hooks';


export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = useAppSelector(selectTheme);
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-600'}`}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden w-full">
        <div className="w-full flex-none md:w-64">
          <SideNavbar />
        </div>
        <div  className="flex flex-grow flex-col overflow-hidden">
          <Header />
          <div className="flex-grow p-6 overflow-y-auto md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
