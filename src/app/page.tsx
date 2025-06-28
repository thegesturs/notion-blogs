import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";
import {
  BentoGrid,
  BentoGridItem,
} from "@/components/ui/bento-grid";
import {
  HeroHighlight,
  Highlight,
} from "@/components/ui/hero-highlight";
import { Marquee } from "@/components/magicui/marquee";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconBrain,
  IconCode,
  IconRocket,
} from "@tabler/icons-react";

async function getPosts(): Promise<Post[]> {
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((post) => getPost(post.id))
  );
  return allPosts.filter((post): post is Post => post !== null);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section - inspirováno portfoliem */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">👋</span>
              <TextGenerateEffect
                words="Vítejte na mém blogu"
                className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6"
              />
            </div>
            <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-8">
              <Highlight className="text-black dark:text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
                Objevte zajímavé články a poznatky 💡
              </Highlight>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <IconBrain className="h-4 w-4" />
                AI & ML
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <IconCode className="h-4 w-4" />
                HealthTech
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <IconRocket className="h-4 w-4" />
                Inovace
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-white dark:bg-gray-950 border-y border-gray-200 dark:border-gray-800">
        <Marquee pauseOnHover className="[--duration:30s]">
          {posts.map((post) => (
            <div key={post.id} className="mx-6">
              <a
                href={`/posts/${post.slug}`}
                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                📖 {post.title}
              </a>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Articles Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
              Moje články 📚
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Podívejte se na mou práci a poznatky z oblasti technologií
            </p>
          </div>

          <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
            {posts.map((item, i) => (
              <a href={`/posts/${item.slug}`} key={item.id}>
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
                      <div className="absolute bottom-4 right-4 text-3xl opacity-20">
                        {i % 4 === 0 ? "🚀" : i % 4 === 1 ? "💡" : i % 4 === 2 ? "🔬" : "📖"}
                      </div>
                    </div>
                  }
                  className={`${i === 3 || i === 6 ? "md:col-span-2" : ""} hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700`}
                  icon={<IconClipboardCopy className="h-4 w-4 text-blue-500" />}
                />
              </a>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Zůstaňte v kontaktu 📬
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Sledujte mé nejnovější články a poznatky z oblasti AI, zdravotnictví a technologií
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://portfolio-sovadina.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              🌟 Moje Portfolio
            </a>
            <a
              href="mailto:kontakt@example.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              ✉️ Kontakt
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
