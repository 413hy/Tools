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

    // Serve static assets
    return await getAssetFromKV(event)
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
}) 