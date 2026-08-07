import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function BarbersLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
