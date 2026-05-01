import { subscriptionTiers } from '@/lib/data';
import type { SiteSettings } from '@/lib/settings';

export function SubscriptionCards({ subscriptions }: { subscriptions: SiteSettings['subscriptions'] }) {
  const fallback = subscriptions.kofiUsername ? `https://ko-fi.com/${subscriptions.kofiUsername}` : '';
  return (
    <div className="grid gap-7 lg:grid-cols-3">
      {subscriptionTiers.map((tier) => {
        const Icon = tier.icon;
        const tierConfig = subscriptions.tiers.find((entry) => entry.name === tier.name);
        const url = tierConfig?.kofiUrl || fallback;
        const isSilver = tier.name === 'Silver';
        const cardBg = isSilver ? 'bg-[#575757]' : tier.featured ? 'bg-[#5a4612]' : 'bg-[#4c1111]';
        const badgeBg = isSilver ? 'from-white to-[#6f6f6f]' : tier.featured ? 'from-[#fff0a8] to-[#9f7414]' : 'from-[#ff4a4a] to-[#6f0808]';
        return (
          <div key={tier.name} className={`relative flex min-h-[640px] flex-col overflow-hidden rounded-none border border-black/40 ${cardBg} p-8 text-white shadow-[0_22px_60px_rgba(0,0,0,0.35)]`}>
            <div className="absolute -left-4 -top-5 grid h-28 w-28 place-items-center">
              <div className={`grid h-24 w-24 rotate-[-12deg] place-items-center bg-gradient-to-br ${badgeBg} shadow-[0_8px_18px_rgba(0,0,0,0.45)] [clip-path:polygon(50%_0%,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)]`}>
                <Icon size={48} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.65)]" />
              </div>
            </div>
            <h3 className="pulse-heading ml-28 text-5xl text-white">{tier.name.toUpperCase()}</h3>
            <ul className="mt-12 flex flex-1 flex-col gap-7 text-[15px] font-bold leading-6 text-white/85">
              {tier.perks.map((perk) => <li key={perk}>{perk}</li>)}
            </ul>
            <div className="mt-10">
              <div className="font-mono text-lg font-black uppercase text-white/45">Price</div>
              <div className="pulse-heading text-6xl text-white">{tier.price}</div>
            </div>
            {url ? (
              <a href={url} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-40 items-center justify-center rounded-full bg-white/35 px-7 py-3 text-sm font-black text-white transition hover:bg-white hover:text-black">Subscribe</a>
            ) : (
              <span className="mt-7 inline-flex w-40 items-center justify-center rounded-full bg-white/20 px-7 py-3 text-sm font-black text-white/60" title="Set the Ko-fi URL for this tier in the Admin Panel">Coming Soon</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
