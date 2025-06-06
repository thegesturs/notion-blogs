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
  const posts = await fetchPublishedPosts();
  const post = await Promise.all(posts.results.map((p) => getPost(p.id))).then(
    (posts) => posts.find((p) => p?.slug === params.slug)
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
  const posts = await fetchPublishedPosts();
  const post = await Promise.all(posts.results.map((p) => getPost(p.id))).then(
    (posts) => posts.find((p) => p?.slug === params.slug)
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
        <time className="text-gray-500">
          {format(new Date(post.date), "MMMM d, yyyy")}
        </time>
        <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
      </header>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
