import { FormPageShell } from '@/components/FormPageShell';
import { LeadForm } from '@/components/LeadForm';

export default function WaitlistPage() {
	return (
		<FormPageShell
			eyebrow="Waitlist"
			title="Join the waitlist"
			body="Get launch-corridor updates for Nigerian barbers and shops. No live billing yet — Wave 1 is early-stage."
		>
			<LeadForm type="waitlist" />
		</FormPageShell>
	);
}
