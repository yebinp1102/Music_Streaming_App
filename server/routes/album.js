import express from 'express'
import {auth} from '../middleware/auth.js'
import {getAlbumsBySearch, getAlbumsByTags, getAlbums, getAlbum, createAlbum, updateAlbum, deleteAlbum, likeAlbum, commentAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.get('/:id', getAlbum);
router.post('/createAlbum', auth, createAlbum);
router.patch('/:id', auth, updateAlbum)
router.delete('/:id', auth, deleteAlbum)
router.patch('/:id/likeAlbum', auth, likeAlbum)
router.get('/search/:searchQuery', getAlbumsBySearch)
router.get('/searchTags', getAlbumsByTags)
router.post('/:id/comment', auth, commentAlbum)

export default router;