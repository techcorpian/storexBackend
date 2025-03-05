import { Router } from 'express';
import {
  createProject,
  getProject,
} from '../controllers/projectController';

const router = Router();

router.get('/', getProject); 
router.post('/', createProject);     // Create an item
// router.get('/getFileById/:id', getFileById);

export default router;