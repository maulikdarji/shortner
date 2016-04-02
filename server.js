var express=require("express");
var app=express();
var fs=require("fs");

var mongo = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017/urlDB';

var pattern =/([http || https]\:\/\/)+([www || \w])+(.)+(\w)+(.)+([A-Za-z])/;
var su="https://shortner-maulikdarji.c9users.io";  //short url
var page,op,nsu;

//Read index.html
fs.readFile('index.html',function(err,data){
  if(err) console.error(err);
  else{
    page=data.toString();
  }
});

//Shorten-output page
app.get("/new/*",function(req,res){
  var testurl=req.url.slice(5);
  if(pattern.test(testurl)){
    //URL Match successful
    mongo.connect(dburl,function(err,db){
      if(err)console.error(err);
      else{
        var col = db.collection('urls');
        //check if already exist
        col.find({
          'original_url':testurl
        }).toArray(function(err,match){
          if(err)console.error(err);
          else{
            if(match.length===0){
              //insert new data
              
              //Count total entries-----
              col.count({},function(err,count){
                if(err)console.error(err);
                else{
                  console.log(count);
                  nsu=count;
                  
                  //insert new url
                  col.insert({
                    'original_url':testurl,
                    'short_url':su+"/"+nsu
                    
                  },function(err,insData){
                    if(err)console.eror(err);
                    else{
                      console.log(insData);
                      res.writeHead(200 , {"content-type":"application/json"});
                      op=JSON.stringify(insData.ops);
                      res.end(op);
                      db.close();
                    }
              });//EOF insert success
                }
              });//EOF count
              
            }
            else{
              res.writeHead(200 , {"content-type":"application/json"});
                  op=JSON.stringify(match);
                  res.end(op);
                  db.close();
            }
          }
        });//EOF find
      }
    });//EOF mongo connect
    
    //res.end("Match successful!!");
   
  }
  else{
    res.end("Invalid URL");
  }
});

//Homepage
app.get("/*",function(req,res){
  var testurl=su+req.url;
  //find if url exist
    //connect to db
    mongo.connect(dburl,function(err,db){
      if(err)console.error(err);
      else{
        var col=db.collection('urls');
        col.find({
          'short_url':testurl
        }).toArray(function(err,list){
          if(err)console.error(err);
          else{
            if(list.length==1){
              //res.writeHead();
              var redirect=list[0].original_url;
              //console.log(redirect);
              res.redirect(redirect);
              db.close();
            }
            else{
              res.end(page);
              db.close();
            }
          }
        })
      }
    })
}).listen(process.env.PORT || 8080);