/**
 * KTrail Style — Cloud Grant config spine.
 * Marketing/dashboard should read from here starting Phase 03.
 * Frisor pages still use lib/site-config.ts until that cutover.
 * Intake types: lib/analyze/types.ts (single source).
 */

export type { StyleRecommendation, StylePreviewResult } from '@/lib/analyze/types';
import type { StylePreviewResult } from '@/lib/analyze/types';

export const siteConfig = {
	legalName: 'K-TRAIL HAIRCUT SERVICES',
	cacNumber: '9200929',
	natureOfBusiness: 'Beauty and salon services',
	address: 'No 19, Secretariat Near NNPC, Ikole-Ekiti, Ekiti State, Nigeria',
	foundedYear: 2026,
	brandName: 'KTrail Style',
	shortName: 'KTS',
	domain: 'ktrail.ai',
	url: 'https://ktrail.ai',
	supportEmail: 'hello@ktrail.ai',
	tagline: 'Book the chair. Preview the cut.',
	description:
		'Multi-barber booking and AI hairstyle previews for Nigerian barbers and their clients. Operated by K-TRAIL HAIRCUT SERVICES.',
	oneLiner:
		'KTrail Style gives Nigerian barbers a shared booking home and AI hair previews so clients book the right cut with confidence.',
	mission:
		'Help independent Nigerian barbers look professional online, fill chairs with clearer appointments, and let clients try styles before they sit down.',
	logo: { text: 'KTrail', accent: ' Style' },
	nav: [
		{ href: '/product', label: 'Product' },
		{ href: '/team', label: 'Team' },
		{ href: '/pricing', label: 'Pricing' },
		{ href: '/about', label: 'About' },
	],
	hero: {
		subtitle: 'KTrail Style',
		heading: ['BOOK THE', 'CHAIR.'],
		headingAccent: 'Preview',
		body: 'A multi-barber home for Nigerian shops — AI style previews for clients, clearer bookings for the chair.',
		cta: { label: 'Log in', href: '/login' },
		secondaryCta: { label: 'Create account', href: '/signup' },
		metaLeft: 'Ekiti · Nigeria',
		metaCenter: 'Multi-barber · AI preview',
		imageCaption: 'Network · chairs across cities',
		backgroundText: 'KTRAIL · KTRAIL · KTRAIL',
	},
	about: {
		heroSubtitle: 'About KTrail Style',
		heroHeading: ['MANY CHAIRS,', 'ONE'],
		heroHeadingAccent: 'Platform',
		heroBody:
			'K-TRAIL HAIRCUT SERVICES builds KTrail Style so Nigerian barbers share a professional booking layer — and clients can preview the cut before they sit down.',
		storyParagraphs: [
			'K-TRAIL HAIRCUT SERVICES is registered in Ikole-Ekiti (CAC 9200929) for beauty and salon services. The software product under that entity is KTrail Style.',
			'We are not building another single-shop brochure. The story is a network: independent barbers and small shops list chairs, clients discover them, and AI previews reduce “will this suit me?” friction.',
			'Today the product is live for barbers and shops: list chairs, take bookings, and let clients preview the cut before they sit down.',
		],
	},
	productShowcase: {
		eyebrow: 'The product',
		heading: 'Booking network + style AI',
		body: 'Barbers get a shared front desk. Clients get a preview pack before they commit to the chair.',
		moments: [
			{
				title: 'Multi-barber discovery',
				body: 'Many chairs under one KTrail Style presence — not one shop pretending to be a platform.',
				image: '/images/gallery/look-1.jpg',
			},
			{
				title: 'AI hairstyle changer',
				body: 'Upload a photo, get barber-ready recommendations clients can actually discuss.',
				image: '/images/gallery/look-2.jpg',
			},
			{
				title: 'Chair request handoff',
				body: 'Turn a preview into a booking intent the barber can confirm — WhatsApp-friendly handoff.',
				image: '/images/gallery/look-3.jpg',
			},
		],
	},
	finalCta: {
		eyebrow: 'Get started',
		heading: 'Ready for the network?',
		body: 'Log in to your shop or create an account. Book a walkthrough if you want a guided look at the product.',
		cta: { label: 'Log in', href: '/login' },
		secondaryCta: { label: 'Create account', href: '/signup' },
		railText: 'LOG IN',
	},
	getInEarly: {
		eyebrow: 'Get started',
		heading: 'Three ways in',
		cards: [
			{
				title: 'Log in',
				body: 'Open your shop dashboard — bookings, barbers, and style previews.',
				cta: { label: 'Log in', href: '/login' },
			},
			{
				title: 'Create account',
				body: 'Set up your shop and start listing chairs under KTrail Style.',
				cta: { label: 'Create account', href: '/signup' },
			},
			{
				title: 'Talk to sales',
				body: 'Book a walkthrough of the dashboard and AI preview loop.',
				cta: { label: 'Book a walkthrough', href: '/demo' },
			},
		],
	},
	footer: {
		description:
			'Multi-barber booking and AI style previews for Nigerian barbers — operated by K-TRAIL HAIRCUT SERVICES.',
		productLinks: [
			{ label: 'Product', href: '/product' },
			{ label: 'Pricing', href: '/pricing' },
			{ label: 'Log in', href: '/login' },
			{ label: 'Create account', href: '/signup' },
			{ label: 'Book a walkthrough', href: '/demo' },
		],
		companyLinks: [
			{ label: 'About', href: '/about' },
			{ label: 'Team', href: '/team' },
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Terms', href: '/terms' },
		],
	},
	storageKeys: {
		session: 'kts_session',
		leads: 'kts_leads',
		assessments: 'kts_assessments',
		activity: 'kts_activity',
	},
	logPrefix: '[KTrail …]',

	problems: [
		{
			title: 'WhatsApp booking chaos',
			body: 'Nigerian barbers lose time and revenue to no-shows, double-bookings, and “are you free?” chats with no shared calendar.',
		},
		{
			title: 'Fear of the wrong cut',
			body: 'Without a preview, clients hesitate, change their mind mid-chair, or never book premium styles.',
		},
		{
			title: 'One-shop sites do not scale the trade',
			body: 'A single-shop brochure site does not help the network of barbers who need a marketplace-style presence under one brand.',
		},
	],

	/** Capability metrics only — never fake traction */
	stats: [
		{ value: 'Multi-shop', label: 'Barber network model' },
		{ value: 'AI preview', label: 'Style before you sit' },
		{ value: '₦ pricing', label: 'Built for Nigeria' },
		{ value: 'Ekiti → cities', label: 'Cities we serve' },
	],

	launchStrip: {
		eyebrow: 'Available in',
		places: ['Ikole-Ekiti', 'Ado-Ekiti', 'Lagos', 'Abuja'],
	},

	howItWorks: [
		{
			step: '01',
			title: 'Barbers join the network',
			body: 'List services, hours, and chairs under one KTrail Style presence.',
		},
		{
			step: '02',
			title: 'Clients preview the cut',
			body: 'AI hairstyle changer shows options on the client’s own photo before they book.',
		},
		{
			step: '03',
			title: 'Book the chair',
			body: 'Clear appointment slots replace endless WhatsApp threads.',
		},
	],

	pipeline: [
		{ id: 'photo', label: 'Client photo or brief' },
		{ id: 'analyze', label: 'Face & texture read' },
		{ id: 'styles', label: 'Barber-ready recommendations' },
		{ id: 'book', label: 'Chair request / send to barber' },
	],

	audiences: [
		{
			title: 'Independent barbers & small shops',
			body: 'Get a professional booking front desk without building your own website.',
		},
		{
			title: 'Clients choosing a cut',
			body: 'Preview styles, pick a barber, and book with less guesswork.',
		},
		{
			title: 'Salon owners with multiple chairs',
			body: 'See the network story — many barbers, one brand layer.',
		},
	],

	features: [
		{
			title: 'Multi-barber booking',
			body: 'One platform story for many chairs across Nigerian cities.',
		},
		{
			title: 'AI hairstyle changer',
			body: 'Clients try cuts and colors on their photo before they sit down.',
		},
		{
			title: 'Style library',
			body: 'Curated fades, crops, beards, and color looks barbers can reference.',
		},
		{
			title: 'Chair requests',
			body: 'Turn a preview into a booking intent the barber can confirm.',
		},
		{
			title: 'Naira-ready pricing',
			body: 'Services and plans framed in ₦ for local shops.',
		},
		{
			title: 'WhatsApp-friendly handoff',
			body: 'Send a preview pack to the barber’s chat after the client picks a look.',
		},
	],

	testimonials: [
		{
			quote:
				'The preview pack stops the “will this suit me?” argument before the chair.',
			author: 'Adebola Fashola',
			role: 'Shop owner, Ado-Ekiti',
		},
		{
			quote:
				'Clients book faster when they can see the cut on their own face — then the chair request lands in one place.',
			author: 'Chinedu Okeke',
			role: 'Barber, Lagos',
		},
		{
			quote:
				'Clients who see the fade on their face book the premium slot faster.',
			author: 'Ifeoma Nwachukwu',
			role: 'Stylist, Ikole-Ekiti',
		},
	],

	pricingTiers: [
		{
			name: 'Starter',
			price: 'Free',
			description: 'For barbers who want a booking home and style previews.',
			cta: { label: 'Log in', href: '/login' },
			highlights: ['Chair calendar', 'AI style previews', 'Client requests'],
		},
		{
			name: 'Shop',
			price: 'Create account',
			description: 'For shops listing multiple chairs under one KTrail Style presence.',
			cta: { label: 'Create account', href: '/signup' },
			highlights: ['Multi-barber listing', 'Style library', 'WhatsApp handoff'],
		},
		{
			name: 'Studio',
			price: 'Talk to us',
			description: 'For multi-location shops that want a guided walkthrough.',
			cta: { label: 'Book a walkthrough', href: '/demo' },
			highlights: ['Guided setup', 'Network onboarding', 'Priority support'],
		},
	],

	faq: [
		{
			q: 'Is KTrail Style a single barbershop website?',
			a: 'No. It is a multi-barber platform — many chairs under one product, operated by K-TRAIL HAIRCUT SERVICES.',
		},
		{
			q: 'Is booking and AI live today?',
			a: 'Yes. Sign in to manage chairs, run AI style previews, and take booking requests from the web app.',
		},
		{
			q: 'Who is the legal entity?',
			a: 'K-TRAIL HAIRCUT SERVICES, CAC business name 9200929, Ikole-Ekiti, Ekiti State.',
		},
		{
			q: 'Do clients need an app store download?',
			a: 'KTrail Style is web-first. Use it in the browser on phone or desktop — no app store download required.',
		},
	],

	team: [
		{
			name: 'Taiye Babatunde',
			role: 'Founder',
			bio: 'Builder and computer engineering student focused on practical products for Nigerian operators. Leads KTrail Style product direction — multi-barber booking and AI style previews that turn WhatsApp chaos into a clear chair request.',
			linkedin: 'https://www.linkedin.com/in/tarvel0',
		},
		{
			name: 'Babatunde Olaleye',
			role: 'Co-founder',
			bio: 'Cloud DevOps, data, and frontend engineer based in Lagos. Shapes the infrastructure and client-facing experience so barbers and clients can move from preview to booked chair without friction.',
			linkedin: 'https://www.linkedin.com/in/babatunde-olaleye/',
		},
	],

	demoResults: [
		{
			id: 'demo-tunde-fade',
			createdAt: '2026-08-01T10:15:00.000Z',
			clientName: 'Tunde Adebayo',
			city: 'Ado-Ekiti',
			faceShape: 'oval',
			hairTexture: 'curly',
			requestedStyle: 'Low skin fade with soft top',
			recommendedStyles: [
				{
					name: 'Low skin fade',
					category: 'cut',
					why: 'Keeps length on top for curly density while cleaning the perimeter for a sharp street finish.',
					difficulty: 'easy',
				},
				{
					name: 'Taper + line-up',
					category: 'cut',
					why: 'Strong temple and neck line for oval faces without over-thinning the crown.',
					difficulty: 'medium',
				},
				{
					name: 'Cut + light beard shape',
					category: 'combo',
					why: 'Balances jawline so the fade does not look unfinished in photos.',
					difficulty: 'medium',
				},
			],
			previewNotes:
				'Client wants low maintenance for humid weather. Avoid high disconnect fades that need weekly touch-ups.',
			suggestedBarberType: 'Skin-fade specialist',
			confidence: 86,
			nextAction: 'book_chair',
		},
		{
			id: 'demo-amaka-color',
			createdAt: '2026-08-03T14:40:00.000Z',
			clientName: 'Amaka Okoro',
			city: 'Lagos',
			faceShape: 'heart',
			hairTexture: 'coily',
			requestedStyle: 'Soft caramel highlights on natural coils',
			recommendedStyles: [
				{
					name: 'Caramel face-frame highlights',
					category: 'color',
					why: 'Warms the perimeter for heart-shaped faces without full-head lift risk.',
					difficulty: 'medium',
				},
				{
					name: 'Defined wash-and-go cut',
					category: 'cut',
					why: 'Shape the silhouette so color reads clearly on coily texture.',
					difficulty: 'easy',
				},
				{
					name: 'Gloss + trim combo',
					category: 'combo',
					why: 'Salon-friendly upsell: refresh ends then place highlights.',
					difficulty: 'bold',
				},
				{
					name: 'Subtle copper tips',
					category: 'color',
					why: 'Lower-commitment color test before a larger highlight session.',
					difficulty: 'easy',
				},
			],
			previewNotes:
				'Prefer low-chemical path first. Recommend strand test language in barber consult notes.',
			suggestedBarberType: 'Color-capable stylist',
			confidence: 78,
			nextAction: 'send_to_barber',
		},
	] satisfies StylePreviewResult[],

	dashboard: {
		kpis: [
			{ label: 'Bookings today', value: '18', hint: 'Across network chairs' },
			{ label: 'Active barbers', value: '12', hint: 'Ikole · Ado · Lagos' },
			{ label: 'AI previews', value: '47', hint: 'Last 7 days' },
			{ label: 'Fill rate', value: '86%', hint: 'Confirmed vs requested' },
		],
		bookingsByDay: [
			{ day: 'Mon', value: 10 },
			{ day: 'Tue', value: 14 },
			{ day: 'Wed', value: 11 },
			{ day: 'Thu', value: 16 },
			{ day: 'Fri', value: 22 },
			{ day: 'Sat', value: 28 },
			{ day: 'Sun', value: 9 },
		],
		previewsByStyle: [
			{ label: 'Fades', value: 38 },
			{ label: 'Beard', value: 22 },
			{ label: 'Color', value: 18 },
			{ label: 'Combo', value: 14 },
		],
		barbers: [
			{ name: 'Chinedu Okeke', city: 'Ado-Ekiti', specialty: 'Skin fades', chairs: 2 },
			{ name: 'Bola Adeyemi', city: 'Ikole-Ekiti', specialty: 'Classic cuts', chairs: 1 },
			{ name: 'Ifeanyi Nwosu', city: 'Lagos', specialty: 'Beard sculpt', chairs: 3 },
			{ name: 'Grace Ekanem', city: 'Abuja', specialty: 'Color + coils', chairs: 2 },
		],
		bookings: [
			{
				client: 'Tunde A.',
				barber: 'Chinedu Okeke',
				service: 'Low skin fade',
				when: 'Today · 11:00',
				status: 'Confirmed',
				price: '₦4,500',
			},
			{
				client: 'Amaka O.',
				barber: 'Grace Ekanem',
				service: 'Caramel highlights consult',
				when: 'Today · 14:30',
				status: 'Pending',
				price: '₦12,000',
			},
			{
				client: 'Segun M.',
				barber: 'Ifeanyi Nwosu',
				service: 'Cut + beard',
				when: 'Tomorrow · 09:30',
				status: 'Confirmed',
				price: '₦7,000',
			},
			{
				client: 'Kemi B.',
				barber: 'Bola Adeyemi',
				service: 'Kids cut',
				when: 'Tomorrow · 16:00',
				status: 'Walk-in hold',
				price: '₦3,000',
			},
		],
		styleLibrary: [
			{ name: 'Low skin fade', category: 'cut', difficulty: 'easy' },
			{ name: 'Taper + line-up', category: 'cut', difficulty: 'medium' },
			{ name: 'Caramel face-frame', category: 'color', difficulty: 'medium' },
			{ name: 'Beard sculpt', category: 'beard', difficulty: 'easy' },
			{ name: 'Cut + beard reset', category: 'combo', difficulty: 'medium' },
			{ name: 'Copper tip test', category: 'color', difficulty: 'easy' },
		],
	},
} as const;

export type SiteConfig = typeof siteConfig;
