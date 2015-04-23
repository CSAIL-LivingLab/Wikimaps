var allowHighlight = true;

function mouseOverPlusMinus(space,myfield) {
	allowHighlight = false;
	myfield.style.cursor = 'pointer';
}

function mouseOutPlusMinus(myfield) {
	allowHighlight = true;
	myfield.style.cursor = 'default';
}

function expandBranch(space,type) {
	var alreadyThere = false;
	for(i = 0;i<hiddenArray.length;i++) {
		if (hiddenArray[i] == String("br" + space)) {
			document.getElementById(hiddenArray[i]).style.display = "";
			alreadyThere = true;
		}
	}
	
	var plusminusHTML = '';
	
	if (alreadyThere) {
		plusminusHTML = document.getElementById("pm" + space).innerHTML;
		plusminusHTML = plusminusHTML.replace("nolines_plus","nolines_minus");
		plusminusHTML = plusminusHTML.replace("expand","hide");
		document.getElementById("pm" + space).innerHTML = plusminusHTML;
		lastresponse = document.getElementById("dropdown").innerHTML;
		document.getElementById("dropdown").style.display = "";
	}
	else {
		var expandDiv = function (result) {
			document.getElementById("dropdown").innerHTML = lastresponse;
			document.getElementById("br" + space).innerHTML = result.responseText;

			plusminusHTML = document.getElementById("pm" + space).innerHTML;
			plusminusHTML = plusminusHTML.replace("nolines_plus","nolines_minus");
			plusminusHTML = plusminusHTML.replace("expand","hide");
			document.getElementById("pm" + space).innerHTML = plusminusHTML;
			lastresponse = document.getElementById("dropdown").innerHTML;
			document.getElementById("dropdown").style.height = "300px";
			document.getElementById("dropdown").style.display = "";
		}
		Agent("dropdown/expandHeirarchy.php?space="+space+"&type="+type, expandDiv, []);
	}
}

var hiddenArray = [];
var expandArray = [];
function hideBranch(space,type) {
	document.getElementById("br" + space).style.display = "none";
	hiddenArray.push("br" + space);
	var plusminusHTML = document.getElementById("pm" + space).innerHTML;
	plusminusHTML = plusminusHTML.replace("nolines_minus","nolines_plus");
	plusminusHTML = plusminusHTML.replace("hide","expand");
	document.getElementById("pm" + space).innerHTML = plusminusHTML;
	lastresponse = document.getElementById("dropdown").innerHTML;
	//prompt("",plusminusHTML);
	document.getElementById("dropdown").style.display = "";
}


function showDropDown() {
	document.getElementById("dropdown").innerHTML = lastresponse;
	document.getElementById("dropdown").style.display = "";
}

function hideDropDownNow() {
     document.getElementById("dropdown").innerHTML = "";
     document.getElementById("dropdown").style.display = "none";
}

function hideDropDown() {

    var async = function() {
		document.getElementById("dropdown").innerHTML = "";
		document.getElementById("dropdown").style.display = "none";
    }

	window.setTimeout(async, 200);

}

function submitarrow(myfield,e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if (keycode == 40) {
		return true;
	}
	else
	   return false;
}

function setformfield(name,drilldown) {
	document.getElementById("formfield").value = name;
	hideDropDownNow();

	lasttoken = document.getElementById("formfield").value;
}

function hideDropDown() {

    var async = function() {
		document.getElementById("dropdown").innerHTML = "";
		document.getElementById("dropdown").style.display = "none";
    }

	window.setTimeout(async, 200);

}

var lasttoken = '';
var lastresponse = '';
var responseHeight = 0;
function queryDB(token,myfield,e) {

	if (token == "") {
		hideDropDown();
		return;
	}
	
	if (token != lasttoken) {
		hiddenArray = [];
		fireAgent(token);
	}
	else if	(submitarrow(myfield,e)) {
		showDropDown();
		responseHeight = document.getElementById("totalResponse").style.height;
		
		var responseHeightNum = responseHeight.substring(0,responseHeight.indexOf("p"));

		responseHeightNum = Number(responseHeightNum) + 5;	
			
		document.getElementById("dropdown").style.height = String(responseHeightNum + "px");
	}
}

function fireAgent(token) {
	document.getElementById("dropdown").innerHTML = "<div class='linkout'>Loading matches..</div>";
	document.getElementById("dropdown").style.display = "";
	
	var type = document.getElementById("select_formfield").value;
	//prompt("","returnMatches.php?space="+token+"&type="+type);

	// Agent("dropdown/returnMatches.php?space="+token+"&type="+type, parseResult, []);
		
	lasttoken = token;
}

function parseResult(result) {
	lastresponse = result.responseText;
	document.getElementById("dropdown").innerHTML = result.responseText;
	responseHeight = document.getElementById("totalResponse").style.height;

	var responseHeightNum = responseHeight.substring(0,responseHeight.indexOf("p"));

	responseHeightNum = Number(responseHeightNum) + 5;	
		
	document.getElementById("dropdown").style.height = String(responseHeightNum + "px");

	document.getElementById("dropdown").style.display = "";
}