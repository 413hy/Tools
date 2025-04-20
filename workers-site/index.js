import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

async function handleEvent(event) {
  const url = new URL(event.request.url)
  
  try {
    // Handle API requests for custom tools
    if (url.pathname.startsWith('/api')) {
      if (url.pathname === '/api/tools') {
        if (event.request.method === 'GET') {
          // Get all custom tools
          const tools = await TOOLS_DATA.get('custom_tools', { type: 'json' }) || []
          return new Response(JSON.stringify(tools), {
            headers: { 'Content-Type': 'application/json' }
          })
        } else if (event.request.method === 'POST') {
          // Add a new custom tool
          const body = await event.request.json()
          const tools = await TOOLS_DATA.get('custom_tools', { type: 'json' }) || []
          tools.push(body)
          await TOOLS_DATA.put('custom_tools', JSON.stringify(tools))
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
          })
        }
      }
      return new Response('Not Found', { status: 404 })
    }

    // Options for serving assets
    const options = {
      cacheControl: {
        browserTTL: 60 * 60 * 24, // 1 day
        edgeTTL: 60 * 60 * 24 * 365, // 1 year
        bypassCache: false
      }
    }

    let response
    try {
      // First try to get the actual file
      response = await getAssetFromKV(event, options)
    } catch (e) {
      // If file not found, return index.html for client-side routing
      try {
        const page = await getAssetFromKV(event, {
          ...options,
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req)
        })
        
        response = new Response(page.body, {
          status: 200,
          headers: new Headers(page.headers)
        })
      } catch (e) {
        // If even index.html fails, return a helpful error
        return new Response(
          `<!DOCTYPE html>
          <html>
            <head>
              <title>Loading...</title>
              <meta charset="utf-8">
              <meta http-equiv="refresh" content="0;url=/">
            </head>
            <body>
              <p>Redirecting to homepage...</p>
              <script>window.location.href = "/";</script>
            </body>
          </html>`,
          {
            status: 200,
            headers: {
              'Content-Type': 'text/html;charset=UTF-8',
              'Cache-Control': 'no-cache'
            }
          }
        )
      }
    }

    // Add security and caching headers
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // Ensure HTML content type for routes
    if (!response.headers.get('Content-Type') || url.pathname.endsWith('/')) {
      response.headers.set('Content-Type', 'text/html; charset=UTF-8')
    }

    return response
  } catch (e) {
    // Return a user-friendly error page
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <meta charset="utf-8">
          <meta http-equiv="refresh" content="3;url=/">
        </head>
        <body>
          <h1>Something went wrong</h1>
          <p>Redirecting to homepage in 3 seconds...</p>
          <script>setTimeout(() => window.location.href = "/", 3000);</script>
        </body>
      </html>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-cache'
        }
      }
    )
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
}) 