import { consoleLog } from './console.js'
import { newrelic } from './newrelic.js'

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

    await consoleLog(c.req.raw, options.console)
  }
}