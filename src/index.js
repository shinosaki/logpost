import { consoleLog } from './console.js'
import { newrelic } from './newrelic.js'
import { datadog } from './datadog.js'

export const logpost = (options = {}) => {
  if (options.debug) {
    globalThis.logpost = { debug: true }
  }

  return async (c, next) => {
    await next()

    if (options.type === 'newrelic') {
      c.executionCtx.waitUntil(
        newrelic(c.req.raw, options.newrelic)
      )
    }
    if (options.type === 'datadog') {
      c.executionCtx.waitUntil(
        datadog(c.req.raw, options.datadog)
      )
    }

    await consoleLog(c.req.raw, options.console)
  }
}