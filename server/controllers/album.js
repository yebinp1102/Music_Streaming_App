import mongoose from "mongoose";
import Album from "../model/Album.js"

export const getAlbums = async (req, res) => {
  try{
    const Albums = await Album.find();
    res.status(200).json(Albums);
  }catch(err){
    res.status(400).json(err.message)
  }
}

export const createAlbum = async (req, res) => {
  const album = req.body;
  const newAlbum = new Album({...album, createdAt: new Date().toISOString()});
  try{
    await newAlbum.save()
    // status 201은 성공적인 creation을 의미.
    res.status(201).json({newAlbum})
  }catch(err){
    res.status(400).json(err.message)
  }
}

export const updateAlbum = async(req, res) => {
  const {id: _id} = req.params;
  const album = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).sned('존재 하지 않는 앨범입니다.')
  try{
    const updatedAlbum = await Album.findByIdAndUpdate(_id, album, {new: true});
    res.json(updatedAlbum)
  }catch(err){
    res.status(400).json(err.message)
  }
}

export const deleteAlbum = async(req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).sned('존재 하지 않는 앨범입니다.')
  try{
    await Album.findByIdAndRemove(id);
    res.json(id)
  }catch(err){
    res.status(400).json(err.message)
  }
}

export const likeAlbum = async(req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).sned('존재 하지 않는 앨범입니다.')
  try{
    const album = await Album.findById(id);
    const updatedAlbum = await Album.findByIdAndUpdate(id, {likeCount: album.likeCount + 1}, {new: true})
    res.json(updatedAlbum)
  }catch(err){
    res.status(400).json(err.message)
  }
}