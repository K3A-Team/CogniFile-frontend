import { ThemeProvider } from './components/core/theme';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/src/styles/globals.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: false,
});

export const metadata: Metadata = {
  title: 'Cognifile',
  description:
    'Cognifile is a cloud storage service that allows you to store and share files with ease, and access them from anywhere!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} dark:bg-cf-dark text-cf-dark dark:text-white bg-white transition-colors duration-300 ease-in-out`}
      >
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
