import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/component/header/Header';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'DailyPic',
    template: 'DailyPic | %s',
  },
  description: 'DailyPic은 세상의 이야기를 전달합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={openSans.className}>
      <body className='flex flex-col md:flex-row'>
        <AuthContext>
          <Header />
          <main className='flex justify-center py-3 overflow-auto grow'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
