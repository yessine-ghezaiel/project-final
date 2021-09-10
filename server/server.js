const express=require('express')
require('dotenv').config({ path: './config/config.env' });

const app= express()
const config=require('config')
const dbConnect= require('./helpers/dbConnect')
const cors = require('cors')
// const PORT = config.get('SERVER_CONFIG.PORT') || 5000
const PORT = process.env.PORT || 5000
dbConnect()

app.use(cors())
app.use(express.json({ limit: '50MB'}))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/post',require('./routes/postRoutes'))
app.use('/api/car',require('./routes/carDealerRoutes'))
app.use('/api/comment',require('./routes/commentRoutes'))

app.listen(PORT,()=>{
console.log(`App is running on http://localhost:${PORT}`)
})
