class IgnoreCaseMap extends Map {
  // https://stackoverflow.com/a/50022230
  c(v) {
    return (typeof v === 'string') ? v.toLowerCase() : v
  }

  set(k, v) {
    return super.set(this.c(k), v)
  }

  get(k) {
    return super.get(this.c(k))
  }

  has(k) {
    return super.has(this.c(k))
  }
}

export const endpoints = {
  // https://docs.newrelic.com/docs/logs/log-api/introduction-log-api/#endpoint
  newrelic: new IgnoreCaseMap(Object.entries({
    us: 'https://log-api.newrelic.com/log/v1',
    eu: 'https://log-api.eu.newrelic.com/log/v1',
    gov: 'https://gov-log-api.newrelic.com/log/v1',
  })),

  // https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
  datadog: new IgnoreCaseMap(Object.entries({
    us1: 'https://http-intake.logs.datadoghq.com/api/v2/logs',
    us3: 'https://http-intake.logs.us3.datadoghq.com/api/v2/logs',
    us5: 'https://http-intake.logs.us5.datadoghq.com/api/v2/logs',
    eu1: 'https://http-intake.logs.datadoghq.eu/api/v2/logs',
    ap1: 'https://http-intake.logs.ap1.datadoghq.com/api/v2/logs',
    gov: 'https://http-intake.logs.ddog-gov.com/api/v2/logs',
  })),
}