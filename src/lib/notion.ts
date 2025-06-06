import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const n2m = new NotionToMarkdown({ notionClient: notion });

export interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  date: string;
  content: string;
}

export async function fetchPublishedPosts() {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  return posts;
}

export async function getPost(pageId: string): Promise<Post | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);

    // @ts-ignore - We know these properties exist in our Notion database
    const title = page.properties.Title.title[0].plain_text;
    // @ts-ignore
    const date = page.properties.Date.date.start;
    // @ts-ignore
    const description = page.properties.Description.rich_text[0].plain_text;

    const post: Post = {
      id: page.id,
      title,
      slug: title.toLowerCase().replace(/ /g, "-"),
      coverImage:
        page.cover?.type === "external"
          ? page.cover.external.url
          : page.cover?.type === "file"
          ? page.cover.file.url
          : undefined,
      description,
      date,
      content: mdString,
    };

    return post;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}
