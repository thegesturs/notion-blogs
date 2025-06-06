import { fetchPublishedPosts, getPost } from "@/lib/notion";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = params;
  const posts = await fetchPublishedPosts();
  const post = await Promise.all(posts.results.map((p) => getPost(p.id))).then(
    (posts) => posts.find((p) => p?.slug === slug)
  );

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const posts = await fetchPublishedPosts();
  const post = await Promise.all(posts.results.map((p) => getPost(p.id))).then(
    (posts) => posts.find((p) => p?.slug === slug)
  );

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      {post.coverImage && (
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-4 text-gray-500 mb-4">
          <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          {post.author && <span>By {post.author}</span>}
          {post.wordCount && (
            <span>{post.wordCount.toLocaleString()} words</span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex gap-4 mb-4">
          {post.category && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {post.category}
            </span>
          )}
          {post.tags &&
            post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
        </div>

        <p className="text-xl text-gray-600">{post.description}</p>
      </header>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {post.url && (
        <div className="mt-8 pt-8 border-t">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Read original article →
          </a>
        </div>
      )}
    </article>
  );
}
