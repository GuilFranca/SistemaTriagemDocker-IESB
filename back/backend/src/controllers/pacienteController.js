import { PacienteModel } from '../models/pacienteModel.js'
import { validarPaciente, validarStatus } from '../validators/pacienteValidator.js'

export async function listar(req, res) {
  const pacientes = await PacienteModel.listarTodos()
  res.json(pacientes)
}

export async function cadastrar(req, res) {
  const erro = validarPaciente(req.body)
  if (erro) return res.status(400).json({ erro })

  const { nome, genero, idade, cpf_rg, prioridade, queixa_principal, observacoes } = req.body

  const paciente = await PacienteModel.criar({ nome, genero, idade, cpf_rg, prioridade, queixa_principal, observacoes })
  res.status(201).json(paciente)
}

export async function atualizarStatus(req, res) {
  const erro = validarStatus(req.body)
  if (erro) return res.status(400).json({ erro })

  const paciente = await PacienteModel.atualizarStatus(req.params.id, req.body.status)
  if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado.' })

  res.json(paciente)
}

export async function remover(req, res) {
  const removido = await PacienteModel.remover(req.params.id)
  if (!removido) return res.status(404).json({ erro: 'Paciente não encontrado.' })

  res.status(204).send()
}