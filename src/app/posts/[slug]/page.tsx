import { fetchPublishedPosts, getPost, getWordCount } from "@/lib/notion";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { ResolvingMetadata } from "next";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/utils";
import { components } from "@/components/mdx-component";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { IconArrowLeft, IconClock, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const post = allPosts.find((p) => p?.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteUrl}/posts/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      authors: post.author ? [post.author] : [],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || `${siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.coverImage || `${siteUrl}/opengraph-image.png`,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const post = allPosts.find((p) => p?.slug === slug);
  const wordCount = post?.content ? getWordCount(post.content) : 0;

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage || `${siteUrl}/opengraph-image.png`,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "Guest Author",
    },
    publisher: {
      "@type": "Organization",
      name: "Your Site Name",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/posts/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress className="fixed top-0 z-[5002] h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="group text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <IconArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                🏠 Zpět na hlavní stránku
              </Button>
            </Link>
          </div>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {post.coverImage && (
              <div className="relative aspect-video w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12">
              <header className="mb-10">
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8 text-sm">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <span>📅</span>
                    <time>{format(new Date(post.date), "d. MMMM yyyy")}</time>
                  </div>
                  {post.author && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <span>👤</span>
                      <span>{post.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <span>⏱️</span>
                    <span>{calculateReadingTime(wordCount)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <span>📝</span>
                    <span>{wordCount} slov</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                  {post.title}
                </h1>

                {/* Description */}
                {post.description && (
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    💡 {post.description}
                  </p>
                )}

                {/* Tags and Category */}
                <div className="flex flex-wrap gap-3">
                  {post.category && (
                    <Badge 
                      variant="default" 
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium"
                    >
                      🏷️ {post.category}
                    </Badge>
                  )}
                  {post.tags &&
                    post.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-full font-medium transition-colors duration-200"
                      >
                        🔖 {tag}
                      </Badge>
                    ))}
                </div>
              </header>

              {/* Content */}
              <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-purple-600 dark:prose-code:text-purple-400">
                <ReactMarkdown
                  components={components}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </article>

          {/* Call to Action Section */}
          <section className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Líbil se vám článek? 👍
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Podívejte se na další články nebo se podívejte na moje portfolio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <IconArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  📚 Další články
                </Button>
              </Link>
              <a
                href="https://portfolio-sovadina.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                >
                  🌟 Moje Portfolio
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
