import { Hero } from '@/components/sections/hero';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProductShowcase />
      </main>
      <SiteFooter />
    </>
  );
}
