interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 -mt-16 pt-16">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            {title}
          </h1>
          <p className="text-sm text-zinc-500">{lastUpdated}</p>
        </header>

        <div className="[&>p]:text-zinc-600 [&>p]:dark:text-zinc-400 [&>p]:leading-relaxed [&>p]:mb-4
          [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-zinc-900 [&>h2]:dark:text-zinc-50 [&>h2]:mt-10 [&>h2]:mb-3
          [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-1.5
          [&>ul>li]:text-zinc-600 [&>ul>li]:dark:text-zinc-400 [&>ul>li]:leading-relaxed
          [&_a]:text-violet-600 [&_a]:dark:text-violet-400 [&_a]:underline [&_a]:underline-offset-2
          [&_strong]:text-zinc-800 [&_strong]:dark:text-zinc-200
        ">
          {children}
        </div>
      </div>
    </main>
  );
}
