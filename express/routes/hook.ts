import { Router } from "express";
const { list, register, update, deleteHook, trigger } = require('../src/controller/hook')
const { verify } = require('../middleware/verify')
const router = Router()

router.route('/list').post(verify, list)
router.route('/register').post(verify, register)
router.route('/update').post(verify, update)
router.route('/delete/:id').post(verify, deleteHook)
router.route('/ip').post(verify, trigger)

export default router