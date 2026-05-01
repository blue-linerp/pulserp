import { AdminPanel } from '@/components/AdminPanel';
import { requireAdmin } from '@/lib/admin';
import { listApplications } from '@/lib/applications-store';
import { getSettings } from '@/lib/settings';
import { getUserPriorities } from '@/lib/user-priorities';
import { listApplicationDefinitions } from '@/lib/application-definitions';
import { listSupportTickets } from '@/lib/support-tickets';

export default async function AdminPage() {
  await requireAdmin();
  const settings = getSettings();
  const applications = listApplications();
  const applicationDefinitions = listApplicationDefinitions();
  const priorities = getUserPriorities();
  const supportTickets = listSupportTickets();
  return <AdminPanel initialSettings={settings} initialApplications={applications} initialApplicationDefinitions={applicationDefinitions} initialPriorities={priorities} initialSupportTickets={supportTickets} />;
}
