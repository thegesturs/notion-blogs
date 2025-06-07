import { fetchPublishedPosts, getPost } from "@/lib/notion";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site.com";

  const posts = await fetchPublishedPosts();
  const allPosts = await Promise.all(posts.results.map((p) => getPost(p.id)));

  const postEntries = allPosts
    .filter((post) => post !== null)
    .map((post) => ({
      url: `${siteUrl}/posts/${post!.slug}`,
      lastModified: new Date(post!.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...postEntries,
  ];
}
