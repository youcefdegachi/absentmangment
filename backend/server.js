// import path from 'path';
import express from 'express';
import dotnev from 'dotenv';



dotnev.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json()); //to read json from request 


app.get('/' , (req,res) =>{
  // res.send("API work")
})

app.listen(port, ()=>{ console.log(`server run on port ${port}`) }) // listen on port ${port}
