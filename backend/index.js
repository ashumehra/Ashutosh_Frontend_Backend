var express = require('express');
var cors = require('cors');
var app = express();
let data = { "x": [2,4,6,8,10,12,14,16], "y": [2,4,6,8,10,12,14,16]};
const g=10;
app.use(cors());

app.get('/getgraph/:h1/:coe', (req, res, next)=> {
    // res.send('arr '+ req.params.h1 + req.params.coe);
    let height = parseFloat(req.params.h1);
    let coe    = parseFloat(req.params.coe);
    console.log(height,coe);
    let time = []
    let heights = []
    let bounces = Math.round((Math.log10(height-coe)+2)/2)+1;
    
    let t1 = Math.sqrt((2*height)/g);
    let i=0,h1=0;
    for(i=0;i<=t1;i=i+0.1){
        h1 = height - (g*i*i)/2;
        time.push(i);
        heights.push(h1);
    }
    let top = height;
    let telpased=0;
    for(b=0;b<=bounces;b=b+1){
        let velo = Math.sqrt(2*g*top)/coe;
        top = top*(coe*coe);
        telpased = telpased + i;
        i = 0;
        while(h1<top){
            h1 = velo*i - (g*i*i)/2;
            time.push(telpased+i);
            heights.push(h1);
            i=i+0.1;
        }
        let currh = h1;
        telpased = telpased + i;
        i=0;
        while(h1>=0){
            h1 = currh  - (g*i*i)/2;
            if(h1<0)
                break;
            time.push(telpased+i);
            heights.push(h1);
            i=i+0.1;
        }
        top = currh;
        // telpased = telpased+i;
    }
    
    data["bounces"] = bounces;
    data["x"]=time;
    data["y"]=heights
    res.json(data);
    // calculation the return array
});


app.get('*', (req, res) => {
    res.send('sorry, invalid request');
});
app.listen(3000);