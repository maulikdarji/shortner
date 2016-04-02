var express=require("express");
var app=express();
var fs=require("fs");
var page;
fs.readFile('index.html',function(err,data){
  if(err) console.error(err);
  else{
    page=data.toString();
  }
})
app.get("/",function(req,res){
  res.end(page);
}).listen(process.env.PORT || 8080);