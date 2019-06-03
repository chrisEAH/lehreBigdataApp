var MongoClient = require('mongodb').MongoClient;

/*Es gibt 3 Collection, um mit einer zu arbeiten ersetzten Sie den Wert im Config.Objekt (Zeile 14)
Collections:
IndexId
IndexIdTemp
IndexIdTempFrame
*/

config={
	"host":"127.0.0.1",
	"port":"27017",
    "db":"bigChart",
    "collection":"IndexId"
}

MongoClient.connect("mongodb://"+config.host+":"+config.port, { useNewUrlParser: true}, function(err, db){  
    if(err){ console.log( err);}  
    else{
        var dbObject=db.db(config.db);
        var start=new Date();
        dbObject.collection(config.collection).find({}).sort({temp:-1}).limit(1).toArray(function(err, res){
            var dauer=new Date()-start;
            console.log("Collection: "+config.collection);
            console.log(res);
            console.log("Dauer in ms: "+dauer);
            db.close();
        });
    }
}); 