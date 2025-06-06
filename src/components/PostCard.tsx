import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post } from "@/lib/notion";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100" />
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            {post.category && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {post.category}
              </span>
            )}
            <p className="text-sm text-gray-500">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </p>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-2 mb-4">{post.description}</p>
          <div className="flex items-center justify-between">
            {post.author && (
              <p className="text-sm text-gray-500">By {post.author}</p>
            )}
            {post.wordCount && (
              <p className="text-sm text-gray-500">
                {post.wordCount.toLocaleString()} words
              </p>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
