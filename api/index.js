import express from 'express'
import postRoutes from './server/routes/PostRoutes'

const app = express()

app.use(express.json())

const port = process.env.PORT || 8000

app.use('/api/v1/posts', postRoutes)

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`)
})

export default app
