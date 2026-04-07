/**
 * Cloudflare Worker - WordPress Posts Proxy (Debug Version)
 *
 * PASTE SELURUH KODE DI BAWAH KE EDITOR CLOUDFLARE WORKER ANDA:
 *   https://dash.cloudflare.com → Workers & Pages → wp-proxy-trimulyo → Edit code
 *
 * HAPUS semua kode yang ada, lalu PASTE kode di bawah ini.
 * Klik "Save and Deploy".
 */

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Accept",
                },
            });
        }

        const url = new URL(request.url);
        const targetUrl = `https://trimulyosid.slemankab.go.id/wp-json/wp/v2/posts${url.search}`;

        try {
            const response = await fetch(targetUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                },
            });

            if (!response.ok) {
                return new Response(
                    JSON.stringify({
                        error: `WordPress returned HTTP ${response.status}`,
                        status: response.status,
                        statusText: response.statusText,
                    }),
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
            return new Response(
                JSON.stringify({
                    error: `Fetch failed: ${err.message}`,
                    name: err.name,
                    target: targetUrl,
                }),
                {
                    status: 502,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    },
};
