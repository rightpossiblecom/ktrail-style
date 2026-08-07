/**
 * KTrail Style — demo pipeline + conversion modals (Wave 1 screen-record).
 */

export const demoFlow = {
	hardcodeVisionDemo: true,
	pipelineSteps: [
		{ id: 'upload', label: 'Read client photo' },
		{ id: 'face', label: 'Estimate face shape & texture' },
		{ id: 'match', label: 'Match barber-ready styles' },
		{ id: 'preview', label: 'Build style preview pack' },
	],
	modals: {
		bookChair: {
			title: 'Request a chair',
			fields: ['barberCity', 'preferredDay', 'notes'] as const,
			successToast: 'Chair request saved for demo.',
		},
		sendToBarber: {
			title: 'Send preview to barber',
			fields: ['barberName', 'whatsapp', 'notes'] as const,
			successToast: 'Preview queued to barber (demo).',
		},
	},
} as const;

export type DemoFlow = typeof demoFlow;
