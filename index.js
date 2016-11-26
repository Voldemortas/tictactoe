'use strict';
const http = require('http');
const express = require('express');
const fs = require('fs');
const app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
//app.use(express.static(__dirname));
app.post('/', function(req, res){
    fs.readFile(__dirname + '/data.json', function(err, data) {
        const json = JSON.parse(data.toString());
        if (req.body.start == 'Yes') {
            var r2;
            let r1 = Math.floor(Math.random() * 1000);
            do {
                r2 = Math.floor(Math.random() * 1000)
            }
            while (r1 == r2);//*/
            fs.writeFile(__dirname + '/data.json', '{"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0,' +
                ' "started": "true", "p1": "' + r1 + '", "p2": "' + r2 + '", "turn": '+json.turn+'}', function () {
                res.send('<a href="play.html?player=' + r1 + '">Player1</a> <a href="play.html?player=' + r2 + '">Player2</a>' +
                    '<br />Turn for player' + json.turn);
            });
        } else if (req.body.action >= 0 && req.body.action < 9 && req.body.player == json['p'+json.turn]) {
            if(json[req.body.action] == 0) {
                json[req.body.action] = req.body.player;
                json.turn = json.turn%2+1;
                fs.writeFile(__dirname + '/data.json', JSON.stringify(json), function () {
                    res.send('{"Success": "true", "action_taken": "true", "turn": '+json.turn+'}');
                })
            }else{
                res.send('{"Success": "true", "action_taken": "false", "turn": '+json.turn+'}');
            }
        } else {
            res.send('{"Success": "true", "action_taken": "false", "turn": '+json.turn+'}');
        }
    });
});
app.get('/', function (req, res) {
    fs.readFile(__dirname + '/data.json', function(err, data){
        let json = JSON.parse(data.toString());
        if(json.started == "false"){
            res.send('Do you want to start the game? ' +
                '<form action="" method="post"><input name="start" type="submit" value="Yes" /></form>');
        }else{
            res.redirect('result.html');
        }
    });
});
app.get('/restart', function (req, res) {
    fs.writeFile(__dirname + '/data.json', '{"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0,' +
        ' "started": "false", "p1": "", "p2": "", "turn": '+Math.floor((Math.random() * 2) + 1)+'}', function(){
        res.redirect('/');
    });
});
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, '0.0.0.0', function () {
    fs.writeFile(__dirname + '/data.json', '{"0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0,' +
        ' "started": "false", "p1": "", "p2": "", "turn": '+Math.floor((Math.random() * 2) + 1)+'}', function(){
        console.log("Example app listening at http://localhost:%s", port);
    });
});