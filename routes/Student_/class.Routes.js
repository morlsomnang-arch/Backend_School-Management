import express from 'express'
import { auth } from '../../middleware/auth.middleware.js'
import { allowPermissions } from '../../middleware/permission.middleware.js'
import {
  index,
  store,
  update,
  destroy
} from '../../controllers/Student_controller/class.controller.js'

const router = express.Router()

router.get('/', 
  auth, allowPermissions('view_classes'), 
  index)
router.post('/', auth, allowPermissions('create_classes'), store) 
router.put('/:id', auth, allowPermissions('update_classes'), update)
router.delete('/:id', auth, allowPermissions('delete_classes'), destroy)

export default router
