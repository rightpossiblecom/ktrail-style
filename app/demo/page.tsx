import { FormPageShell } from '@/components/FormPageShell';
import { LeadForm } from '@/components/LeadForm';

export default function DemoPage() {
	return (
		<FormPageShell
			eyebrow="Demo"
			title="Request a demo"
			body="See the multi-barber dashboard and AI style preview loop on a guided walkthrough."
		>
			<LeadForm type="demo" />
		</FormPageShell>
	);
}
