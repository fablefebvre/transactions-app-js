var express = require("express");
var mongoose = require("mongoose");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
    mongoose.connect('mongodb://localhost:27017/db');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    var operationSchema = new mongoose.Schema({
       operationType: String
    });
    var transactionSchema = new mongoose.Schema({
        amount: Number, 
        exponent: Number,
        operations: [operationSchema]
    });
    var TransactionModel = mongoose.model('transactions', transactionSchema);
    var OperationModel = mongoose.model('operation', operationSchema);

    /*var myTransaction1 = new TransactionModel({amount: 1200, exponent: 2});
    var myTransaction2 = new TransactionModel({amount: 2000, exponent: 1, });

    myTransaction2.save(function(err) {
        if(err) {throw err;}
        console.log('Transaction2 saved');
        mongoose.connection.close();
    });*/
    
    TransactionModel.find(null, function(err, transactions) {
        if(err) throw err;
        console.log('Transactions: ' + transactions);
    })

    OperationModel.find(null, function(err, operations) {
        if(err) throw err;
        console.log('Operations: ' + operations);
    })

    res.sendFile(path + "index.html");
});

app.use(express.static('public'));

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});