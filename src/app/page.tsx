import { fetchPublishedPosts, getPost, Post } from "@/lib/notion";
import { HoverEffect } from "@/components/ui/card-hover-effect";

async function getPosts(): Promise<Post[]> {
  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(
    posts.results.map((post) => getPost(post.id))
  );
  return allPosts.filter((post): post is Post => post !== null);
}

export default async function Home() {
  const posts = await getPosts();

  const formattedPosts = posts.map((post) => ({
    title: post.title,
    description: post.description,
    link: `/posts/${post.slug}`,
  }));

  return (
    <div>
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover interesting articles and insights
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <HoverEffect items={formattedPosts} />
      </div>
    </div>
  );
}
