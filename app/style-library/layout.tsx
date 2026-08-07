import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function StyleLibraryLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
