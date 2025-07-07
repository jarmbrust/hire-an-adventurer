import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/app/ui/client-layout';
import { Geist } from 'next/font/google';
import StoreProvider from '@/app/store-provider';

const geist = Geist({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Hire an Adventurer",
  description: "Hire adventurers to save the city!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen antialiased">
        <main className={`flex min-h-screen flex-col`}>
          <StoreProvider>
            <ClientLayout>
            {children}
            </ClientLayout>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
