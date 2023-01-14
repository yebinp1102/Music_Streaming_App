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

  // auth 미들 웨어를 성공적으로 수행 했다면, req의 userId 프로퍼티에 값이 있어야 한다.
  // 만약 req.userId가 undefined 혹은 null이라면 로그인 하지 않은 유저가 해당 action을 실행 한 것이니 거절해야 한다.
  if(!req.userId) return res.json({message: '로그인 후 이용해주세요.'})
  
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).sned('존재 하지 않는 앨범입니다.')
  
  try{
    const album = await Album.findById(id);

    // 유저가 해당 앨범에 이미 좋아요를 눌렀는지 확인해야 한다.
    // 그러기 위해서 해당 앨범의 likes 프로퍼티에 해당 유저의 id가 존재하는지 확인한다.
    // 만약 likes에 유저의 아이디가 있으면, 이미 유저가 해당 앨범에 좋아요를 눌렀다는 의미이며, index에 값이 할당된다.
    const index = album.likes.findIndex((id) => id=== String(req.userId))

    // index가 -1인 경우는, 유저가 해당 앨범에 아직 좋아요를 누르지 않은 상태이다. 
    // 이 상태에서는 해당 앨범의 likes에 유저 id를 추가하고, 앨범의 likesCount에 +1을 한다.
    if(index === -1){
      album.likes.push(req.userId);
    }else{ // 반면 이미 유저가 해당 앨범에 좋아요를 누른 상태면 index에 특정 숫자가 할당되며, 좋아요를 취소하도록 설정함.
      album.likes = album.likes.filter((id) => id !== String(req.userId));
    }

    const updatedAlbum = await Album.findByIdAndUpdate(id, album, {new: true})
    res.json(updatedAlbum)
  }catch(err){
    res.status(400).json(err.message)
  }
}