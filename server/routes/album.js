import express from 'express'
import {getAlbums, postAlbum} from '../controllers/album.js'

const router = express.Router();

router.get('/', getAlbums);
router.post('/', postAlbum);

export default router;