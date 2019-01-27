var express = require('express')
var session = require('express-session');
var router = express.Router()
var db = require('../../lib/database')();
// var mid = require("../../middlewares")
var moment = require ('moment')


router.get('/index',(req,res)=>{
    res.render('home/index')
})


// REGISTRATION
router.post('/home/register',(req,res)=>{
    const query = `INSERT INTO customer_tbl(cust_name, cust_contact_no, cust_address)
    VALUE("${req.body.cust_name}","${req.body.cust_contact_no}","${req.body.cust_address}")`

    db.query(query,(err,out)=>{
        var cust_id = out.insertId
        if(err){
            var alertDesc = 1
            res.send({alertDesc:alertDesc})
        }
        else{
            const query1 = `INSERT INTO account_tbl(cust_id,username,password)
            VALUE("${cust_id}","${req.body.cust_username}","${req.body.cust_password}")`

            db.query(query1,(err,out)=>{
                if(err){
                    var alertDesc = 1
                    const query2 = `DELETE FROM customer_tbl WHERE cust_id = "${cust_id}"`

                    db.query(query2,(err,out)=>{

                    })
                }
                else{
                    var alertDesc = 0 
                    res.send({alertDesc:alertDesc})
                }
            })
        }
    })
})

exports.home = router;