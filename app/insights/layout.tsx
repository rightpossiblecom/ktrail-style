import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
