var catArray = [];

catArray.push('Architecture');
catArray.push('Bike Rack');
catArray.push('Computer Cluster');
catArray.push('Fun');
catArray.push('Lab');
catArray.push('MIT History');
catArray.push('Other');
catArray.push('Painting');
catArray.push('Quick Food');
catArray.push('Restaurant');
catArray.push('Service');
catArray.push('Sculpture');

var catArrayND = [];
catArrayND.push('Camera');
var usedArray = [];

function changeCategory(curNonceInfo) {
	var tempPinMarker = createGMarker(curNonceInfo['target'].point, curNonceInfo['category']);
	tempPinMarker.space = {};
	tempPinMarker.space.name = curNonceInfo['nonce'];

	var shouldOverlay = false;
	
	if (document.getElementById("showRecent").checked) {
		shouldOverlay = true;
	}

	map.removeOverlay(curNonceInfo['target']);
	map.addOverlay(tempPinMarker);

	curNonceInfo['target'].space.name = "removed";
	curNonceInfo['target'] = tempPinMarker;

	addNewPoint(curNonceInfo['target']);

	if ((curNonceInfo['recent']) && (!shouldOverlay)) {
		map.removeOverlay(tempPinMarker);
	}
	else {
		openMarkerInfo(tempPinMarker.space.name);
	}
}

function updateRecent() {
	var numRecords;
	if (document.getElementById("showRecent").checked) {
		numRecords = addRecentItems();
			
		if (numRecords == 0) {
			outputMessage("You haven't added/edited any items.");
		}
		else if (numRecords == 1) {
			outputMessage("Displayed " + numRecords + " item you've added/edited");
		}
		else {
			outputMessage("Displayed " + numRecords + " items you've added/edited");
		}
	}
	else {
		var updateCatArray = [];
		updateCatArray.push("Items I\'ve Added");
		numRecords = removeCategories(updateCatArray);
		if (numRecords == 0) {
			outputMessage("You haven't added/edited any items.");
		}
		else if (numRecords == 1) {
			outputMessage("Removed " + numRecords + " item you've added/edited");
		}
		else {
			outputMessage("Removed " + numRecords + " items you've added/edited");
		}
	}
}

function addRecentItems() {
	var count = 0;
	for (var i = 0;i<nonceArray.length;i++) {
		if ((nonceInfoArray[nonceArray[i]]['recent']) && (!nonceInfoArray[nonceArray[i]]['isTack'])) {
			if (!nonceInfoArray[nonceArray[i]]['displayed']) {
				var tempPinMarker = createGMarker(nonceInfoArray[nonceArray[i]]['target'].point, nonceInfoArray[nonceArray[i]]['category']);

				tempPinMarker.space = {};
				tempPinMarker.space.name = nonceInfoArray[nonceArray[i]]['nonce'];

				map.addOverlay(tempPinMarker);
				addNewPoint(tempPinMarker);
				nonceInfoArray[nonceArray[i]]['target'] = tempPinMarker;
				nonceInfoArray[nonceArray[i]]['displayed'] = true;
				count++;
			}
		}
	}	
	return count;
}

