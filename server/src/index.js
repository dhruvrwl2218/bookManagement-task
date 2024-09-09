// import dotenv from 'dotenv/coonfig';
import connectDB from './Db/dbConnect.js';
import {app} from './app.js';
import 'dotenv/config'
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8080,()=>console.log('app listening and up running ;}'))
    
}).catch((error)=>{
    // console.log('db connection error:',error)
    process.exit(1)
})