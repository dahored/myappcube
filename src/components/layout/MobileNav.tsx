'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface MobileNavProps {
  gamesLabel: string;
  socialsLabel: string;
  contactLabel: string;
}

export default function MobileNav({ gamesLabel, socialsLabel, contactLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop nav — hidden on mobile */}
      <nav className="hidden sm:flex items-center gap-4">
        <Link href="/games" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          {gamesLabel}
        </Link>
        <Link href="/redes" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          {socialsLabel}
        </Link>
        <Link href="/contact" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          {contactLabel}
        </Link>
        <ThemeToggle />
        <LocaleSwitcher />
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden absolute top-16 left-0 right-0 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm z-40">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              href="/games"
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors py-2 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {gamesLabel}
            </Link>
            <Link
              href="/redes"
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors py-2 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {socialsLabel}
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors py-2 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {contactLabel}
            </Link>
            <div className="flex items-center gap-2 px-3 py-2">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
