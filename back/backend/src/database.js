import 'dotenv/config'
import sqlite3 from 'sqlite3'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../data/fila.db')

const dir = path.dirname(DB_PATH)
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const db = new sqlite3.Database(DB_PATH)

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      nome             TEXT    NOT NULL,
      genero           TEXT    NOT NULL CHECK(genero IN ('masculino', 'feminino', 'outro')),
      idade            INTEGER NOT NULL,
      cpf_rg           TEXT    NOT NULL,
      prioridade       TEXT    NOT NULL CHECK(prioridade IN ('emergencia', 'urgente', 'pouco_urgente', 'nao_urgente')),
      queixa_principal TEXT    NOT NULL,
      observacoes      TEXT,
      status           TEXT    NOT NULL DEFAULT 'aguardando'
                                CHECK(status IN ('aguardando', 'em_atendimento', 'finalizado')),
      criado_em        TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `)
})

export default db