export default function errorHandler(err, _req, res, next) {
  console.log(`🤖 Something went wrong
    Error: ${err.name}
  `)
  console.log(err.stack)

  if (err.name === 'ValidationError') {
    const errors = {}

    for (const key in err.errors) {
      errors[key] = err.errors[key].message
    }

    return res.status(422).json({
      message: 'Form Validation Error',
      errors,
    })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid Parameter Provided' })
  }

  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not Found' })
  }

  res.sendStatus(500)
  next(err)
}
