const express = require('express');
var path = require('path');
//var bodyParser = require('body-parser');
var http = require('http');
const app = express();
app.use("/static",express.static('./static'));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));
// app.use(express.static("mainpagee"));
app.get('/',function(req,res){
    res.sendFile("index.html", {root: path.join(__dirname)});
    
    //res.send(":DDDDDDDDDDDDDDDD");

})

app.listen(5500,"0.0.0.0",function(){
    console.log("Hosting....");
});


// http.createServer(app).listen(3000); 