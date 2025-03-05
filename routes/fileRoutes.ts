import { Router } from 'express';
import multer from 'multer';
import path from "path";

import {
  createFile,
  getFiles,
  getFileById
} from '../controllers/fileController';

const router = Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
      const customName = req.body.customName || Date.now();
      const ext = path.extname(file.originalname);
      cb(null, customName + ext);
  }
});

const upload = multer({ storage });

router.get('/', getFiles); 
router.post('/', upload.single('file'), createFile);     // Create an item
router.get('/getFileById/:id', getFileById);

export default router;