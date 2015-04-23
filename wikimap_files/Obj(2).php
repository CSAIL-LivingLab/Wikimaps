function EquipObj() {
	var self = this;
	this.objs = [];
		
	this.openMarkerInfo = function (curNonce) {
		var divOutput = '';
		var curNonceInfo = nonceInfoArray[curNonce];
		activeNonce = curNonce;
		divOutput += "<div id='initPopup"+curNonce+"' name='initPopup"+curNonce+"' class='popup' style='display:none;position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>"+"<\/div>";
		curNonceInfo['target'].openInfoWindowHtml(spanCanvas(10+ieCor,40,divOutput));
	}
 
 	this.resetObjs = function(force) {
		for (var i=0;i<this.objs.length;i++) {
			if ((!force) && (nonceInfoArray[this.objs[i]]['countLinks'] > 1)) {
				nonceInfoArray[this.objs[i]]['countLinks'] = nonceInfoArray[this.objs[i]]['countLinks'] - 1;
			}
			else {
				map.removeOverlay(nonceInfoArray[this.objs[i]]['target']);
				if (this.objs[i] == activeNonce)
					map.closeInfoWindow();
				nonceInfoArray[this.objs[i]] = null;
			}
		}
		this.objs = [];
	}

	this.removeNonceMapping = function(nonce) {
		var newNonceArray = [];
		var curNonceInfo;
	
		for (var i=0;i<this.objs.length;i++) {
			if (this.objs[i] == nonce) {
				if (nonceInfoArray[this.objs[i]] != null) {
					curNonceInfo = nonceInfoArray[this.objs[i]];
					if (!curNonceInfo['isTack']) {
						newNonceArray.push(this.objs[i]);
						curNonceInfo['displayed'] = false;
						map.removeOverlay(curNonceInfo['target']);
						if (this.objs[i] == activeNonce)
							map.closeInfoWindow();
					}
					else {
						map.removeOverlay(curNonceInfo['target']);
						if (this.objs[i] == activeNonce)
							map.closeInfoWindow();
						nonceInfoArray[this.objs[i]] = null;		
					}
				}
			}
			else {
				newNonceArray.push(this.objs[i]);
			}
		}
		this.objs = newNonceArray;
	}
    
	this.addObjsResult = function (result,noCenterZoomMap,otherArray){
		outputMessage("");
		var i;
		var j;
		var inArray = false;
		var record;
		var row;
		var marker;	
		var minX = -1;
		var maxX = -1;
		var minY = -1;
		var maxY = -1;
		var gpointx = 0;
		var gpointy = 0;
		var category = 'unknown';
		var nonce = 'unknown';
		var nonceMapping = {};
						
		var xmlDoc = result.responseXML.documentElement;
		var numRecords = xmlDoc.getElementsByTagName("record").length;
		var type = xmlDoc.getElementsByTagName("type").item(0);
		if (type != null) {
			type = type.getAttribute("name");
		}		
		
		if (numRecords == 0)
			outputMessage("No items to display.");
		else if (numRecords == 1)
			outputMessage("Displayed " + numRecords + " item on the map");
		else
			outputMessage("Displayed " + numRecords + " items on the map");
			
		for (i=0;i<numRecords;i++) {
			inArray = false;
			nonceMapping = {};
			record = xmlDoc.getElementsByTagName("record").item(i);
			nonce = record.getAttribute("id");
			
			if (otherArray) {
				for (j=0;j<otherArray.length;j++) {
					if (nonce == otherArray[j])
						inArray = true;
				}			
			}
			else {
				for (j=0;j<this.objs.length;j++) {
					if (nonce == this.objs[j])
						inArray = true;
				}
			}
			
			for (j=0;j<record.childNodes.length;j++) {
				if (record.childNodes[j].nodeName == 'gpointx') {
					gpointx = Number(record.childNodes[j].textContent);				
					nonceMapping['gpointx'] = gpointx;
					if ((minX > gpointx) || (minX == -1))
						minX = gpointx;
					
					if ((maxX < gpointx) || (maxX == -1))
						maxX = gpointx;
				}
				else if (record.childNodes[j].nodeName == 'gpointy') {
					gpointy = Number(record.childNodes[j].textContent);
					nonceMapping['gpointy'] = gpointy;
					if ((minY > gpointy) || (minY == -1))
						minY = gpointy;
					
					if ((maxY < gpointy) || (maxY == -1))
						maxY = gpointy;
				}
				else if (record.childNodes[j].nodeName == 'category') {
					category = record.childNodes[j].textContent;
				}
				else {
					if (record.childNodes[j].textContent == 'true') {
						nonceMapping[record.childNodes[j].nodeName] = true;
					}
					else if (record.childNodes[j].textContent == 'false') {
						nonceMapping[record.childNodes[j].nodeName] = false;
					}
					else {
						nonceMapping[record.childNodes[j].nodeName] = record.childNodes[j].textContent;
					}
				}
			}
			marker = createGMarker(new GPoint(gpointx,gpointy),category);
			marker.space = {};
			marker.space.name = nonce;

			if (!inArray) {
				if (otherArray) {
					otherArray.push(nonce);
				}
				else {
					this.objs.push(nonce);
				}
				nonceMapping['nonce'] = nonce;
				nonceMapping['type'] = type;				
				nonceMapping['category'] = category;
				nonceMapping['target'] = marker;
				nonceMapping['displayed'] = true;
				nonceMapping['displayIcon'] = true;
				//nonceMapping['editable'] = false;
				nonceMapping['isTack'] = false;
				nonceMapping['parentIcon'] = '';
			}
					
			var parseObj = function (result2) {		
				var xmlDoc2 = result2.responseXML.documentElement;
				var row = xmlDoc2.getElementsByTagName("record").item(0);
				
				if (row.getAttribute("ret") != 'success')
					outputMessage("There was an error saving session variables.");
			};
				
			var url = String("wikiaddsessionvars.php?nonce=" + nonce);
		
			Agent(url, parseObj, []);


			if (nonceInfoArray[nonce] == null) {
				nonceMapping['countLinks'] = 1;
				nonceInfoArray[nonce] = nonceMapping;
				map.addOverlay(marker);
				addNewPoint(marker);
				setZIndex(marker);				
			}
			else {
				nonceInfoArray[nonce]['countLinks'] = nonceInfoArray[nonce]['countLinks'] + 1;
				if (!nonceInfoArray[nonce]['displayed']) {
					map.addOverlay(marker);
					addNewPoint(marker);
					setZIndex(marker);
				}
			}
			
			//alert(nonceInfoArray[nonce]['countLink']);
		}

		if (!noCenterZoomMap) {
			if (numRecords > 1) {
				var spaceBounds = new GBounds();
	
				spaceBounds.minX = minX;
				spaceBounds.maxX = maxX;
				spaceBounds.minY = minY;
				spaceBounds.maxY = maxY;
					
				var xSpan = 1.2*(maxX - minX);
				var ySpan = 1.2*(maxY - minY);
				var span = new GSize(Math.abs(xSpan), Math.abs(ySpan));
		
				var center = spaceBounds.getCentroid();
				var zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);

				map.centerAndZoom(center, zoom);
			}
			else if (numRecords == 1) {
				map.centerAndZoom(marker.point, 9);
			}
			this.openMarkerInfo(marker.space.name);
		}
	}
};
var EquipObj = new EquipObj();