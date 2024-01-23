export const newrelic = async (req, options = {}) => {
  options.endpoint ??= 'https://log-api.newrelic.com/log/v1'
  try { new URL(options.endpoint) } catch { throw new Error('Invalid NewRelic API Endpoint URL') }

  if (!options.key) {
    throw new Error('Require NewRelic API/License Key')
  }

  if (globalThis.logpost?.debug) console.log(options)

  const data = (options.body)
    ? await options.body(req)
    : { timestamp: Date.now(), cf: req.cf }

  if (globalThis.logpost?.debug) console.log(data)

  const res = await fetch(options.endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': options.key,
    }
  })

  if (globalThis.logpost?.debug) console.log(res.status)
  if (globalThis.logpost?.debug) console.log(await res.json())

  return res.ok
}