import { Router } from "express";
import { deleteHook, list, register, trigger, update } from '../src/controller/hook'

const router = Router()
router.get('/list',list)
router.post('/register', register)
router.put('/update', update)
router.delete('/delete/:id', deleteHook)
router.post('/ip',trigger)

export default router