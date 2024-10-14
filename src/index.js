import dotenv from 'dotenv';
import {app} from "../src/app.js"
import connectDB from './db/index.js';
dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(` ⚙️ Server is running at port : ${process.env.PORT}`);
    });
    app.get('/', (req, res) => {
        res.send('Hello Iqbal Sir')
      })

})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
});





//database connection function


