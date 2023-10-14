const express = require('express')
const { Pool } = require('pg')
require('dotenv').config()
const app = express()
app.use(express.json())


const cl = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  })

cl.connect()

app.get('/',(req,res)=>{
    cl.query(`select * from Users`,(err,result)=>{
        const{rows} = result
        if(!err){
            res.status(200).json(rows)
        }
    })
})
app.get('/users/:id',(req,res)=>{
    const id = req.params.id
    cl.query(`select * from Users where id = ${id}`,(err,result)=>{
        if(!err){
            console.log(result.rows);
        }else{
            console.log(err.message);
        }
    }) 
    res.end()
})
app.post('/addUser',(req,res)=>{
    const{id,name,email} = req.body
    cl.query(`insert into Users values('${id}','${name}','${email}')`,(err,result)=>{
        if(!err){
            console.log(result.rows);
        }else{
            console.log(err.message);
        }
    })
    res.end()
})

app.listen(8080,()=>{
 console.log("Server start");
})

