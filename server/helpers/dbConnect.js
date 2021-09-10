const mongoose = require('mongoose')
const config = require('config')

require('dotenv').config({ path: '../config/config.env' });
const dbConnect =() => {
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,useCreateIndex:true
  })
  .then((res) => console.log('database connected'))
  .catch((err) => console.log(err));
}
// const dbConnect =() => {
    
//     mongoose.connect(config.get("DB_CONNECTION.URI"),{ useNewUrlParser: true, useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true},(err)=>{
//         if(err) throw err
//         console.log('Db connected..')
//     })
// }

module.exports = dbConnect