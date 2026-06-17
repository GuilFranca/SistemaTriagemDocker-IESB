const PRIORIDADES_VALIDAS = ['emergencia', 'urgente', 'pouco_urgente', 'nao_urgente']
const STATUS_VALIDOS = ['aguardando', 'em_atendimento', 'finalizado']
const GENEROS_VALIDOS = ['masculino', 'feminino', 'outro']

export function validarPaciente({ nome, genero, idade, cpf_rg, prioridade, queixa_principal }) {
  if (!nome || nome.trim() === '')
    return 'O campo nome é obrigatório.'

  if (!genero || !GENEROS_VALIDOS.includes(genero))
    return 'Gênero inválido. Use: masculino, feminino ou outro.'

  if (!idade || isNaN(idade) || idade <= 0)
    return 'Idade inválida.'

  if (!cpf_rg || cpf_rg.trim() === '')
    return 'CPF/RG é obrigatório.'

  if (!prioridade || !PRIORIDADES_VALIDAS.includes(prioridade))
    return 'Prioridade inválida. Use: emergencia, urgente, pouco_urgente ou nao_urgente.'

  if (!queixa_principal || queixa_principal.trim() === '')
    return 'A queixa principal é obrigatória.'

  return null
}

export function validarStatus({ status }) {
  if (!status || !STATUS_VALIDOS.includes(status))
    return 'Status inválido. Use: aguardando, em_atendimento ou finalizado.'

  return null
}