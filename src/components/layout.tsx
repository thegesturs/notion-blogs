import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconBrain, IconUser, IconRocket, IconMail } from "@tabler/icons-react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navItems = [
    {
      name: "🏠 Domů",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "🌟 Portfolio",
      link: "https://portfolio-sovadina.vercel.app/",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "🚀 AI & ML",
      link: "/#ai-ml",
      icon: <IconBrain className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "💡 Inovace",
      link: "/#innovations",
      icon: <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="relative flex min-h-screen flex-col">
        <FloatingNav navItems={navItems} />
        <div className="fixed top-4 right-4 z-[5001]">
          <ModeToggle />
        </div>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo a popis */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  📚 Blog Petra Sovadiny
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Objevte svět AI, zdravotnictví a technologických inovací. 
                  Sdílím poznatky z oblasti umělé inteligence, digitálního zdravotnictví a moderních technologií.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://portfolio-sovadina.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    🌐 Portfolio
                  </a>
                  <a 
                    href="https://linkedin.com/in/petr-sovadina" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    💼 LinkedIn
                  </a>
                  <a 
                    href="https://github.com/petrsovadina" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    💻 GitHub
                  </a>
                </div>
              </div>

              {/* Kategorie */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🏷️ Kategorie
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#ai-ml" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      🤖 AI & Machine Learning
                    </Link>
                  </li>
                  <li>
                    <Link href="/#healthtech" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      🏥 HealthTech
                    </Link>
                  </li>
                  <li>
                    <Link href="/#innovations" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      🚀 Inovace
                    </Link>
                  </li>
                  <li>
                    <Link href="/#research" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      🔬 Výzkum
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Kontakt */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📬 Kontakt
                </h3>
                <div className="space-y-2">
                  <a 
                    href="mailto:kontakt@example.com" 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 block"
                  >
                    ✉️ Email
                  </a>
                  <p className="text-gray-600 dark:text-gray-400">
                    🌍 Praha, Česká republika
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    🔬 AI Researcher & HealthTech Enthusiast
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © {new Date().getFullYear()} Petr Sovadina. Všechna práva vyhrazena. 🚀
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    🏗️ Postaveno s Next.js & Tailwind CSS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
