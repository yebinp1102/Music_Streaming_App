import express from 'express'
import {auth} from '../middleware/auth.js'
import {getAlbumsBySearch, getAlbums, getAlbum, createAlbum, updateAlbum, deleteAlbum, likeAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/createAlbum', auth, createAlbum);
router.patch('/:id', auth, updateAlbum)
router.delete('/:id', auth, deleteAlbum)
router.patch('/:id/likeAlbum', auth, likeAlbum)
router.get('/search', getAlbumsBySearch)

export default router;