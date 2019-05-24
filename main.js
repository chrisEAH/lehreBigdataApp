var MongoClient = require('mongodb').MongoClient;

config={
	"host":"10.81.41.71",
	"port":"9999",
	"db":"bigChart",
    "user":"user",
    "pass":"passwort",
    "collectionMitTempFrameIndex":"collectionMitTempFrameIndex",
    "collectionMitTempIndex":"collectionMitTempIndex",
    "collectionMitFrameIndex":"collectionMitFrameIndex",
    "collectionOhneIndex":"collectionOhneIndex"
}

var collection=config.collectionOhneIndex;

MongoClient.connect("mongodb://"+config.host+":"+config.port, { useNewUrlParser: true}, function(err, db){  
    if(err){ console.log( err);}  
    else{
        var dbObject=db.db(config.db);
        dbObject.collection(collection).find({frame:280}).sort({temp:-1}).toArray(function(err, res){
            
            console.log(res[0]);

            dbObject.collection(collection).find({frame:280}).sort({temp:-1}).explain(function(err, data){
                console.log(data.executionStats.executionTimeMillis);
                db.close();
            });
        });
    }
}); 