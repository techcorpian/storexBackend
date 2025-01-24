import { Router } from 'express';
import {
  createFile,
  getFiles,
  getFileById
} from '../controllers/fileController';

const router = Router();

router.get('/', getFiles); 
router.post('/', createFile);     // Create an item
router.get('/getFileById/:id', getFileById);

export default router;