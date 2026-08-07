import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function BookingsLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
