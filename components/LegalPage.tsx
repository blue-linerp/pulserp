import { AlertTriangle, CheckCircle2, FileText, type LucideIcon } from 'lucide-react';

type LegalSection = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

type Props = {
  title: string;
  accent: string;
  eyebrow: string;
  subtitle: string;
  noticeTitle: string;
  noticeBody: string;
  quickItems: string[];
  sections: LegalSection[];
};

export function LegalPage({ title, accent, eyebrow, subtitle, noticeTitle, noticeBody, quickItems, sections }: Props) {
  return (
    <main className="bg-[var(--bg-primary)] px-5 py-24 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="pulse-panel relative overflow-hidden rounded-3xl border-[var(--red-primary)] p-8 md:p-12">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--red-primary)]/10 blur-3xl" />
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--red-primary)] bg-[var(--red-primary)]/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--red-primary)]">
              <FileText size={14} /> {eyebrow}
            </div>
            <h1 className="pulse-heading max-w-4xl text-6xl text-white md:text-8xl">{title} <span className="text-[var(--red-primary)]">{accent}</span></h1>
            <p className="mt-5 max-w-2xl text-[var(--text-secondary)]">{subtitle}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Last updated: April 30, 2026</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-black/30 p-4 font-mono text-xs uppercase text-[var(--text-secondary)]">
                  <CheckCircle2 size={16} className="text-[var(--online-green)]" /> {item}
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
                  <h3 className="font-bold text-white">{noticeTitle}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{noticeBody}</p>
                </div>
              </div>
            </div>

            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="pulse-panel scroll-mt-28 rounded-2xl p-6 md:p-8">
                  <header className="mb-6 flex items-center gap-4 border-b border-[var(--border)] pb-5">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--red-primary)]/15 text-[var(--red-primary)]">
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Section {index + 1}</div>
                      <h2 className="pulse-heading text-3xl text-white md:text-4xl">{section.title}</h2>
                    </div>
                  </header>
                  <div className="grid gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-5 md:grid-cols-[72px_1fr]">
                    <div className="font-mono text-sm font-black text-[var(--red-primary)]">{index + 1}.0</div>
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">{section.body}</p>
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
