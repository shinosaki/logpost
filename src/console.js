export const consoleLog = async (req, options = {}) => {
  console.log(
    (options.body)
      ? await options.body(req)
      : { timestamp: Date.now(), cf: req.cf }
  )
}