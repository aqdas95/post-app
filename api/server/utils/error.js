export default (err, req, res, next) => {
  if (!err) next()

  if (req.headers.accept.includes('text/html')) next()

  // de-construct stack variable
  let { message, code } = err
  console.trace(err)

  if (err.errors && err.errors[0] && err.errors[0].message) {
    message = err.errors.shift().message
    code = 422
  }

  const errCode = code || 500
  return res.status(errCode).json({
    code: errCode,
    message: message || 'error',
    data: null
  })
}
