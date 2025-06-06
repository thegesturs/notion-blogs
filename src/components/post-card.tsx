import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Post, getWordCount } from "@/lib/notion";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const wordCount = post.content ? getWordCount(post.content) : 0;
  const readingTime = calculateReadingTime(wordCount);

  return (
    <Card className="group relative pt-0 overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href={`/posts/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-muted/80" />
        )}
        {post.category && (
          <div className="absolute top-4 left-4 z-20">
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-background/80 shadow-sm"
            >
              {post.category}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="space-y-2">
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
        <div className="group-hover:pr-8 transition-all duration-300">
          <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <ArrowUpRight className="absolute top-[7.5rem] right-6 h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
        </div>
        <p className="text-muted-foreground line-clamp-2">{post.description}</p>
      </CardHeader>
      <CardContent>
        {post.author && (
          <p className="text-sm text-muted-foreground">By {post.author}</p>
        )}
      </CardContent>
      {post.tags && post.tags.length > 0 && (
        <CardFooter>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-background/80">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
