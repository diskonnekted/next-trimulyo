/**
 * Cloudflare Worker - WordPress Posts Proxy
 *
 * Paste this entire file into your Cloudflare Worker editor.
 *
 * Deployment:
 *   1. Go to https://dash.cloudflare.com → Workers & Pages → Create Worker
 *   2. Replace all code with this script
 *   3. Click "Deploy"
 *   4. Copy the worker URL (e.g. https://wp-proxy-trimulyo.yourname.workers.dev)
 *   5. Update WP_PROXY_URL in hooks/useExternalNews.ts with your worker URL
 */

export default {
    async fetch(request, env, ctx) {
        // Handle CORS preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Accept",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }

        try {
            const url = new URL(request.url);
            // Forward all query parameters to WordPress
            const targetUrl = `https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts${url.search}`;

            const response = await fetch(targetUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Trimulyo-NextJS/1.0",
                },
                cf: {
                    cacheTtl: 3600,
                    cacheEverything: true,
                },
            });

            if (!response.ok) {
                return new Response(
                    JSON.stringify({ error: "Failed to fetch WordPress data" }),
                    {
                        status: response.status,
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                        },
                    }
                );
            }

            const data = await response.json();

            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            });
        }
    },
};
