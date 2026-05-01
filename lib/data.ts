import { BadgeCheck, Briefcase, Code2, Crown, HeartPulse, Scale, Shield, Siren, Star } from 'lucide-react';

const allowlistAddress = process.env.FIVEM_ALLOWLIST_ADDRESS || '169.197.85.213:30120';

export const siteConfig = {
  businessEmail: 'business@pulserp.gg',
  storeUrl: 'https://store.pulserp.gg',
  discordUrl: 'https://discord.gg/pulserp',
  rulesUrl: '/rules',
  connectUrl: `fivem://connect/${allowlistAddress}`,
  servers: [
    { key: 'allowlist', name: 'Pulse RP Allowlist', address: allowlistAddress, max: 64 }
  ]
};

export const subscriptionTiers = [
  { name: 'Silver', price: '$25 USD', accent: 'var(--silver)', icon: Shield, perks: ['+25 Queue Priority (Stacks With Other Sources)', 'Unique Role/Badge for Silver Username on Site & Discord', 'Usable on Pulse RP Public and Allowlisted server with valid allowlist status'] },
  { name: 'Gold', price: '$40 USD', accent: 'var(--gold)', icon: Crown, featured: true, perks: ['+40 Queue Priority', 'Unique Badge for Gold Username', '1 free application priority processing within 7 days', 'Usable on Pulse RP Public + Allowlisted server with valid allowlist status'] },
  { name: 'Crimson', price: '$60 USD', accent: 'var(--red-primary)', icon: Star, crimson: true, perks: ['+60 Queue Priority', 'Unique Badge for Crimson Username', '1 free application priority processing within 7 days', 'Usable on all Pulse RP servers with valid allowlist status'] }
];

export const applicationTypes = [
  { slug: 'staff-allowlist', title: 'FiveM Staff Application (Allowlist)', icon: BadgeCheck, description: 'An application for staff on the allowlist server. Requires good standing, active Discord participation, and active participation on the allowlist FiveM Server. Must have extensive staff or moderation experience in content creation, gaming or RP space.' },
  { slug: 'staff-public', title: 'FiveM Staff Application (Public)', icon: Siren, description: 'An application for staff on the public server. Requires strong RP judgment, maturity, availability, and the ability to help players fairly under pressure.' },
  { slug: 'allowlist', title: 'FiveM Allowlist Application', icon: Shield, description: 'This is our free application that does not require a priority review. There is no ETA on review and will be reviewed in order as received.' },
  { slug: 'developer', title: 'Developer Application', icon: Code2, description: 'Application for Web Developers (UX Design), 3D Developers, LUA & Fullstack Developers, Graphic Designers and Artists, Car Handling Developers.' },
  { slug: 'priority-allowlist', title: 'FiveM Priority Allowlist Application', icon: Crown, paid: true, description: 'This is a Paid Priority Review Allowlist application, that requires you to purchase a Gold subscription or higher on our web store. Permits one application submission. Before submitting, provide multiple clips showcasing your roleplay abilities.' }
];

export const streamers = [
  { name: 'PulseLive', platform: 'Twitch', viewers: '3,791', live: true },
  { name: 'CrimsonUnit', platform: 'Kick', viewers: '1,248', live: true },
  { name: 'NorthSideRP', platform: 'Twitch', viewers: '842', live: false },
  { name: 'MedicZero', platform: 'Twitch', viewers: '516', live: true },
  { name: 'StreetCode', platform: 'Kick', viewers: '390', live: false },
  { name: 'PulseDispatch', platform: 'Twitch', viewers: '277', live: true }
];

export const jobCards = [
  { title: 'Police Force', icon: Shield, href: '/applications?faction=police' },
  { title: 'EMS', icon: HeartPulse, href: '/applications?faction=ems' },
  { title: 'Lawyers', icon: Scale, href: '/applications?faction=lawyers' }
];

export const mockUser = {
  username: 'TVCTICALHD',
  avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=PulseRP',
  lastLogin: '2026-04-30 18:07 EST',
  steamId: '76561198000000000',
  steamIdentifier: 'steam:110000100000000',
  discord: 'pulseuser#0001 / 000000000000000000',
  subscriptionTier: 'Crimson',
  queueRoles: ['TWE Whitelist', 'Crimson Priority']
};

export const adminStats = [
  { label: 'Active Players', value: '294', icon: HeartPulse },
  { label: 'Open Tickets', value: '12', icon: Briefcase },
  { label: 'Pending Applications', value: '38', icon: BadgeCheck }
];
