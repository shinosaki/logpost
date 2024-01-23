# LogPost

Logging middleware in Hono

## Support Providers
- `console.log()`
- New Relic ([docs](https://docs.newrelic.com/docs/logs/log-api/introduction-log-api/))
- Datadog ([docs](https://docs.datadoghq.com/api/latest/logs/))

## Usage

- Console (`console.log()`)
  ```js
  import { logpost } from './logpost.js'
  app.use('*', logpost())
  ```

- New Relic
  ```js
  import { logpost } from './logpost.js'
  app.use('*',
    logpost({
      type: 'newrelic',
      newrelic: {
        endpoint: 'https://log-api.newrelic.com/log/v1',
        key: '<API Key (INGEST - LICENSE)>',
        // "req" is "c.raw.req"
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
  ```

## Author
[Shinosaki](https://shinosaki.com)

## LICENSE
[MIT](./LICENSE)