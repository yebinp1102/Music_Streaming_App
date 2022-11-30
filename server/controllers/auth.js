import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  const {username, password, confirmPassword} = req.body;
  try{
    // 유저명 중복 확인
    const existingUser = await User.findOne({username});
    if(existingUser) return res.status(409).json({message: '이미 다른 사용자가 사용 중인 유저명입니다.'})


    // password와 confirmPassword가 같은지 비교
    if(password !==confirmPassword) return res.status(400).json({message : '비밀번호가 다릅니다.'})

    // 유저명 중복 x 이면서 password와 confirmPassword가 같은 경우
    // 비밀번호를 해쉬화(암호화)해서 User Collection에 유저명, 암호화된 비밀번호를 저장한다.
    const hashedPwd = await bcrypt.hash(password, 10);
    const result = await User.create({username, password: hashedPwd})
    const token = jwt.sign({username: result.username, id: result._id}, 'test', {expiresIn: "12h"})
    res.status(200).json({result, token})
  }catch(err){
    res.status(500).json({message : '회원가입에 실패 했습니다.'})
  }
}