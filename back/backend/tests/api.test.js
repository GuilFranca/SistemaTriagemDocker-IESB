import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'

process.env.DB_PATH = ':memory:'
process.env.PORT = '3099'

const { default: app } = await import('../src/index.js')

const BASE = 'http://localhost:3099'

await new Promise(r => setTimeout(r, 500))

describe('GET /health', () => {
  it('deve retornar status ok', async () => {
    const res = await fetch(`${BASE}/health`)
    assert.equal(res.status, 200)
    const body = await res.json()
    assert.equal(body.status, 'ok')
  })
})

describe('POST /pacientes', () => {
  it('deve criar paciente com dados válidos', async () => {
    const res = await fetch(`${BASE}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Carlos Eduardo',
        genero: 'masculino',
        idade: 58,
        cpf_rg: '123.456.789-00',
        prioridade: 'emergencia',
        queixa_principal: 'Dor no peito',
        observacoes: ''
      })
    })
    assert.equal(res.status, 201)
    const body = await res.json()
    assert.equal(body.nome, 'Carlos Eduardo')
    assert.equal(body.prioridade, 'emergencia')
    assert.equal(body.status, 'aguardando')
  })

  it('deve rejeitar prioridade inválida', async () => {
    const res = await fetch(`${BASE}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Maria',
        genero: 'feminino',
        idade: 30,
        cpf_rg: '999.888.777-66',
        prioridade: 'alta',
        queixa_principal: 'Febre'
      })
    })
    assert.equal(res.status, 400)
  })

  it('deve rejeitar sem nome', async () => {
    const res = await fetch(`${BASE}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: '',
        genero: 'feminino',
        idade: 30,
        cpf_rg: '999.888.777-66',
        prioridade: 'urgente',
        queixa_principal: 'Febre'
      })
    })
    assert.equal(res.status, 400)
  })
})

describe('GET /pacientes', () => {
  it('deve listar pacientes', async () => {
    const res = await fetch(`${BASE}/pacientes`)
    assert.equal(res.status, 200)
    const body = await res.json()
    assert.ok(Array.isArray(body))
  })
})

describe('PUT /pacientes/:id/status', () => {
  it('deve atualizar status do paciente', async () => {
    const criado = await fetch(`${BASE}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Teste Status',
        genero: 'outro',
        idade: 25,
        cpf_rg: '111.222.333-44',
        prioridade: 'pouco_urgente',
        queixa_principal: 'Dor de cabeça',
        observacoes: ''
      })
    }).then(r => r.json())

    const res = await fetch(`${BASE}/pacientes/${criado.id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'em_atendimento' })
    })
    assert.equal(res.status, 200)
    const body = await res.json()
    assert.equal(body.status, 'em_atendimento')
  })

  it('deve rejeitar status inválido', async () => {
    const res = await fetch(`${BASE}/pacientes/1/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelado' })
    })
    assert.equal(res.status, 400)
  })
})

describe('DELETE /pacientes/:id', () => {
  it('deve remover paciente existente', async () => {
    const criado = await fetch(`${BASE}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Para Remover',
        genero: 'masculino',
        idade: 40,
        cpf_rg: '555.444.333-22',
        prioridade: 'nao_urgente',
        queixa_principal: 'Consulta de rotina',
        observacoes: ''
      })
    }).then(r => r.json())

    const res = await fetch(`${BASE}/pacientes/${criado.id}`, { method: 'DELETE' })
    assert.equal(res.status, 204)
  })

  it('deve retornar 404 para id inexistente', async () => {
    const res = await fetch(`${BASE}/pacientes/99999`, { method: 'DELETE' })
    assert.equal(res.status, 404)
  })
})