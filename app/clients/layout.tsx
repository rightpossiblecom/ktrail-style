import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
