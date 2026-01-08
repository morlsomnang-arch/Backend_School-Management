import express from 'express'
import { auth } from '../../middleware/auth.middleware.js'
import { allowPermissions } from '../../middleware/permission.middleware.js'
import {
  getParents,
  getParent,
  createParent,
  updateParent,
  deleteParent
} from '../../controllers/Student_controller/parent.controller.js'

const router = express.Router()

// GET ALL
router.get('/', auth, allowPermissions('view_parent'), getParents)

// GET SINGLE
router.get('/:id', auth, allowPermissions('view_parent'), getParent)

// CREATE
router.post('/', auth, allowPermissions('create_parent'), createParent)

// UPDATE
router.put('/:id', auth, allowPermissions('update_parent'), updateParent)

// DELETE
router.delete('/:id', auth, allowPermissions('delete_parent'), deleteParent)

export default router
