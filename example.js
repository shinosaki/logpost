import { Hono } from 'hono'
import { logpost } from './logpost.js'

const app = new Hono()

app.use('*',
  logpost({
    debug: true,
    type: 'newrelic',
    newrelic: {
      endpoint: 'https://log-api.newrelic.com/log/v1',
      key: '<API Key (INGEST - LICENSE)>',
      body: async (req) => {
        return {
          timestamp: Date.now(),
          cf: req.cf,
          hostname: req.url,
          headers: Object.fromEntries(req.headers),
        }
      }
    }
  })
)

app.get('/', (c) => c.text('Hello Cloudflare Workers!\n'))

export default app