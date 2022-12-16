import express from 'express'
import {getAlbums, createAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.post('/createAlbum', createAlbum);

export default router;