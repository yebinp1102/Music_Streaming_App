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
  const album = req.body;
  const newAlbum = new Album(album);
  try{
    await newAlbum.save()
    // status 201은 성공적인 creation을 의미.
    res.status(201).json({newAlbum})
  }catch(err){
    res.status(409).json({message: err.message})
  }
}