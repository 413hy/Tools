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
    }

    // For all other routes, try to serve static assets
    try {
      return await getAssetFromKV(event)
    } catch (e) {
      // If the asset is not found, serve the index.html for SPA routing
      if (e.status === 404) {
        const response = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req)
        })
        
        // Add security headers
        const headers = new Headers(response.headers)
        headers.set('X-XSS-Protection', '1; mode=block')
        headers.set('X-Content-Type-Options', 'nosniff')
        headers.set('X-Frame-Options', 'DENY')
        headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
        headers.set('Feature-Policy', "camera 'none'; microphone 'none'")

        return new Response(response.body, {
          status: 200,
          headers
        })
      }
      throw e
    }
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
}) 