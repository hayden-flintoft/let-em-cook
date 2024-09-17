import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import meals from './api/meals.ts'
import categories from './api/categories.ts'
import ingredients from './api/ingredients.ts'
import areas from './api/cuisines.ts'
import comments from './api/comment.ts'
import likes from './api/likes.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/meals', meals)
server.use('/api/v1/categories', categories)
server.use('/api/v1/ingredients', ingredients)
server.use('/api/v1/areas', areas)
server.use('/api/v1/comments/', comments)
server.use('/api/v1/likes/', likes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
