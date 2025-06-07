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

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));
  const post = allPosts.find((p) => p?.slug === slug);
  const wordCount = post?.content ? getWordCount(post.content) : 0;

  console.log(post?.content);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto prose dark:prose-invert">
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
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          {post.author && <span>By {post.author}</span>}
          <span>{calculateReadingTime(wordCount)}</span>
          <span>{wordCount} words</span>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {post.title}
        </h1>

        <div className="flex gap-4 mb-4">
          {post.category && <Badge variant="secondary">{post.category}</Badge>}
          {post.tags &&
            post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
        </div>
      </header>

      <div className="max-w-none">
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
