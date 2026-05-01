import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-32">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="pulse-heading text-4xl text-white md:text-5xl">You&apos;re currently not logged in</h1>
        <a href="/api/auth/steam" className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] transition hover:bg-[var(--bg-tertiary)]">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className="fill-white"><path d="M12 0a12 12 0 0 0-11.9 10.6l6.4 2.7a3.4 3.4 0 0 1 1.9-.6l2.9-4.2v-.1a4.6 4.6 0 1 1 4.6 4.6h-.1l-4.2 3a3.4 3.4 0 0 1-5.7 3.4 3.4 3.4 0 0 1-1-2.4l-4.6-1.9A12 12 0 1 0 12 0zM7.5 18.2l-1.5-.6a2.6 2.6 0 0 0 1.4 1.3 2.6 2.6 0 0 0 3.4-1.4 2.6 2.6 0 0 0 0-2 2.6 2.6 0 0 0-1.4-1.4 2.6 2.6 0 0 0-2 0l1.5.6a1.9 1.9 0 1 1-1.4 3.5zm12.5-7.6a3.1 3.1 0 1 1-3.1-3 3.1 3.1 0 0 1 3.1 3zm-5.5 0a2.3 2.3 0 1 0 2.3-2.3 2.3 2.3 0 0 0-2.3 2.3z"/></svg>
          Login via Steam
        </a>
      </div>
    </main>
  );
}
