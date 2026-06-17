import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// healthcheck — obrigatório pelo Caso 4
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

// rotas
app.use(router)

app.listen(PORT, () => {
  console.log(`Aplicação rodando -> http://localhost:${PORT}`)
})