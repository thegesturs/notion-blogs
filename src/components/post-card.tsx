import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative aspect-video w-full overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            <p className="text-sm text-muted-foreground">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </p>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {post.title}
          </h2>
          <p className="text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {post.author && (
              <p className="text-sm text-muted-foreground">By {post.author}</p>
            )}
            {post.wordCount && (
              <p className="text-sm text-muted-foreground">
                {post.wordCount.toLocaleString()} words
              </p>
            )}
          </div>
        </CardContent>
        {post.tags && post.tags.length > 0 && (
          <CardFooter>
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Link>
    </Card>
  );
}
