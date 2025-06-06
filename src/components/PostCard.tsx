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
          <p className="text-sm text-gray-500 mb-2">
            {format(new Date(post.date), "MMMM d, yyyy")}
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-600 line-clamp-2">{post.description}</p>
        </div>
      </Link>
    </div>
  );
}
