import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import craftsData from '@/data/crafts.json';
import { Craft } from '@/types/craft';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dabble - Discover Your Next Craft',
  description: 'Find crafting tutorials based on materials you have and time available',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider initialCrafts={craftsData as Craft[]}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

