# Šablona blogu Next.js poháněná pojmy

Moderní, rychlá a přizpůsobitelná šablona blogu poháněná Notion jako CMS a Next.js. Tato šablona umožňuje používat Notion jako systém pro správu obsahu blogu a zároveň obsluhovat blog pomocí Next.js.

## Vlastnosti

- 🚀 Vytvořeno s Next.js 14+ a App Routerem
- 📝 Používejte Notion jako CMS
- 🎨 Krásný a responzivní design
- ⚡ Rychlé načítání stránek díky statickému generování
- 🔍 SEO optimalizované
- 📱 Přátelský pro mobilní zařízení
- 🌙 Podpora tmavého režimu
- ✨ Zvýraznění syntaxe pro bloky kódu
- 📊 Podpora tabulek
- 🖼️ Optimalizace obrázků
- 📅 Doba čtení a počet slov

## Předpoklady

- Node.js 18.17.1 nebo novější
- Účet Notion
- Základní znalosti Next.js a React

## Začínáme

### 1. Klonování šablony

1. Navštivte tuto šablonu Notion: [Blog Template](https://exclusive-gatsby-850.notion.site/20a186dad999800dbb94f239f907215d?v=20a186dad99980228480000c8707478c&source=github)
2. Kliknutím na tlačítko "Duplikovat" ji naklonujte do svého pracovního prostoru.
3. Klonujte tento repozitář do svého lokálního počítače.

### 2. Nastavte integraci Notion

1. Přejděte do [Notion Developers](https://www.notion.so/my-integrations).
2. Klikněte na "Nová integrace".
3. Vyplňte údaje o integraci:
   - Název: Zvolte název integrace.
   - Vyberte pracovní prostor, do kterého jste naklonovali šablonu blogu.
   - Vyberte možnost "Interní integrace".
4. V části "Schopnosti" vyberte pouze možnost "Číst obsah" (zrušte zaškrtnutí políček Vložit obsah a Aktualizovat obsah).
5. Zkopírujte "Interní integrační token" (bude to váš `NOTION_TOKEN`).

### 3. Připojte integraci k vaší databázi

1. Přejděte na svou klonovanou stránku blogu Notion.
2. Klikněte na "---" (tři tečky) v pravém horním rohu.
3. Přejděte na "Připojení" -> najděte svou integraci a klikněte na "Připojit".

### 4. Získejte ID vaší databáze

1. Otevřete databázi Notion v prohlížeči.
2. Zkopírujte ID z adresy URL. Například:

   ```
   https://www.notion.so/20bf471a8ac78080a3d4dad6ed77ca17?v=...
                        └───────── ID databáze ─────────┘
   ```

### 5. Nastavení prostředí

1. V kořenovém adresáři projektu vytvořte soubor `.env.local`:

   ```env
   NOTION_TOKEN=vas_integracni_token_zde
   NOTION_DATABASE_ID=vase_databaze_id_zde
   NEXT_PUBLIC_SITE_URL=vase_site_url_here
   ```

### 6. Nainstalujte a spusťte

```bash
pnpm install
pnpm run dev
```

Navštivte `http://localhost:3000` a prohlédněte si svůj blog.

## Přizpůsobení šablony

### Přidání nových vlastností

1. V databázi Notion můžete přidávat nové vlastnosti kliknutím na tlačítko "+ Přidat vlastnost".
2. Chcete-li ve svém blogu použít nové vlastnosti, upravte soubor `src/lib/notion.ts`:

   ```typescript
   export interface Post {
     // ... stávající vlastnosti ...
     yourNewProperty?: string; // Přidejte novou vlastnost
   }

   export async function getPost(pageId: string): Promise<Post | null> {
     try {
       // ... stávající kód ...
       const post: Post = {
         // ... stávající vlastnosti ...
         yourNewProperty: properties.YourNewProperty?.your_property_type?.value,
       };
       // ... zbytek kódu ...
     }
   }
   ```

### Přizpůsobení rozvržení

- Upravte soubor `src/app/posts/[slug]/page.tsx`, abyste změnili rozvržení příspěvku na blogu.
- Aktualizujte soubor `src/components/mdx-component.tsx`, abyste přizpůsobili vykreslování markdownů.
- Stylování komponent pomocí tříd CSS Tailwindu.

### Správa blogu

1. Kdykoli získáte přístup k nastavení integrace:
   - Přejděte do Nastavení Notion -> Připojení.
   - Najděte svou integraci.
   - Klikněte na "---" -> "Spravovat na portálu pro vývojáře".

2. Vytvořte nové příspěvky na blogu:
   - Přidejte novou stránku do databáze Notion.
   - Vyplňte požadované vlastnosti.
   - Po dokončení nastavte stav na "Zveřejněno".

## Vlastnosti databáze

Šablona používá tyto výchozí vlastnosti:

- Název příspěvku (povinné)
- `Status` - Stav publikace (Zveřejněno/návrh)
- `Published Date` - Datum zveřejnění příspěvku
- `Author` - Autor příspěvku
- `Tags` - Značky příspěvku (možnost výběru z více možností)
- `Category` - Kategorie příspěvku (vyberte)
- `Featured Image` - URL adresa titulního obrázku

## Přispívání

Neváhejte zasílat problémy a požadavky na vylepšení!

## Licence

Licence MIT – neváhejte použít tuto šablonu pro svůj vlastní blog!