import type { Metadata } from 'next';
import './globals.css';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { getSettings, settingsToCssVariables } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `${settings.branding.siteName} | FiveM Roleplay Community`,
    description: 'Join the community — a premium FiveM GTA V roleplay server. Apply, subscribe, and connect.',
    icons: settings.branding.faviconUrl ? { icon: settings.branding.faviconUrl } : undefined
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: settingsToCssVariables(settings) }} />
      </head>
      <body suppressHydrationWarning>
        <Navbar settings={settings} />
        <AnnouncementBanner settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
