const express = require('express')
const db = require('../config/db')
const rt = express.Router();

rt.get('/',(req,res)=>{
    const qr = `Select * from allproducts`;
    db.query(qr,(err,result)=>{
        if(err)
        {
            return res.status(500).json({ error: 'Database error' });
        }
        else{
            console.log("products fetched");
            return res.status(200).json({ products:result,message : "Products fetched"});
        }
    })
})

module.exports = rt