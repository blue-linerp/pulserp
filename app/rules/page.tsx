import { AlertTriangle, BookOpen, CheckCircle2, FileText, Gavel, Shield, Users } from 'lucide-react';

const sections = [
  {
    id: 'community-conduct',
    title: 'Community Conduct',
    icon: Users,
    rules: [
      'Treat every member with respect in-game, on Discord, and on all Pulse RP platforms.',
      'Harassment, hate speech, discrimination, threats, or targeted toxicity are not tolerated.',
      'Do not create drama, encourage pile-ons, or use out-of-character conflict to affect roleplay.',
      'Follow staff instructions during moderation situations and open a ticket if you disagree.'
    ]
  },
  {
    id: 'roleplay-standards',
    title: 'Roleplay Standards',
    icon: BookOpen,
    rules: [
      'Stay in character while in city unless a staff member directs otherwise.',
      'Value your life and react realistically to threats, injuries, police interactions, and dangerous situations.',
      'Do not break immersion with trolling, unrealistic behavior, or low-effort roleplay.',
      'Every scenario should create roleplay for all parties involved, not just a win condition for yourself.'
    ]
  },
  {
    id: 'fail-rp',
    title: 'Fail RP, Powergaming & Metagaming',
    icon: AlertTriangle,
    rules: [
      'Do not use information gained outside of roleplay to influence in-character decisions.',
      'Do not force actions, outcomes, injuries, or storylines onto another player without reasonable roleplay.',
      'Do not abuse game mechanics, animations, emotes, vehicles, or menus to gain an unfair advantage.',
      'Do not combat log, disconnect, respawn, or relog to avoid consequences from an active scene.'
    ]
  },
  {
    id: 'crime',
    title: 'Criminal Roleplay',
    icon: Gavel,
    rules: [
      'Criminal scenes must have roleplay intent and cannot be constant random violence.',
      'Robberies, kidnappings, and hostile scenes must give the other party meaningful interaction.',
      'Do not rob, attack, or bait emergency services without strong roleplay reason.',
      'Hostage situations, shootouts, and negotiations must remain realistic and fair.'
    ]
  },
  {
    id: 'police-ems',
    title: 'Police, EMS & Government',
    icon: Shield,
    rules: [
      'Respect emergency scenes and allow police, EMS, and civilians time to roleplay outcomes.',
      'Do not interfere with medical roleplay unless you have a strong in-character reason.',
      'Government corruption, impersonation, or abuse of authority requires staff approval where applicable.',
      'Do not use department tools, vehicles, uniforms, or permissions outside their intended roleplay purpose.'
    ]
  },
  {
    id: 'exploits',
    title: 'Exploits, Cheating & Economy Abuse',
    icon: FileText,
    rules: [
      'Cheating, mod menus, injected clients, duplication, bug abuse, or third-party advantage tools result in removal.',
      'Report exploits immediately through support instead of sharing or using them.',
      'Do not transfer money, items, vehicles, or assets through loopholes or out-of-character deals.',
      'Staff may reverse economy damage caused by exploits, bugs, or rule violations.'
    ]
  }
];

const quickRules = ['No RDM / VDM', 'No Metagaming', 'No Powergaming', 'Value Your Life', 'No Combat Logging', 'Respect Staff'];

export default function RulesPage() {
  return (
    <main className="bg-[var(--bg-primary)] px-5 py-24 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="pulse-panel relative overflow-hidden rounded-3xl border-[var(--red-primary)] p-8 md:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--red-primary)]/10 blur-3xl" />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--red-primary)] bg-[var(--red-primary)]/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--red-primary)]">
              <Shield size={14} /> Pulse RP Rulebook
            </div>
            <h1 className="pulse-heading max-w-4xl text-6xl text-white md:text-8xl">Community <span className="text-[var(--red-primary)]">Rules</span></h1>
            <p className="mt-5 max-w-2xl text-[var(--text-secondary)]">These rules protect high-quality roleplay, fairness, and immersion across Pulse RP. By playing on the server, you agree to follow this rulebook and staff direction.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickRules.map((rule) => (
                <div key={rule} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-black/30 p-4 font-mono text-xs uppercase text-[var(--text-secondary)]">
                  <CheckCircle2 size={16} className="text-[var(--online-green)]" /> {rule}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="pulse-panel h-fit rounded-2xl p-5 lg:sticky lg:top-24">
            <h2 className="pulse-heading mb-4 text-2xl text-[var(--red-primary)]">Contents</h2>
            <nav className="space-y-2">
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`} className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:border-[var(--red-primary)] hover:text-white">
                  <span>{section.title}</span>
                  <span className="font-mono text-xs text-[var(--red-primary)]">{String(index + 1).padStart(2, '0')}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--red-primary)] bg-[var(--red-primary)]/10 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 text-[var(--red-primary)]" size={22} />
                <div>
                  <h3 className="font-bold text-white">Important Notice</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">Rules may be updated at any time. Staff decisions are based on context, evidence, and community safety. Not knowing the rules is not an excuse.</p>
                </div>
              </div>
            </div>

            {sections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="pulse-panel scroll-mt-28 rounded-2xl p-6 md:p-8">
                  <header className="mb-6 flex items-center gap-4 border-b border-[var(--border)] pb-5">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--red-primary)]/15 text-[var(--red-primary)]">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Section {sectionIndex + 1}</div>
                      <h2 className="pulse-heading text-3xl text-white md:text-4xl">{section.title}</h2>
                    </div>
                  </header>
                  <div className="space-y-3">
                    {section.rules.map((rule, ruleIndex) => (
                      <div key={rule} className="grid gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 md:grid-cols-[72px_1fr]">
                        <div className="font-mono text-sm font-black text-[var(--red-primary)]">{sectionIndex + 1}.{ruleIndex + 1}</div>
                        <p className="text-sm leading-6 text-[var(--text-secondary)]">{rule}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
