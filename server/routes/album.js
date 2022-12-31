import express from 'express'
import {getAlbums, createAlbum, updateAlbum, deleteAlbum, likeAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.post('/createAlbum', createAlbum);
router.patch('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)
router.patch('/:id/likeAlbum', likeAlbum)

export default router;