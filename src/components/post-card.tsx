import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post, getWordCount } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const wordCount = post.content ? getWordCount(post.content) : 0;
  const readingTime = calculateReadingTime(wordCount);

  return (
    <Link href={`/posts/${post.slug}`} passHref>
      <Card className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {post.category && (
              <Badge variant="secondary" className="mb-2">
                {post.category}
              </Badge>
            )}
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 mt-2">
              {post.description}
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readingTime}</span>
              </div>
            </div>
            {post.author && (
              <p className="text-sm text-muted-foreground mt-2">
                By {post.author}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
