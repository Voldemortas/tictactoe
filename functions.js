'use strict';
function init(){
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			draw(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", "data.json", true);
	xhttp.send();
}
function draw(arr){
	let string = '<table border="1">';
	for(let i = 0; i < 3; i++){
		string += '<tr>';
		for(let j = 0; j < 3; j++){
			string += '<td>'+arr[i*3+j]+'</td>';
		}
		string += '</td>';
	}
	string += '</table>';
	document.getElementById('game').innerHTML = string;
}