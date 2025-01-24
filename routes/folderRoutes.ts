import { Router } from 'express';
import {
  createFolder,
  getFolders,
  getFolderById,
  getBreadcrumbsById,
  deleteBulk
} from '../controllers/folderController';

const router = Router();

router.get('/', getFolders); 
router.post('/', createFolder);     // Create an item
router.get('/getFolderById/:id', getFolderById);
router.get('/getBreadcrumbsById/:id', getBreadcrumbsById);
router.post('/deleteBulk', deleteBulk);

export default router;