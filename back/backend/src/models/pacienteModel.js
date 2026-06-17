import db from '../database.js'

export const PacienteModel = {

  listarTodos() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM pacientes ORDER BY criado_em ASC', [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows.map(calcularTempoEspera))
      })
    })
  },

  criar({ nome, genero, idade, cpf_rg, prioridade, queixa_principal, observacoes }) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO pacientes (nome, genero, idade, cpf_rg, prioridade, queixa_principal, observacoes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nome, genero, idade, cpf_rg, prioridade, queixa_principal, observacoes || null],
        function (err) {
          if (err) reject(err)
          else {
            db.get('SELECT * FROM pacientes WHERE id = ?', [this.lastID], (err, row) => {
              if (err) reject(err)
              else resolve(calcularTempoEspera(row))
            })
          }
        }
      )
    })
  },

  atualizarStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE pacientes SET status = ? WHERE id = ?`,
        [status, id],
        function (err) {
          if (err) reject(err)
          else if (this.changes === 0) resolve(null)
          else {
            db.get('SELECT * FROM pacientes WHERE id = ?', [id], (err, row) => {
              if (err) reject(err)
              else resolve(calcularTempoEspera(row))
            })
          }
        }
      )
    })
  },

  remover(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM pacientes WHERE id = ?`, [id], function (err) {
        if (err) reject(err)
        else resolve(this.changes > 0)
      })
    })
  }
}

// calcula tempo de espera a partir do criado_em
function calcularTempoEspera(paciente) {
  const criado = new Date(paciente.criado_em)
  const agora = new Date()
  const diffMs = agora - criado
  const horas = Math.floor(diffMs / (1000 * 60 * 60))
  const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return {
    ...paciente,
    tempo_espera: `${horas}h${String(minutos).padStart(2, '0')}m`
  }
}