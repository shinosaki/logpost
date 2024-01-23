import { Hono } from 'hono'
import { logpost } from './src/index.js'

const app = new Hono()

app.use('*',
  // console.log() (default)
  logpost(),

  // New Relic
  logpost({
    type: 'newrelic',
    newrelic: {
      region: 'us', // 'us'|'eu'|'gov'
      // Or endpoint: 'https://log-api.newrelic.com/log/v1',
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

  // Datadog
  logpost({
    type: 'datadog',
    datadog: {
      region: 'ap1', // 'us1'|'us3'|'us5'|'eu1'|'ap1'|'gov'
      // Or endpoint: 'https://http-intake.logs.ap1.datadoghq.com/api/v2/logs',
      key: '<API Key>',
      body: async (req) => {
        return {
          ddsource: 'logpost',
          ddtags: 'env:production',
          timestamp: Date.now(),
          hostname: req.url.hostname,
          path: req.url.pathname,
          cf: req.cf,
          headers: Object.fromEntries(req.headers)
        }
      }
    }
  })
)

app.get('/', (c) => c.text('Hello Cloudflare Workers!\n'))

export default app