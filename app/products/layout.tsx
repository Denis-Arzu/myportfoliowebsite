import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Dentrix Apps - Custom Software & Trading Engines',
  description: 'Explore Dentrix Apps software products: Maganji algorithmic trading engine, Tuandike data platform, and Creator OS automation system. Building digital leverage for quantitative firms and SaaS founders.',
  openGraph: {
    title: 'Products | Dentrix Apps',
    description: 'Explore our software products: algorithmic trading engines, data pipelines, and AI automation systems.',
    url: 'https://dentrixapps.com/products',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}