const mysql = require('mysql')

const db = mysql.createConnection({
    host : 'host.docker.internal',
    user : 'root',
    password : 'Rohit@45',
    database: 'ecommerce',
    port : 3306,
})

db.connect((err)=>{
    if(err)
        console.log("db error")
    else 
        console.log("db working")
})

module.exports=db;