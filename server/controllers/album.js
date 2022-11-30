import Album from "../model/Album.js"

export const getAlbums = async (req, res) => {
  try{
    const Albums = await Album.find();
    res.status(200).json(Albums);
  }catch(err){
    res.status(400).json({message: err.message})
  }
}

export const postAlbum = async (req, res) => {
  try{

  }catch(err){

  }
}