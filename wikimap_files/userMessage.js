var msgNum = 0;
function outputMessage(x) {
	document.getElementById('userMessage').innerHTML = x;
	msgNum++;
	hideMessage(msgNum);	
}

function hideMessage(num) {
    var async = function() {
		if (msgNum == num) {
			document.getElementById("userMessage").innerHTML = "";
		}
    };
	window.setTimeout(async, 10000);
}