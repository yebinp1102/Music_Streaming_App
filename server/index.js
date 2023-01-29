import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// 라우트(routes)
import authRoutes from './routes/auth.js'
import albumRoutes from './routes/album.js'

const app = express();

app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(bodyParser.json({limit: "30mb", extended: true}));

dotenv.config();
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/albums', albumRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  try{
    mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log('데이터 베이스에 성공적으로 연결 되었습니다.')
  }catch(err){
    console.log(err)
  }
  console.log(`서버가 포트${PORT}에서 정상적으로 작동 중 입니다.`)
})