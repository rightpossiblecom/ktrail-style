import { FormPageShell } from '@/components/FormPageShell';
import { LeadForm } from '@/components/LeadForm';

export default function EarlyAccessPage() {
	return (
		<FormPageShell
			eyebrow="Early access"
			title="Apply for early access"
			body="For shops ready to pilot when seats open. Tell us why you're a fit."
		>
			<LeadForm type="early-access" />
		</FormPageShell>
	);
}
