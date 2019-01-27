var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
// var mid = require("../../middlewares")
var moment = require ('moment')


router.get('/index',(req,res)=>{
    res.render('admin/index')
})
exports.admin = router;