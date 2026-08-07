import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function NewLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
