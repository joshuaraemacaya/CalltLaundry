var express = require('express')
var session = require('express-session');
var router = express.Router()
var db = require('../../lib/database')();
// var mid = require("../../middlewares")
var moment = require ('moment')


router.get('/',(req,res)=>{
    const query = `SELECT * FROM customer_tbl JOIN account_tbl
    ON customer_tbl.cust_id = account_tbl.cust_id WHERE customer_tbl.cust_id = "${req.session.user.cust_id}"`
    db.query(query,(err,out)=>{
        res.render('customer/index',{customers:out[0]})
        console.log(out[0])
    })
})

// LOGIN
router.post('/customer/login',(req,res)=>{
    const query = `SELECT * FROM customer_tbl JOIN account_tbl
    ON customer_tbl.cust_id = account_tbl.cust_id WHERE account_tbl.username = "${req.body.username}"`
    
    db.query(query, (err, out) => {
        console.log(req.body)
        if(!out[0]){
            
        res.send(false)
        }
        else {
            if(out[0].password !== req.body.password)
            res.redirect("/home/index#incorrect")
            else {
                delete out[0].password
                req.session.user = out[0]	
                console.log(req.session.user)
               res.send(true)
           }
       }
 })
})

exports.customer = router;