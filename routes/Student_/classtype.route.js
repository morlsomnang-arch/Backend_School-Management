import express from 'express'
import {
  index,
  store,
  update,
  destroy
} from '../../controllers/Student_controller/classtype.controller.js'

import { auth } from '../../middleware/auth.middleware.js'
import { allowPermissions } from '../../middleware/permission.middleware.js'


const router = express.Router()

router.get(
  '/',
  auth,
  allowPermissions('view_classtypes'),
  index
)

router.post(
  '/',
  auth,
  allowPermissions('create_classtypes'),
  store
)

router.put(
  '/:id',
  auth,
  allowPermissions('update_classtypes'),
  update
)

router.delete(
  '/:id',
  auth,
  allowPermissions('delete_classtypes'),
  destroy
)

export default router
