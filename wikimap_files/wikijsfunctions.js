function submitenter(nonce,myfield,e) {
	var keycode;
	if (window.event) {
		keycode = window.event.keyCode;
	}
	else if (e) {
		keycode = e.which;
	}
	else {
		return true;
	}
	
	if (keycode == 13) {
		dataio=document.getElementById("formfield"+nonce);
		selectLocation(nonce,dataio.value);
		return false;
	}
	else {
	   return true;
	}
}

function selectLocation(nonce,location) {

	if (totalRows > 5) {
		openMarkerInfo(nonce);
	}

	var defaultPopup = String("defaultPopup" + nonce);
	var editPopup = String("editPopup" + nonce);
	var initPopup = String("initPopup" + nonce);
	var itemLocation = String("itemLocation" + nonce);
	var itemLocationE = String("itemLocationE" + nonce);
	
	document.getElementById(itemLocation).innerHTML = location;	
	document.getElementById(itemLocationE).innerHTML = location;
	document.getElementById(defaultPopup).style.display = 'none';
	document.getElementById(editPopup).style.display = '';
	document.getElementById(initPopup).style.display = 'none';

	var itemCategoryE = String("itemCategoryE" + nonce);
	var i;
	for (i=0;i<document.getElementById(itemCategoryE).options.length;i++) {
		if (document.getElementById(itemCategoryE).options[i].value == nonceInfoArray[nonce]['categoryE']) {
			document.getElementById(itemCategoryE).selectedIndex = i;
		}
	}
	
	nonceInfoArray[nonce]['gpointxE'] = nonceInfoArray[nonce]['target'].point.x;
	nonceInfoArray[nonce]['gpointyE'] = nonceInfoArray[nonce]['target'].point.y;	
	nonceInfoArray[nonce]['locationE'] = location;
}

function keepLocation(nonce) {
	nonceInfoArray[nonce]['target'].point.x = nonceInfoArray[nonce]['gpointx'];
	nonceInfoArray[nonce]['target'].point.y = nonceInfoArray[nonce]['gpointy'];
	nonceInfoArray[nonce]['target'].redraw(true);

	openMarkerInfo(nonce);

	var defaultPopup = String("defaultPopup" + nonce);
	var editPopup = String("editPopup" + nonce);
	var initPopup = String("initPopup" + nonce);

	document.getElementById(defaultPopup).style.display = 'none';
	document.getElementById(editPopup).style.display = '';
	document.getElementById(initPopup).style.display = 'none';

	var itemCategoryE = String("itemCategoryE" + nonce);
	var i;
	for (i=0;i<document.getElementById(itemCategoryE).options.length;i++) {
		if (document.getElementById(itemCategoryE).options[i].value == nonceInfoArray[nonce]['categoryE']) {
			document.getElementById(itemCategoryE).selectedIndex = i;
		}
	}
	correctMozillaBug();
}

function updateEdit(nonce) {
	var curNonceInfo = nonceInfoArray[nonce];
	curNonceInfo['nameE'] = document.getElementById(String("itemNameE" + nonce)).value;
	curNonceInfo['locationE'] = document.getElementById(String("itemLocationE" + nonce)).innerHTML;
	curNonceInfo['categoryE'] = document.getElementById(String("itemCategoryE" + nonce)).value;
	//curNonceInfo['imagelocE'] = document.getElementById(String("itemImagesE" + nonce)).value;
	curNonceInfo['descriptionE'] = document.getElementById(String("itemDescriptionE" + nonce)).value;
}

function cancelEdit(nonce) {
	var curNonceInfo = nonceInfoArray[nonce];
	if (curNonceInfo['isTack']) {
		map.removeOverlay(curNonceInfo['target']);
		map.closeInfoWindow();
		var newNonceArray = [];
		for (var i=0;i<nonceArray.length;i++) {
			if (nonceArray[i] != nonce) {
				newNonceArray.push(nonceArray[i]);
			}
		}
		nonceArray = newNonceArray;
		nonceInfoArray[nonce] = null;
	}
	else {
		curNonceInfo['editable'] = false;
		curNonceInfo['nameE'] = curNonceInfo['name'];
		curNonceInfo['locationE'] = curNonceInfo['location'];
		curNonceInfo['gpointxE'] = curNonceInfo['gpointx'];
		curNonceInfo['gpointyE'] = curNonceInfo['gpointy'];
		curNonceInfo['categoryE'] = curNonceInfo['category'];
		//curNonceInfo['imagelocE'] = curNonceInfo['imageloc'];
		curNonceInfo['descriptionE'] = curNonceInfo['description'];
		map.closeInfoWindow();	

		nonceInfoArray[nonce]['target'].point.x = curNonceInfo['gpointx'];
		nonceInfoArray[nonce]['target'].point.y = curNonceInfo['gpointy'];
		nonceInfoArray[nonce]['target'].redraw(true);

		curNonceInfo['target'].disableDragging();
		openMarkerInfo(nonce);
		
		var defaultPopup = String("defaultPopup" + nonce);
		var editPopup = String("editPopup" + nonce);
		document.getElementById(defaultPopup).style.display = '';
		document.getElementById(editPopup).style.display = 'none';
	}
}

