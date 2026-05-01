'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { RichTextField } from '@/components/RichTextField';
import { CustomSelect } from '@/components/CustomSelect';

export function SupportTicketForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [server, setServer] = useState('FiveM Public');
  const [category, setCategory] = useState('RP Support');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const editorRef = useRef<Editor | null>(null);

  async function submit() {
    const currentBody = editorRef.current?.getHTML() || body;
    const currentText = editorRef.current?.getText().trim() || '';
    if (!title.trim() || !currentText) {
      setError('Please add a title and message before submitting.');
      return;
    }
    setBusy(true);
    setError('');
    const response = await fetch('/api/support/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, server, category, body: currentBody }) });
    setBusy(false);
    if (response.ok) {
      const data = await response.json();
      router.push(`/support/${data.ticket.id}`);
      router.refresh();
    } else {
      const data = await response.json().catch(() => ({}));
      setError(data.error === 'missing_fields' ? 'Please add a title and message before submitting.' : 'Ticket could not be created. Please try again or contact an admin.');
    }
  }

  return (
    <form className="pulse-panel mx-auto max-w-[1440px] rounded-2xl p-8">
      <h1 className="pulse-heading text-6xl text-[var(--red-primary)]">New Support Ticket</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-3 text-white outline-none focus:border-[var(--red-primary)]" />
        <CustomSelect options={['FiveM Public', 'FiveM Whitelist', 'FiveM Academy']} value={server} onChange={setServer} />
        <CustomSelect options={['RP Support', 'Ban Appeal', 'Bug Report', 'Billing', 'General', 'Event Support']} value={category} onChange={setCategory} />
      </div>
      <div className="mt-6"><RichTextField placeholder={'You State ID:\nYour character name:\nFaction your apart of:\nGang name:\n\nIF THIS IS FOR AN EVENT PLEASE USE EVENT SUPPORT TICKET'} onChange={setBody} onEditorReady={(editor) => { editorRef.current = editor; }} /></div>
      {error && <div className="mt-5 rounded border border-[var(--red-primary)]/40 bg-[var(--red-primary)]/10 px-4 py-3 text-sm text-[var(--red-primary)]">{error}</div>}
      <div className="mt-8 flex justify-end gap-3"><Link href="/support" className="pulse-button border border-white/20 px-5 py-3 text-white">Cancel</Link><button type="button" disabled={busy} onClick={submit} className="pulse-button bg-[var(--red-primary)] px-5 py-3 text-white disabled:opacity-60">{busy ? 'Submitting...' : 'Submit'}</button></div>
    </form>
  );
}
