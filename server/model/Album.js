import mongoose from "mongoose";

const AlbumSchema = mongoose.Schema({
  title: String,
  description: String,
  singer: String,
  composer: String,
  tags: [String],
  selectedFile: Object,
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})


const Album = mongoose.model('Album', AlbumSchema)
export default Album