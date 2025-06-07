# Notion-Powered Next.js Blog Template

A modern, fast, and customizable blog template powered by Notion as a CMS and Next.js. This template allows you to use Notion as your content management system while serving your blog with Next.js.

## Features

- 🚀 Built with Next.js 14+ and App Router
- 📝 Use Notion as a CMS
- 🎨 Beautiful and responsive design
- ⚡ Fast page loads with static generation
- 🔍 SEO optimized
- 📱 Mobile-friendly
- 🌙 Dark mode support
- ✨ Syntax highlighting for code blocks
- 📊 Table support
- 🖼️ Image optimization
- 📅 Reading time and word count

## Prerequisites

- Node.js 18.17.1 or later
- A Notion account
- Basic knowledge of Next.js and React

## Getting Started

### 1. Clone the Template

1. Visit this Notion template: [Blog Template](https://exclusive-gatsby-850.notion.site/20a186dad999800dbb94f239f907215d?v=20a186dad99980228480000c8707478c&source=github)
2. Click "Duplicate" to clone it to your workspace
3. Clone this repository to your local machine

### 2. Set Up Notion Integration

1. Go to [Notion Developers](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Fill in the integration details:
   - Name: Choose a name for your integration
   - Select the workspace where you cloned the blog template
   - Choose "Internal integration"
4. Under "Capabilities", select only "Read content" (uncheck Insert content and Update content)
5. Copy the "Internal Integration Token" (this will be your `NOTION_TOKEN`)

### 3. Connect Integration to Your Database

1. Go to your cloned Notion blog page
2. Click the "•••" (three dots) in the top right corner
3. Go to "Connections" -> find your integration and click "Connect"

### 4. Get Your Database ID

1. Open your Notion database in the browser
2. Copy the ID from the URL. For example:
   ```
   https://www.notion.so/20bf471a8ac78080a3d4dad6ed77ca17?v=...
                        └───────── Database ID ─────────┘
   ```

### 5. Environment Setup

1. Create a `.env.local` file in your project root:
   ```env
   NOTION_TOKEN=your_integration_token_here
   NOTION_DATABASE_ID=your_database_id_here
   NEXT_PUBLIC_SITE_URL=your_site_url_here
   ```

### 6. Install and Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your blog.

## Customizing the Template

### Adding New Properties

1. In your Notion database, you can add new properties by clicking "+ Add a property"
2. To use new properties in your blog, modify `src/lib/notion.ts`:

```typescript
export interface Post {
  // ... existing properties ...
  yourNewProperty?: string; // Add your new property
}

export async function getPost(pageId: string): Promise<Post | null> {
  try {
    // ... existing code ...
    const post: Post = {
      // ... existing properties ...
      yourNewProperty: properties.YourNewProperty?.your_property_type?.value,
    };
    // ... rest of the code ...
  }
}
```

### Customizing the Layout

- Modify `src/app/posts/[slug]/page.tsx` to change the blog post layout
- Update `src/components/mdx-component.tsx` to customize markdown rendering
- Style components using Tailwind CSS classes

### Managing Your Blog

1. Access your integration settings anytime:
   - Go to Notion Settings -> Connections
   - Find your integration
   - Click "•••" -> "Manage in developer portal"

2. Create new blog posts:
   - Add a new page to your Notion database
   - Fill in the required properties
   - Set status to "Published" when ready

## Database Properties

The template uses these default properties:

- `Title` - The post title (required)
- `Status` - Publication status (Published/Draft)
- `Published Date` - Post publication date
- `Author` - Post author
- `Tags` - Post tags (multi-select)
- `Category` - Post category (select)
- `Featured Image` - Cover image URL

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this template for your own blog!
