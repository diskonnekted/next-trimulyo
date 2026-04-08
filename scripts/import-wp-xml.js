/**
 * Import WordPress XML export (WXR) into static JSON for Next.js
 *
 * Images remain hosted on WordPress - only articles are imported as static data.
 *
 * Usage:
 *   node scripts/import-wp-xml.js
 *
 * Output:
 *   data/wp-posts.json  - Array of articles with image URLs pointing to WordPress
 */

const fs = require("fs");
const path = require("path");

const XML_FILE = path.join(__dirname, "..", "public", "kalurahantrimulyo.WordPress.2026-04-07.xml");
const OUTPUT = path.join(__dirname, "..", "data", "wp-posts.json");

function parseXML(xml) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const item = match[1];

        const postType = extractCData(item, "wp:post_type");
        if (postType !== "post") continue;

        const status = extractCData(item, "wp:status");
        if (status !== "publish") continue;

        const title = extractCData(item, "title");
        const slug = extractCData(item, "wp:post_name");
        const date = extractCData(item, "wp:post_date");
        const content = extractCData(item, "content:encoded");
        const excerpt = extractCData(item, "excerpt:encoded");
        const link = extractCData(item, "link");

        // Extract categories
        const categories = [];
        const catRegex = /<category[^>]*domain="category"[^>]*nicename="([^"]*)"[^>]*><!\[CDATA\[([^\]]*)\]\]><\/category>/g;
        let catMatch;
        while ((catMatch = catRegex.exec(item)) !== null) {
            categories.push({ id: categories.length + 1, name: catMatch[2], slug: catMatch[1] });
        }

        // Extract featured image
        let featuredImage = null;

        // Method 1: wp:postmeta _thumbnail_id → find attachment
        const thumbId = extractPostMeta(item, "_thumbnail_id");
        if (thumbId) {
            const attachmentRegex = new RegExp(
                `<wp:post_id><!\\[CDATA\\[${thumbId}\\]\\]><\\/wp:post_id>[\\s\\S]*?` +
                `<wp:attachment_url><!\\[CDATA\\[([^\\]]*)\\]\\]><\\/wp:attachment_url>`
            );
            const attachmentMatch = attachmentRegex.exec(xml);
            if (attachmentMatch) {
                featuredImage = attachmentMatch[1];
            }
        }

        // Method 2: Extract first image from content as fallback
        if (!featuredImage && content) {
            const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
            if (imgMatch) {
                featuredImage = imgMatch[1];
            }
        }

        // Ensure HTTPS
        if (featuredImage && featuredImage.startsWith("http://")) {
            featuredImage = featuredImage.replace("http://", "https://");
        }

        // Clean content: keep images with absolute URLs
        let cleanContent = content || "";
        // Make sure all image URLs in content are absolute
        cleanContent = cleanContent.replace(
            /src="\/wp-content\//g,
            'src="https://trimulyosid.slemankab.go.id/wp-content/'
        );

        if (!title || !slug) continue;

        items.push({
            id: items.length + 1,
            title: title,
            slug: slug,
            date: date,
            modified: extractCData(item, "wp:post_modified") || date,
            content: cleanContent,
            excerpt: excerpt || cleanContent.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
            featuredImage: featuredImage,
            categories: categories.length > 0 ? categories : [{ id: 0, name: "Berita", slug: "berita" }],
            author: {
                name: extractCData(item, "dc:creator") || "Admin Kalurahan",
                avatar: null,
            },
            link: link,
            readingTime: Math.max(1, Math.ceil((cleanContent.replace(/<[^>]*>/g, "").split(/\s+/).length) / 200)),
        });
    }

    return items;
}

function extractCData(str, tag) {
    const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`);
    const match = regex.exec(str);
    return match ? match[1].trim() : null;
}

function extractPostMeta(str, key) {
    const regex = new RegExp(`<wp:postmeta>[\\s\\S]*?<wp:meta_key><!\\[CDATA\\[${key}\\]\\]><\\/wp:meta_key>[\\s\\S]*?<wp:meta_value><!\\[CDATA\\[([^\\]]*)\\]\\]><\\/wp:meta_value>[\\s\\S]*?<\\/wp:postmeta>`);
    const match = regex.exec(str);
    return match ? match[1] : null;
}

// Main
console.log(`Reading ${XML_FILE}...`);
const xml = fs.readFileSync(XML_FILE, "utf8");
const posts = parseXML(xml);

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(posts, null, 2));

console.log(`\nImported ${posts.length} articles to ${OUTPUT}`);
console.log("\nFirst 5 articles:");
posts.slice(0, 5).forEach((p) => {
    console.log(`  - ${p.title} (${p.date}) | Image: ${p.featuredImage ? "✅" : "❌"}`);
});

const withImages = posts.filter((p) => p.featuredImage).length;
console.log(`\nArticles with featured image: ${withImages}/${posts.length}`);
