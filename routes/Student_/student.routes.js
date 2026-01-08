import express from 'express';
import multer from 'multer';
import { auth } from '../../middleware/auth.middleware.js';
import { allowPermissions } from '../../middleware/permission.middleware.js';
import { create, index, update, destroy } from '../../controllers/Student_controller/student.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.get('/', 
    // auth, allowPermissions('view_students'),
     index);
router.post('/', auth, allowPermissions('create_students'), upload.single('image'), create);
router.put('/:id', auth, allowPermissions('update_students'), upload.single('image'), update);
router.delete('/:id', auth, allowPermissions('delete_students'), destroy);

export default router;
