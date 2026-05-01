import { Globe, Radio } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { getServerStatuses } from '@/lib/fivem';
import type { ServerStatus } from '@/lib/fivem';
import type { SiteSettings } from '@/lib/settings';
import { Logo } from './Logo';

const iconMap = { discord: faDiscord, youtube: faYoutube, tiktok: faTiktok } as const;

export async function Footer({ settings }: { settings: SiteSettings }) {
  const servers = await getServerStatuses();
  const links = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Rules', href: settings.branding.rulesUrl },
    { label: 'Store', href: settings.branding.storeUrl },
    { label: 'Refund Policy', href: '/refund-policy' }
  ];
  return (
    <footer className="border-t border-black bg-[#0A0A0A] px-5 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.35fr_.55fr_.65fr]">
        <div className="max-w-md">
          <Logo large logoUrl={settings.branding.logoUrl} siteName={settings.branding.siteName} tagline={settings.branding.tagline} />
          <p className="mt-4 text-sm text-white/75">For Business Inquiries: <a href={`mailto:${settings.branding.businessEmail}`} className="text-[var(--red-primary)] underline-offset-4 hover:underline">{settings.branding.businessEmail}</a></p>
          <h3 className="mt-7 text-base font-black text-white">Current Server Status</h3>
          <div className="mt-4 flex flex-col items-start gap-3">{servers.map((server) => <FooterStatusPill key={server.key} server={server} maxPlayers={settings.server.maxPlayers} />)}</div>
        </div>
        <div className="lg:pl-4">
          <div className="flex flex-col gap-3">{links.map((link) => <Link key={link.label} href={link.href} className="text-sm font-medium text-white/75 transition hover:text-white hover:underline hover:decoration-[var(--red-primary)]">{link.label}</Link>)}</div>
        </div>
        <div className="border-white/10 lg:border-l lg:pl-28">
          <div className="flex flex-col gap-5">{settings.socials.map((social) => {
            const brandIcon = iconMap[social.icon as keyof typeof iconMap];
            const FallbackIcon = social.icon === 'x' ? Radio : Globe;
            return <a key={social.id} href={social.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-sm font-medium text-white/75 transition hover:text-white">{brandIcon ? <FontAwesomeIcon icon={brandIcon} className="h-5 w-5 text-white" /> : <FallbackIcon size={20} className="text-white" />}{social.label}</a>;
          })}</div>
        </div>
      </div>
    </footer>
  );
}

function FooterStatusPill({ server, maxPlayers }: { server: ServerStatus; maxPlayers?: number }) {
  const displayMax = maxPlayers ?? server.max;
  return (
    <div className="flex min-w-[255px] items-center gap-4 rounded border border-red-900/60 bg-red-950/40 px-5 py-3 text-sm font-black text-white">
      <span className={`rounded-full border px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wide ${server.online ? 'border-emerald-400/50 bg-emerald-500/20 text-emerald-200' : 'border-white/25 bg-white/15 text-white'}`}>{server.online ? 'Online' : 'Offline'}</span>
      <span>{server.name} {server.players}/{displayMax}</span>
    </div>
  );
}