function updateCategories(obj){
	if (obj == null)
		return 0;
	var category = String(obj.id);
	if (category == 'addAll') {
		category = 'all';
	}
	outputMessage("");
	var updateCatArray = [];
	var newusedArray = [];
	var i;
	var j;
	var inArray = false;
	var numRecords;
	var record;
	var row;
	var tempPinMarker;
	var onMap = false;
	var parseObj = function (result) {		
		WikiObj.addObjsResult(result,true,nonceArray);
	};
	
	var counter = 0;
	for (i=0;i<usedArray.length;i++){
		if (usedArray[i] == category) {
			inArray = true;
		}
		else {
			newusedArray[counter] = usedArray[i];
			counter++;
		}
	}
	
	if ((category != 'removeAll') && (!inArray)) {
		if (category == 'Items I\'ve Added') {
			var numRecords = addRecentItems();
				
			if (numRecords == 0) {
				outputMessage("You haven't added/edited any items.");
			}
			else if (numRecords == 1) {
				outputMessage("Displayed " + numRecords + " item you've added/edited");
			}
			else {
				outputMessage("Displayed " + numRecords + " items you've added/edited");
			}
		}
		else if (category != '') {
			if (category == 'all') {
				usedArray = catArray;
				for (i=0;i<catArray.length;i++) {
					var tempCat = String(catArray[i]);
					document.getElementById(tempCat).className = 'catButtonD';
				}
			}
			else {
				usedArray.push(category);
				document.getElementById(category).className = 'catButtonD';
			}
			Agent('handleSearch.php?type=wikis&category=' + category, parseObj, []);
		}
	}
	else {
		if (category == 'removeAll') {
			usedArray = [];
			for (i=0;i<catArray.length;i++) {
				var tempCat = String(catArray[i]);
				document.getElementById(tempCat).className = 'catButton';
			}
			resetObjs();
			numRecords = removeCategories(catArray);
		}
		else {
			updateCatArray.push(category);
			usedArray = newusedArray;
			document.getElementById(category).className = 'catButton';
			numRecords = removeCategories(updateCatArray);
		}
		
		if (numRecords == 0) {
			outputMessage("No items to remove from the map.");
		}
		else if (numRecords == 1) {
			outputMessage("Removed " + numRecords + " item from the map");
		}
		else {
			outputMessage("Removed " + numRecords + " items from the map");
		}
	}

	populateLists();
	return numRecords;
}

function removeCategories(updateCatArray) {
	var newNonceArray = [];
	var curNonceInfo;
	var removedCategory;
	var counter = 0;

	for (var i=0;i<nonceArray.length;i++) {
		curNonceInfo = nonceInfoArray[nonceArray[i]];
		removedCategory = null;
		if (curNonceInfo['recent']) {
			for (var j=0;j<updateCatArray.length;j++) {
				if (updateCatArray[j] == 'Items I\'ve Added') {
					removedCategory = updateCatArray[j];
				}
			}
		}
		else {
			for (var j=0;j<updateCatArray.length;j++) {
				if (curNonceInfo['category'] == updateCatArray[j]) {
					removedCategory = updateCatArray[j];
				}
			}
		}
		
		if (removedCategory == null) {
			newNonceArray.push(nonceArray[i]);
		}
		else {
			if (removedCategory == 'Items I\'ve Added') {
				newNonceArray.push(nonceArray[i]);
				if (!curNonceInfo['isTack']) {
					curNonceInfo['displayed'] = false;
					map.removeOverlay(curNonceInfo['target']);
					if (nonceArray[i] == activeNonce) {
						map.closeInfoWindow();
					}
					counter++;		
				}
			}
			else {
				//if (curNonceInfo['countLinks'] > 1) {
				//	curNonceInfo['countLinks'] = curNonceInfo['countLinks'] - 1;
				//	newNonceArray.push(nonceArray[i]);					
				//}
				//else {
					if (curNonceInfo != null) {
						map.removeOverlay(curNonceInfo['target']);
						if (nonceArray[i] == activeNonce)
							map.closeInfoWindow();
						nonceInfoArray[nonceArray[i]] = null;
						WikiObj.removeNonceMapping(nonceArray[i]);
						counter++;
					}
				//}		
			}
		}
	}
	nonceArray = newNonceArray;
	return counter;
}

function populateLists() {
	if (usedArray.length == 0) {
		document.getElementById('removeAll').disabled = true;
	}
	else {
		document.getElementById('removeAll').disabled = false;
	}
	
	if (usedArray.length == catArray.length) {
		document.getElementById('addAll').disabled = true;
	}
	else {
		document.getElementById('addAll').disabled = false;
	}
}