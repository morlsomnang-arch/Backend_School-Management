import express from 'express'
import { auth } from '../../middleware/auth.middleware.js'
import { allowPermissions } from '../../middleware/permission.middleware.js'
import {
  getServices,
  createService,
  updateService,
  deleteService
} from '../../controllers/Student_controller/service.controller.js'

const router = express.Router()

router.get('/', getServices)
router.post('/', auth, allowPermissions('create_service'), createService)
router.put('/:id', auth, allowPermissions('update_service'), updateService)
router.delete('/:id', auth, allowPermissions('delete_service'), deleteService)

export default router
