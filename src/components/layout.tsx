import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  href="/"
                  className="flex items-center text-xl font-bold text-foreground"
                >
                  My Blog
                </Link>
              </div>
              <div className="flex items-center">
                <ModeToggle />
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        <footer className="bg-muted border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} My Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
