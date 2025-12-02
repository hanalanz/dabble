import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import craftsData from '@/data/crafts.json';
import { Craft } from '@/types/craft';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

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
    <html lang="en" className={dmSans.variable}>
      <body className={dmSans.className}>
        <AppProvider initialCrafts={craftsData as Craft[]}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

