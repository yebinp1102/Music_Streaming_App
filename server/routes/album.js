import express from 'express'
import {getAlbums, createAlbum, updateAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.post('/createAlbum', createAlbum);
router.patch('/:id', updateAlbum)

export default router;