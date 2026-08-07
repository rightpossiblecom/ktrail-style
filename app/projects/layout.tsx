import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
	return <DashboardShell>{children}</DashboardShell>;
}
