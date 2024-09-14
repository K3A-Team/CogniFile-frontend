import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/src/styles/globals.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false,
});

export const metadata: Metadata = {
  title: 'Cognifile',
  description: 'Cognifile is a cloud storage service that allows you to store and share files with ease, and access them from anywhere!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className + ' bg-cf-dark text-white'}>{children}</body>
    </html>
  );
}
