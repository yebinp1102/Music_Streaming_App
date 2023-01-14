import express from 'express'
import {auth} from '../middleware/auth.js'
import {getAlbums, createAlbum, updateAlbum, deleteAlbum, likeAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.post('/createAlbum', auth, createAlbum);
router.patch('/:id', auth, updateAlbum)
router.delete('/:id', auth, deleteAlbum)
router.patch('/:id/likeAlbum', auth, likeAlbum)

export default router;