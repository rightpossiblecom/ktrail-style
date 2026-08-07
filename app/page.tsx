import { Hero } from '@/components/home/hero';
import { CapabilityStats } from '@/components/home/capability-stats';
import { LaunchStrip } from '@/components/home/launch-strip';
import { ProblemGrid } from '@/components/home/problem-grid';
import { ProductShowcase } from '@/components/home/product-showcase';
import { ProcessStrip } from '@/components/home/process-strip';
import { PipelineStrip } from '@/components/home/pipeline-strip';
import { Audiences } from '@/components/home/audiences';
import { FeaturesGrid } from '@/components/home/features-grid';
import { QuoteSlab } from '@/components/home/quote-slab';
import { PricingPreview } from '@/components/home/pricing-preview';
import { GetInEarly } from '@/components/home/get-in-early';
import { FaqAccordion } from '@/components/home/faq-accordion';
import { EndRail } from '@/components/home/end-rail';

export default function HomePage() {
	return (
		<>
			<Hero />
			<CapabilityStats />
			<LaunchStrip />
			<ProblemGrid />
			<ProductShowcase />
			<ProcessStrip />
			<PipelineStrip />
			<Audiences />
			<FeaturesGrid />
			<QuoteSlab />
			<PricingPreview />
			<GetInEarly />
			<FaqAccordion />
			<EndRail />
		</>
	);
}
