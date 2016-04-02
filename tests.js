var mongo = require("mongodb").MongoClient;
var dburl = 'mongodb://localhost:27017/urlDB';

mongo.connect(dburl,function(err,db){
    if(err)console.error(err);
    else{
        //console.log("We are connected!!");
        var col=db.collection('urls');
        
        //count otal entries
        col.count({},function(err,data){
            if(err)console.error(err);
            else{
                console.log("Total entries: "+data);
            }
        });//eof count
        
        //list all entries
        col.find().toArray(function(err,list){
            if(err)console.error(err);
            else{
                console.log(list);
                db.close();
            }
        });//eof list entries
        
        
        //remove all entries
        //col.remove();
    }
});