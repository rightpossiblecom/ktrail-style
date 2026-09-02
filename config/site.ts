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
	brandName: 'KTrail',
	shortName: 'KTrail OS',
	domain: 'ktrail-style.vercel.app',
	url: 'https://ktrail-style.vercel.app',
	tagline: 'Turn WhatsApp requests into booked, paid chairs.',
	description:
		'KTrail helps barbershops turn WhatsApp requests into booked, paid chairs and returning clients. Operated by K-TRAIL HAIRCUT SERVICES.',
	oneLiner:
		'KTrail helps barbershops turn WhatsApp requests into booked, paid chairs and returning clients.',
	mission:
		'Give multi-chair Nigerian shops one desk for intake, calendars, deposits, staff, and returning clients — so the next generation inherits a business, not a chat pile.',
	logo: { text: 'KTrail', accent: ' OS' },
	nav: [
		{ href: '/product', label: 'Product' },
		{ href: '/dashboard', label: 'Command' },
		{ href: '/new', label: 'Inbox' },
		{ href: '/bookings', label: 'Calendar' },
		{ href: '/clients', label: 'Clients' },
		{ href: '/pricing', label: 'Pricing' },
		{ href: '/about', label: 'About' },
		{ href: '/team', label: 'Team' },
	],
	hero: {
		subtitle: 'KTrail OS',
		heading: ['Turn WhatsApp', 'into paid'],
		headingAccent: 'chairs',
		body: 'KTrail helps barbershops turn WhatsApp requests into booked, paid chairs and returning clients. Built first for 3–10 chair shops in Lagos.',
		cta: { label: 'Log in', href: '/login' },
		secondaryCta: { label: 'Create account', href: '/signup' },
		metaLeft: 'Lagos first',
		metaCenter: 'Inbox · calendar · deposits',
		imageCaption: 'Command · Fade District, Lekki',
		backgroundText: 'KTRAIL OS',
	},
	about: {
		heroSubtitle: 'About KTrail',
		heroHeading: ['THE SHOP', 'OPERATING'],
		heroHeadingAccent: 'System',
		heroBody:
			'KTrail is the desk a multi-chair shop uses to turn incoming requests into booked chairs, deposits, and returning clients.',
		storyParagraphs: [
			'K-TRAIL HAIRCUT SERVICES is registered in Ikole-Ekiti (CAC 9200929). The software product is KTrail OS — built for operators who already run a real shop and lose money in WhatsApp.',
			'A 3–10 chair shop in Lagos does not need another lookbook. It needs one inbox, one calendar, one deposit trail, and a client record that survives the Saturday rush.',
			'That is the company: request in, chair booked, revenue visible. Generational wealth starts when the shop can be handed down with its books intact.',
		],
	},
	productShowcase: {
		eyebrow: 'The product',
		heading: 'Inbox becomes revenue',
		body: 'A request lands. KTrail prices it, matches a barber, finds a chair, and prepares the deposit.',
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
		heading: 'Open the shop desk',
		body: 'Log in to Command or create an account. The first minute stays empty until you run Smart Inbox.',
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
			'KTrail helps barbershops turn WhatsApp requests into booked, paid chairs and returning clients.',
		productLinks: [
			{ label: 'Product', href: '/product' },
			{ label: 'Command', href: '/dashboard' },
			{ label: 'Inbox', href: '/new' },
			{ label: 'Calendar', href: '/bookings' },
			{ label: 'Clients', href: '/clients' },
			{ label: 'Team roster', href: '/barbers' },
			{ label: 'Services', href: '/services' },
			{ label: 'Insights', href: '/insights' },
			{ label: 'Preview Studio', href: '/style-library' },
			{ label: 'Pricing', href: '/pricing' },
		],
		resourceLinks: [
			{ label: 'Help', href: '/help' },
			{ label: 'Security', href: '/security' },
			{ label: 'Features', href: '/features' },
			{ label: 'Blog', href: '/blog' },
		],
		companyLinks: [
			{ label: 'About', href: '/about' },
			{ label: 'Team', href: '/team' },
			{ label: 'Log in', href: '/login' },
			{ label: 'Sign up', href: '/signup' },
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
			title: 'Revenue lives in chat',
			body: 'Shops lose Saturday chairs to “you free?” threads, no-shows, and deposits that never get asked.',
		},
		{
			title: 'No shared front desk',
			body: 'Four barbers means four inboxes. The owner cannot see occupancy, deposits, or who is actually booked.',
		},
		{
			title: 'Clients never become records',
			body: 'A wedding taper walks in once, pays cash, and disappears. There is no follow-up, no lifetime value, no handoff.',
		},
	],

	/** Capability metrics only — never fake traction */
	stats: [
		{ value: '3–10 chairs', label: 'First shop size' },
		{ value: '₦ / month', label: 'Priced for Lagos shops' },
		{ value: '90s intake', label: 'Request becomes a booking pack' },
		{ value: 'One desk', label: 'Inbox, calendar, deposits' },
	],

	launchStrip: {
		eyebrow: 'Available in',
		places: ['Ikole-Ekiti', 'Ado-Ekiti', 'Lagos', 'Abuja'],
	},

	howItWorks: [
		{
			step: '01',
			title: 'Drop the request in Inbox',
			body: 'Paste a WhatsApp thread, upload a selfie, or use the Fade District sample.',
		},
		{
			step: '02',
			title: 'KTrail builds the booking pack',
			body: 'Service, duration, price, barber match, chair, and deposit land together.',
		},
		{
			step: '03',
			title: 'Confirm and watch Command move',
			body: 'Send WhatsApp confirmation. Utilization and projected revenue update on the same desk.',
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
			title: 'Smart Client Inbox',
			body: 'Turn a WhatsApp screenshot or selfie into a priced, matched booking pack.',
		},
		{
			title: 'Command',
			body: 'See occupancy, deposits, projected revenue, and today’s work on one screen.',
		},
		{
			title: 'Calendar',
			body: 'Chairs and barbers share one schedule instead of four chat threads.',
		},
		{
			title: 'Client records',
			body: 'Keep Tunde’s taper, spend, and next follow-up after the wedding.',
		},
		{
			title: 'Naira SaaS pricing',
			body: 'Monthly shop plans with chair limits — not a brochure price list.',
		},
		{
			title: 'WhatsApp confirmation',
			body: 'Approve the pack and open a real prefilled confirmation to the client.',
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
		{
			quote:
				'I stopped screenshotting WhatsApp threads. The chair request lands with the photo and the slot.',
			author: 'Kunle Balogun',
			role: 'Shop lead, Abuja',
		},
		{
			quote:
				'My clients in Lagos pick a look on their phone, then walk in already decided. Less mid-chair panic.',
			author: 'Zainab Lawal',
			role: 'Client, Ikeja',
		},
	],

	pricingTiers: [
		{
			name: 'Solo',
			price: '₦8,500 / month',
			description: 'One chair, one inbox, deposits, and WhatsApp confirmation.',
			cta: { label: 'Start Solo', href: '/signup' },
			highlights: ['1 chair', 'Smart Inbox', 'Client records'],
		},
		{
			name: 'Shop',
			price: '₦24,000 / month',
			description: 'For 3–10 chair independent shops. Command, calendar, and staff performance.',
			cta: { label: 'Create shop account', href: '/signup' },
			highlights: ['Up to 10 chairs', 'Deposits and occupancy', 'WhatsApp handoff'],
		},
		{
			name: 'Multi-location',
			price: '₦65,000 / month',
			description: 'Two or more locations with a shared operator desk and walkthrough.',
			cta: { label: 'Talk to sales', href: '/demo' },
			highlights: ['Unlimited locations', 'Insights across shops', 'Priority onboarding'],
		},
	],

	faq: [
		{
			q: 'Is KTrail a single barbershop website?',
			a: 'No. KTrail is an operating system for multi-chair shops — inbox, calendar, deposits, staff, and client records.',
		},
		{
			q: 'Is the product live today?',
			a: 'Yes. Create a shop account, sign in, and Command reads from the live KTrail workspace in Google Cloud.',
		},
		{
			q: 'Who is the legal entity?',
			a: 'K-TRAIL HAIRCUT SERVICES, CAC business name 9200929, Ikole-Ekiti, Ekiti State.',
		},
		{
			q: 'Do clients need an app store download?',
			a: 'KTrail Style is web-first. Use it in the browser on phone or desktop — no app store download required.',
		},
		{
			q: 'Where do booking photos go?',
			a: 'Style-preview photos stay on the device for that session so the barber can discuss the look. We do not sell photos or use them to train public models. See /security for the full handling note.',
		},
		{
			q: 'Can a shop list more than one barber?',
			a: 'Yes. Shop and Studio plans are built for multiple chairs under one KTrail Style presence — hours, services, and requests in one place.',
		},
		{
			q: 'How do I get help with an account?',
			a: 'Open /help or /team. For a guided look at the dashboard, book a walkthrough on /demo.',
		},
	],

	team: [
		{
			name: 'Taiye Babatunde',
			role: 'Founder',
			bio: 'Builder and computer engineering student focused on practical products for Nigerian operators. Leads KTrail Style product direction — multi-barber booking and AI style previews that turn WhatsApp chaos into a clear chair request.',
			linkedin: 'https://www.linkedin.com/in/tarvel0',
			photo: '/team/taiye-babatunde.png',
		},
		{
			name: 'Babatunde Olaleye',
			role: 'Co-founder',
			bio: 'Cloud DevOps, data, and frontend engineer based in Lagos. Shapes the infrastructure and client-facing experience so barbers and clients can move from preview to booked chair without friction.',
			linkedin: 'https://www.linkedin.com/in/babatunde-olaleye/',
			photo: '/team/babatunde-olaleye.jpg',
		},
	],

	solutionsPage: {
		eyebrow: 'Solutions',
		heading: ['ONE NETWORK,', 'THREE'],
		headingAccent: 'Chairs',
		body: 'KTrail Style is built for the people who cut, the shops that roster them, and the clients who sit down. Same product — different jobs.',
		lanes: [
			{
				id: 'barbers',
				kicker: '01 · Barbers',
				title: 'Own the chair without living in WhatsApp',
				body: 'Independent barbers list hours, services, and a face for the network. Clients find you, preview a cut, and send a chair request instead of a midnight “you free?” ping.',
				points: [
					'Public chair profile under the KTrail Style network',
					'AI preview packs clients can discuss before they sit',
					'WhatsApp-friendly handoff when you still want the chat',
				],
			},
			{
				id: 'shops',
				kicker: '02 · Shops',
				title: 'Many chairs, one front desk',
				body: 'Salon owners stop running three calendars and a group chat. List every barber under one shop presence — naira pricing, shared hours, requests in one queue.',
				points: [
					'Multi-barber listing under one brand layer',
					'Fill-rate view across chairs, not one inbox each',
					'Studio walkthrough when you run more than one location',
				],
			},
			{
				id: 'clients',
				kicker: '03 · Clients',
				title: 'See the cut before you commit',
				body: 'Upload a photo, try fades and color on your own face, then book the chair that can actually do the work. Less guesswork. Fewer mid-cut regrets.',
				points: [
					'Style preview on your photo — not a stranger’s lookbook',
					'Pick a barber by city, specialty, and available slot',
					'Web-first — no app store download to book',
				],
			},
		],
	},

	customersPage: {
		eyebrow: 'Customers',
		heading: ['FROM THE', 'CHAIRS'],
		headingAccent: 'Across cities',
		body: 'Early shops and clients on the network — Ado-Ekiti, Lagos, Ikole, Abuja — talking about previews, bookings, and quieter WhatsApp threads.',
	},

	resourcesPage: {
		eyebrow: 'Resources',
		heading: ['READ,', 'THEN'],
		headingAccent: 'Book',
		body: 'Guides, answers, and how we handle bookings and photos. Start here if you are evaluating the product for a shop or a chair.',
		hub: [
			{
				label: 'Features',
				href: '/features',
				blurb: 'What the platform carries — booking, previews, library, handoff.',
			},
			{
				label: 'Blog',
				href: '/blog',
				blurb: 'Short notes on fades, color briefs, and chair calendars.',
			},
			{
				label: 'Help',
				href: '/help',
				blurb: 'Straight answers on accounts, cities, and how booking works.',
			},
			{
				label: 'Security',
				href: '/security',
				blurb: 'How chair requests and style photos are handled.',
			},
			{
				label: 'Product',
				href: '/product',
				blurb: 'Demo, screenshots, and CAC registration for the legal entity.',
			},
			{
				label: 'Team',
				href: '/team',
				blurb: 'The people shipping KTrail Style under K-TRAIL HAIRCUT SERVICES.',
			},
		],
	},

	featuresPage: {
		eyebrow: 'Features',
		heading: ['WHAT THE', 'PLATFORM'],
		headingAccent: 'Carries',
		body: 'Multi-barber booking and AI style previews in one product — built for Nigerian shops, priced in naira, handed off on WhatsApp when you still need the chat.',
	},

	helpPage: {
		eyebrow: 'Help',
		heading: ['STRAIGHT', 'ANSWERS'],
		headingAccent: 'For shops',
		body: 'Accounts, cities, photos, and how to reach us. If you want a guided look at the dashboard, book a walkthrough.',
	},

	blogPage: {
		eyebrow: 'Blog',
		heading: ['NOTES FROM', 'THE'],
		headingAccent: 'Chair',
		body: 'Short reads for barbers and clients — how to brief a fade, why color needs a preview, and why a shared calendar beats the group chat.',
	},

	blogPosts: [
		{
			slug: 'brief-the-fade',
			title: 'Brief the fade so the chair gets it right',
			date: '12 July 2026',
			excerpt:
				'A low skin fade is not a mood. It is a perimeter, a blend, and a maintenance promise. Write it down before you sit.',
			paragraphs: [
				'Most mid-chair arguments start the same way: the client says “just a fade” and the barber hears last week’s Instagram. Length on top, how high the blend climbs, and whether the neck is a skin fade or a taper — those three calls decide the cut.',
				'On KTrail Style the client can attach a preview to the chair request. That pack is the brief. If you still take walk-ins, ask for the photo first. Point at the perimeter on their own face, not a stranger’s lookbook, and agree the week-two shape before the clippers come out.',
				'Write the maintenance in the notes: humid weather, gym, how often they will be back. A fade that needs a weekly touch-up is a different product from a two-week taper. The chair should know which one they sold.',
			],
		},
		{
			slug: 'color-needs-a-preview',
			title: 'Why clients hesitate on color — and why a preview helps',
			date: '28 July 2026',
			excerpt:
				'Caramel on coils is a commitment. Showing it on their face is cheaper than a mid-session freeze.',
			paragraphs: [
				'Color is where Nigerian clients stall. Not because they do not want the look — because they cannot see it on their texture, their hairline, their light. A magazine crop on straight hair does not answer that.',
				'A style preview on their own photo does not replace a strand test. It does replace the fifteen-minute “will this suit me?” loop at the basin. Face-frame highlights read differently on a heart-shaped face than a full-head lift. Show the perimeter first.',
				'Barbers who send the preview pack with the booking request get fewer cancelled color slots. The client already chose the warmth. The chair can talk chemistry and timing instead of selling the idea from scratch.',
			],
		},
		{
			slug: 'calendar-beats-whatsapp',
			title: 'A shared calendar beats the WhatsApp pile',
			date: '4 August 2026',
			excerpt:
				'“You free Saturday?” is not a booking system. It is how chairs go empty at 2pm and double at 4.',
			paragraphs: [
				'Independent barbers in Ekiti and Lagos already run a business. They just run it in chat. The cost is invisible until Saturday: two clients at four, one no-show at noon, and a thread you cannot search.',
				'KTrail Style does not ask you to abandon WhatsApp. It gives the shop a front desk the chat can point at. Hours, services, and a chair request with the preview attached. You confirm. The client stops asking if you are free.',
				'Shops with more than one barber feel this first. Three inboxes is not a roster. One queue across chairs is. That is the difference between a brochure site and a network.',
			],
		},
	],

	securityPage: {
		eyebrow: 'Security',
		heading: ['BOOKINGS', 'AND'],
		headingAccent: 'Photos',
		body: 'How K-TRAIL HAIRCUT SERVICES handles chair requests and style-preview images when you use KTrail Style.',
		intro:
			'The product is web-first. Session details stay in the browser. Style previews and booking activity you generate in a demo session stay on the device. We do not sell personal information or listing photos to advertisers.',
		columns: [
			{
				title: 'Chair requests',
				body: 'A booking intent carries the service, slot, barber, and any preview the client attached. Shop accounts see that queue in the dashboard. We use the email you give at sign-in so you can open that shop again on this device.',
			},
			{
				title: 'Style photos',
				body: 'Photos uploaded for an AI preview are used to generate the recommendation pack for that session. They are not a public gallery. We do not sell face images or use them to train a public model.',
			},
		],
		sections: [
			{
				title: 'What stays on the device',
				body: 'Session keys, local booking activity, and preview results for this browser. Clearing site data signs you out and removes that local activity.',
			},
			{
				title: 'What you send us',
				body: 'Account email and password when you create an account or log in. Walkthrough forms may also collect name, phone, city, shop name, and a short note. Write the people on /team if you need help from K-TRAIL HAIRCUT SERVICES.',
			},
			{
				title: 'Who can see a preview',
				body: 'The client who uploaded the photo, and the barber or shop that receives the chair request. Previews are not listed on a public explore feed.',
			},
			{
				title: 'Questions',
				body: 'Open /team or /help. The legal entity is K-TRAIL HAIRCUT SERVICES, CAC 9200929, Ikole-Ekiti. The privacy policy on /privacy is the longer account of the same rules.',
			},
		],
	},

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
