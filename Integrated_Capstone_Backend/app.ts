import express,{Request,Response} from "express";
var cors = require('cors')

const  route = require('./src/routes/routing');

const app = express()
const port = process.env.PORT || 4001

app.use(express.json())
app.use(cors())
app.use('/',route)

app.get('/',(req:Request,res:Response)=>{
    res.json("helllo from backend")
})

app.listen(port,()=>{
    console.log(`server is connected to teh port ${port }`)
})