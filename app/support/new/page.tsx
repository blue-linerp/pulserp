import { SupportTicketForm } from '@/components/SupportTicketForm';
import { requireUser } from '@/lib/auth';

export default async function NewSupportTicketPage() {
  await requireUser();
  return <main className="px-5 py-20"><SupportTicketForm /></main>;
}
