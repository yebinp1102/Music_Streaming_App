import React from 'react'
import './CSS/Album.css'
import { Card, CardActions, CardMedia, Button, Typography, CardContent } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'


type AlbumType = {
    _id?: string,
    title: string,
    singer: string,
    description: string,
    composer: string,
    tags: string[],
    selectedFile: Object | any,
    likeCount: number,
    createdAt: Date | null,
    // song: 
}

const Album = ({album}: {album: AlbumType}) => {
  return (
    <Card>
      <CardMedia title={album.title} image={album.selectedFile} />
      <div className=''>
        <Typography variant='h6'>{album.singer}</Typography>
        <Typography variant='h6'>{album.composer}</Typography>
        <Typography variant='h6'>{album.createdAt?.toString().slice(0, 10)}</Typography>
      </div>
      <div className=''>
        <Button style={{color: 'red'}} size='small' onClick={() => {}}>
          <MoreHorizIcon fontSize='default' />
        </Button>
      </div>
      <div className=''>
        <Typography variant='body2' color='textSecondary'>
          {album.tags.map(tag => `#${tag}`)}
        </Typography>
      </div>
      <CardContent>
        <Typography variant='h5' gutterBottom>{album.title}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' color='primary' onClick={() => {}}>
          <ThumbUpAltIcon fontSize='small'/>
          좋아요 {album.likeCount}
        </Button>
        <Button size='small' color='secondary' onClick={() => {}}>
          <DeleteIcon fontSize='small'/>
          삭제하기
        </Button>
      </CardActions>
    </Card>
  )
}

export default Album