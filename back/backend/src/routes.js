import { Router } from 'express'
import { listar, cadastrar, atualizarStatus, remover } from './controllers/pacienteController.js'

const router = Router()

router.get('/pacientes', listar)
router.post('/pacientes', cadastrar)
router.put('/pacientes/:id/status', atualizarStatus)
router.delete('/pacientes/:id', remover)

export default router