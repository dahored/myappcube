import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — myappcube',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-zinc-50 mb-4">Terms of Service</h1>
      <p className="text-zinc-400 text-sm">Coming soon.</p>
    </div>
  );
}
