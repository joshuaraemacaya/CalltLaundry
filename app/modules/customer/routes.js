var express = require('express')
var session = require('express-session');
var router = express.Router()
var db = require('../../lib/database')();
// var mid = require("../../middlewares")
var moment = require ('moment')


router.get('/index',(req,res)=>{
    const query = `SELECT * FROM customer_tbl JOIN account_tbl
    ON customer_tbl.cust_id = account_tbl.cust_id WHERE customer_tbl.cust_id = "${req.session.user.cust_id}"`
    
    db.query(query,(err,out)=>{
        res.render('/customer/index',{
            customers : out[0]
        })
    })
})

// LOGIN
router.post('/customer/login',(req,res)=>{
    const query = `SELECT * FROM customer_tbl JOIN account_tbl
    ON customer_tbl.cust_id = account_tbl.cust_id WHERE account_tbl.username = "${req.body.username}"`
    
    db.query(query, (err, out) => {
        console.log(out[0])
        if(!out[0])
        return res.redirect("/home/login#notfound")
        else {
            if(out[0].password !== req.body.password)
            return res.redirect("/home/login#incorrect")
            else {
                delete out[0].password
                req.session.user = out[0]	
               return res.redirect("/customer/index")
           }
       }
 })
})

exports.customer = router;