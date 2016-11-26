/**
 * Created by Simanaitis on 2016-10-27.
 */
"use strict";
const signs = ['×', 'o'];
let turn = 0;
let tiles = [];
let tile = function(id){
    this.id = id;
    this.filled = "";
    this.click = function(filed, char = signs[turn]){
        if(this.filled == ""){
            add(id, char);
            this.filled = char;
            game.clearRect(200, 320, 200, 200);
            game.font = "20px Arial";
            game.fillText(signs[Math.abs(turn-1)] + " ėjimas", 200, 335);
            if(check(char)){
                toast('Laimėjo ' + char);
                disable();
                game.clearRect(200, 320, 200, 200);
                game.font = "20px Arial";
                game.fillText("Laimėjo " + char, 200, 335);
            }
            turn = Math.abs(turn-1);
        }else{
            toast("Veiksmas negalimas!");
        }
    }
}
let canvas = document.getElementById('canvas');
canvas.addEventListener('click', clicked, false);
let game = canvas.getContext("2d");
canvas.width = 350;
canvas.height = 350;
game.globalAlpha = 1;
game.strokeStyle = "white";
game.fillStyle = "white";
function init() {
    game.clearRect(0, 0, 350, 350);
    grid();
    for (let i = 0; i < 3; i++) {
        tiles[i] = [];
        for(let j = 0; j < 3; j++){
            tiles[i][j] = new tile(i*3+j);
        }
    }
    game.stroke();
    game.font = "20px Arial";
    game.fillText("Restart", 20, 335);
    game.fillText(signs[turn]+" ėjimas", 200, 335);
    getInfo(location.hash.split('#')[1]);
}
function grid(){
    for (let i = 0; i < 4; i++) {
        game.moveTo(25, i * 100 + 5);
        game.lineTo(325, i * 100 + 5);
        game.moveTo(i * 100 + 25, 5);
        game.lineTo(i * 100 + 25, 305);
    }
    grid = function(){};
}
function add(location, char){
    game.font = "60px Arial";
    game.fillText(char, (location%3)*100+60, parseInt(location/3)*100+70);
    game.fill();
}
function clicked(e) {
    if(!(e.x < 32 && e.y < 32) && (e.x < 318 && e.y < 318)){
        tiles[parseInt((e.y-32)/100)][parseInt((e.x-32)/100)].click();
    }
    if(e.offsetX > 21 && e.offsetY > 320 && e.offsetX < 85 && e.offsetY < 335){
        init();
    }
}
function getInfo(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let temp = JSON.parse(this.responseText);
            for(let i = 0; i < 9; i++){
                if(temp[i] != 0) {
                    tiles[i].click(tiles[i].filled, temp[i]);
                }
            }
        }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}
function check(char){
    for(let i = 0; i < 3; i++){
        if((tiles[i][0].filled == char && tiles[i][1].filled == char && tiles[i][2].filled == char)||
            (tiles[0][i].filled == char && tiles[1][i].filled == char && tiles[2][i].filled == char)){
            console.log(i);
            return true;
        }
    }
    return ((tiles[0][0].filled == char && tiles[1][1].filled == char && tiles[2][2].filled == char)||
    (tiles[0][2].filled == char && tiles[1][1].filled == char && tiles[2][0].filled == char));
}
function disable(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(tiles[i][j].filled == ''){
                tiles[i][j].filled = ' ';
            }
        }
    }
}
function toast(text) {
    var x = document.getElementById("toast");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
init();