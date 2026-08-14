import { FormPageShell } from '@/components/FormPageShell';
import { LeadForm } from '@/components/LeadForm';

export default function DemoPage() {
	return (
		<FormPageShell
			eyebrow="Walkthrough"
			title="Book a walkthrough"
			body="See the multi-barber dashboard and AI style preview loop with the team."
		>
			<LeadForm type="demo" />
		</FormPageShell>
	);
}