function requestDeletion(nonce) {
	var useremail = document.getElementById("useremail").value;
	while (useremail == 'none') {	
		useremail = prompt("Please enter your email address (only mit.edu). This is required in order to request an object as inappropriate/incorrect, though you only need to enter once for this session.","");
		if (useremail == null)
			return;
		while (useremail.substr(useremail.length - 7, useremail.length) != 'mit.edu') {
			useremail = prompt("The email address you entered does not end in \"mit.edu\". Please re-enter.","");
		}
		document.getElementById("useremail").value = useremail;
	}

	var parseObj = function (result) {		
		var xmlDoc = result.responseXML.documentElement;
		var row = xmlDoc.getElementsByTagName("record").item(0);
		
		if (row.getAttribute("ret") == 'success') {
			outputMessage("Item successfully suggested as inappropriate/incorrect.");
		}
		else {
			outputMessage("There was an error requesting this item as inappropriate/incorrect.");
		}
	};
		
	var url = String("wikirequestdeletion.php?email=" + useremail + "&nonce=" + nonce);

   	Agent(url, parseObj, []);
}

function showInitPopup(nonce) {
	var defaultPopup = String("defaultPopup" + nonce);
	var editPopup = String("editPopup" + nonce);
	var initPopup = String("initPopup" + nonce);
	document.getElementById(defaultPopup).style.display = 'none';
	document.getElementById(editPopup).style.display = 'none';
	document.getElementById(initPopup).style.display = '';
	locationBubble(nonceInfoArray[nonce]['target']);
}

function editData(nonce) {
	var defaultPopup = String("defaultPopup" + nonce);
	var editPopup = String("editPopup" + nonce);
	var itemCategoryE = String("itemCategoryE" + nonce);
	document.getElementById(defaultPopup).style.display = 'none';
	document.getElementById(editPopup).style.display = '';

	var i;	
	for (i=0;i<document.getElementById(itemCategoryE).options.length;i++) {
		if (document.getElementById(itemCategoryE).options[i].value == nonceInfoArray[nonce]['categoryE']) {
			document.getElementById(itemCategoryE).selectedIndex = i;
		}
	}
	if (!nonceInfoArray[nonce]['editable']) {		
		nonceInfoArray[nonce]['editable'] = true;
		nonceInfoArray[nonce]['target'].enableDragging();
		correctMozillaBug();
	}
}

function addData(nonce,point) {
	var defaultPopup = String("defaultPopup" + nonce);
	var editPopup = String("editPopup" + nonce);
	var itemNameE = document.getElementById(String("itemNameE" + nonce)).value;
	var itemLocationE = document.getElementById(String("itemLocationE" + nonce)).innerHTML;
	var itemCategoryE = document.getElementById(String("itemCategoryE" + nonce)).value;
	var itemImagesE = '';//document.getElementById(String("itemImagesE" + nonce)).value;
	var itemDescriptionE = document.getElementById(String("itemDescriptionE" + nonce)).value;
	
	var gpointArray = point.split(",");
	var itemGPointX = gpointArray[0].substr(1);
	var itemGPointY = gpointArray[1].substr(0,gpointArray[1].length-1);
	
	var useremail = document.getElementById("useremail").value;
	while (useremail == 'none') {	
		useremail = prompt("Please enter your email address (only mit.edu). Check for an email in your inbox that will validate all changes you make in this session.","");
		if (useremail.toLowerCase() != 'cagis') {
			while (useremail.substr(useremail.length - 7, useremail.length) != 'mit.edu') {
				useremail = prompt("The email address you entered does not end in \"mit.edu\". Please re-enter.","");
			}
		}
		else {
			useremail = useremail.toLowerCase();
		}
		
		document.getElementById("useremail").value = useremail;
	}

	var parseObj = function (result) {		
		var xmlDoc = result.responseXML.documentElement;
		var row = xmlDoc.getElementsByTagName("record").item(0);
		
		if (row.getAttribute("ret") == 'success') {
			document.getElementById(String("itemName" + nonce)).innerHTML = itemNameE;
			document.getElementById(String("itemLocation" + nonce)).innerHTML = itemLocationE;
			document.getElementById(String("itemCategory" + nonce)).innerHTML = itemCategoryE;
			//if (itemImagesE == '')
			//	document.getElementById(String("itemImages" + nonce)).innerHTML = '0 Images';
			//else
			//	document.getElementById(String("itemImages" + nonce)).innerHTML = '1 Images';
			document.getElementById(String("itemDescription" + nonce)).innerHTML = itemDescriptionE;
						
			document.getElementById(defaultPopup).style.display = '';
			document.getElementById(editPopup).style.display = 'none';
						
			var curNonceInfo = nonceInfoArray[nonce];
			curNonceInfo['editable'] = false;
			curNonceInfo['recent'] = true;
			curNonceInfo['name'] = curNonceInfo['nameE'];
			curNonceInfo['location'] = curNonceInfo['locationE'];
			curNonceInfo['gpointx'] = curNonceInfo['gpointxE'];
			curNonceInfo['gpointy'] = curNonceInfo['gpointyE'];
			curNonceInfo['imageloc'] = curNonceInfo['imagelocE'];
			curNonceInfo['description'] = curNonceInfo['descriptionE'];

			if (curNonceInfo['category'] != curNonceInfo['categoryE']) {
				curNonceInfo['category'] = curNonceInfo['categoryE'];
				changeCategory(nonceInfoArray[nonce]);
			}
			if (curNonceInfo['isTack']) {
				curNonceInfo['isTack'] = false;
			}
			
			curNonceInfo['target'].disableDragging();
			outputMessage("Item successfully saved.");
		}
		else {
			outputMessage("Save failed.");
		}
	};
		
	var url = String("wikisaveobjproc.php?email=" + useremail + "&nonce=" + nonce + "&name=" + itemNameE + "&location=" + itemLocationE + "&gpointx=" + itemGPointX + "&gpointy=" + itemGPointY + "&category=" + itemCategoryE + "&image=" + itemImagesE + "&description=" + itemDescriptionE);

   	Agent(url, parseObj, []);
}