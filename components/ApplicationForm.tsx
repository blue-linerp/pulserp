'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RichTextField } from '@/components/RichTextField';
import { CustomSelect } from '@/components/CustomSelect';
import type { ApplicationDefinition, ApplicationQuestion } from '@/lib/application-types';

type Answers = Record<string, string | string[]>;

export function ApplicationForm({ definition }: { definition: ApplicationDefinition }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function submit() {
    setBusy(true);
    setError('');
    const response = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: definition.slug, answers }) });
    setBusy(false);
    if (response.ok) {
      router.push('/applications?submitted=1');
      router.refresh();
    } else {
      setError('Please complete all required fields before submitting.');
    }
  }

  return (
    <form className="mx-auto max-w-[1440px] rounded-2xl border border-white/10 bg-[#1b1b1b] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <h1 className="text-3xl md:text-[4rem] text-[var(--red-primary)] text-center font-[Oswald] uppercase break-words leading-[4rem]">{definition.title}</h1>
      <p className="mx-auto mt-8 max-w-3xl text-center text-[18px] leading-7 text-white">{definition.description}</p>
      <div className="mt-10 rounded-xl border border-white/10 px-8">
        {definition.questions.map((question) => <QuestionField key={question.id} question={question} value={answers[question.id]} onChange={(value) => setAnswer(question.id, value)} />)}
      </div>
      {error && <div className="mt-5 rounded border border-[var(--red-primary)]/40 bg-[var(--red-primary)]/10 px-4 py-3 text-sm text-[var(--red-primary)]">{error}</div>}
      <div className="mt-8 flex justify-end gap-3">
        <button type="button" className="rounded border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30">Save</button>
        <button type="button" onClick={submit} disabled={busy} className="rounded bg-[var(--red-primary)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--red-hover)] disabled:opacity-50">{busy ? 'Submitting...' : 'Submit'}</button>
      </div>
    </form>
  );
}

function QuestionField({ question, value, onChange }: { question: ApplicationQuestion; value?: string | string[]; onChange: (value: string | string[]) => void }) {
  return (
    <section className="border-b border-white/10 py-8 last:border-b-0">
      <label className="text-sm font-semibold text-white/55">{question.label} {question.required && <span className="text-[var(--red-primary)]">*</span>}</label>
      <p className="mb-5 mt-2 text-base font-semibold text-white">{question.hint}</p>
      {question.type === 'richtext' && <RichTextField onChange={(html) => onChange(html)} />}
      {question.type === 'text' && <input value={typeof value === 'string' ? value : ''} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-white/10 bg-[#080808] p-4 text-sm text-white outline-none focus:border-[var(--red-primary)]" />}
      {question.type === 'textarea' && <textarea value={typeof value === 'string' ? value : ''} onChange={(event) => onChange(event.target.value)} className="min-h-36 w-full rounded-lg border border-white/10 bg-[#080808] p-4 text-sm text-white outline-none focus:border-[var(--red-primary)]" />}
      {question.type === 'select' && <CustomSelect options={question.options} value={typeof value === 'string' ? value : ''} onChange={(next) => onChange(next)} />}
      {question.type === 'checkboxes' && <Checkboxes question={question} value={Array.isArray(value) ? value : []} onChange={onChange} />}
    </section>
  );
}

function Checkboxes({ question, value, onChange }: { question: ApplicationQuestion; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <div className="flex flex-col gap-4">
      {question.options.map((item) => {
        const checked = value.includes(item);
        return <div key={item} className="flex items-center gap-4 text-lg font-semibold text-white"><input aria-label={item} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked ? [...value, item] : value.filter((current) => current !== item))} className="h-4 w-4 cursor-pointer appearance-none rounded border border-[var(--red-primary)] bg-transparent checked:bg-[var(--red-primary)] checked:shadow-[inset_0_0_0_3px_#1b1b1b]" /><span>{item}</span></div>;
      })}
    </div>
  );
}
