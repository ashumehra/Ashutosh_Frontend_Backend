var express = require("express");
var cors = require('cors');
const fs = require('fs');

var app = express();
app.use(cors());

let data = {};
const g=10;

// endpoint for getting bounce and points for the graph
app.get('/getgraph/:h1/:coe', (req, res, next)=> {
    let height = parseFloat(req.params.h1);
    let coe    = parseFloat(req.params.coe);
    let time = [];
    let heights = [];    
    let t1 = Math.sqrt((2*height)/g);
    let i=0,h1=0;

    for(i=0;i<=t1;i=i+0.1){
        h1 = height - (g*i*i)/2;
        time.push(i.toFixed(1));
        heights.push(h1);
    }
    let top = height;
    let telpased=0;
    let b=1;
    while(top>=0.1){
        let velo = Math.sqrt(2*g*top)*coe;
        top = top*(coe*coe);
        if(top<=0.1)
            break;
        else
            b+=1;
        telpased = telpased + i;
        i = 0;
        h1=0;
        while(h1<=top){
            if((velo*i-((g*i*i)/2))<0)
                break;
            h1 = Math.abs(velo*i - ((g*i*i)/2));
            time.push((telpased+i).toFixed(1));
            heights.push(h1);
            i=i+0.1;
        }
    }
    
    data["bounces"] = b;
    data["x"]=time;
    data["y"]=heights;
    data["coe"]=coe;
    data["height"]=height;
    data["id"]=Date.now();
    fs.readFile('result.json', (err, dt) => {
        if(err){  
            console.log(err);
        } else {
            if(!dt){  // if data doesnot exist in the file
                let res = [];
                res.push(data);
                fs.writeFile('result.json',JSON.stringify(res),(err) => {
                    if(err)
                        console.log(err);
                });
            } else { // if data exist in the file
                var json = JSON.parse(dt);
                console.log(json);
                json.push(data);
                fs.writeFile("result.json", JSON.stringify(json),(err) => {
                    if(err)
                        console.log(err);
                });
            }
        }
    });
    res.json(data); // return response
});

// endpoint for getting the previous data
app.get('/getdata', (req, res, next) => {
    fs.readFile('result.json', (err, dt) => {
        if(err){
            console.log(err);
        } else {
            res.json(JSON.parse(dt)); // return response
        }
    });
});

// invalid endpoint
app.get('*', (req, res) => {
    res.status(404).send('sorry, invalid request'); // If request are invalid
});

// server listeining on 3000 port
const server = app.listen(3000, () => {
    console.log(' !! listening on port %s !!', server.address().port);
});
