import { Metadata } from 'next';
import Footer from '../components/core/footer';
import Navbar from '../components/core/navbar';
import CTA from '../components/landing/cta';
import Features from '../components/landing/features';
import Hero from '../components/landing/hero';
import Plans from '../components/landing/plans';
import Stats from '../components/landing/stats';
import { getSession } from '@/src/lib/session';

export const metadata: Metadata = {
  title: 'CogniFile | Secure Cloud Storage and File Sharing Platform',
  description: 'Store, share, and access your files securely with CogniFile. Enjoy seamless cloud storage, reliable data protection, and easy file sharing from any device, anywhere.',
  keywords: 'cloud storage, file sharing, secure storage, online storage, cloud platform, data protection, access files anywhere',
  robots: 'index, follow',
  openGraph: {
    title: 'CogniFile | Secure Cloud Storage and File Sharing',
    description: 'CogniFile offers a secure platform for storing, sharing, and accessing your files from anywhere. Experience top-notch cloud storage with easy file sharing and reliable data protection.',
    url: 'https://cognifile.org',
    type: 'website',
    images: [
      {
        url: 'https://cognifile.org/og.png',
        width: 1200,
        height: 630,
        alt: 'CogniFile Cloud Storage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://cognifile.org',
    title: 'CogniFile | Secure Cloud Storage',
    description: 'CogniFile provides a secure cloud storage solution, allowing you to store, share, and access your files from anywhere with ease and security.',
  },
};

export default function Home() {
  const session = getSession();
  return (
    <div>
      <Navbar />
      <div className="m-auto container flex flex-col items-center gap-24 py-24 mt-24 z-0">
        <Hero />
        <Stats />
        <Plans />
        <Features />
        {!!!session && <CTA />}
      </div>
      <Footer />
    </div>
  );
}
