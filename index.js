const express = require("express");
const https = require("https");
const bodyparser = require("body-parser")
const app = express();

app.use(bodyparser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
  
 })

    
app.post("/",function(req,res){

   
    const query = req.body.CITYNAME
    const appid ="852fcb48896bfea410571a47e070e8c4"
    const units = "metric"
    const url=  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units 

       https.get(url,function(response){
        console.log(response.statusCode)
    
        response.on("data",function(data){
            
            const weather= JSON.parse(data)
            const temp= weather.main.temp
            const icon=weather.weather[0].icon
           const imgurl= " https://openweathermap.org/img/wn/"+ icon +"@2x.png"
           const desp = weather.weather[0].description 
          res.write("<h1> the tempreture in "+query+" is "+temp+"degree celsius. </h1>")
          res.write("<h1> the weather in "+query+" is  "+desp+". </h1>")
          res.write("<img src = "+imgurl+">");
          res.send()
})
})
})
 



app.listen(3000,function(){
    console.log("the server is running on port 3000")
})