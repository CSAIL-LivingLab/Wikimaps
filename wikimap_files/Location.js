var locOutput = '';
var greensArray = [];
var parkingArray = [];
var landmarksArray = [];
var locReturn = 0;
var totalRows = 0;

function addLocationRow(nonce,name) {
	locOutput += "<tr><td>";
	locOutput += "<a href=\'#\' onClick=\'javascript:selectLocation(\"";
	locOutput += nonce;
	locOutput += "\",\"";
	locOutput += name;
	locOutput += "\")\'>";
	locOutput += name;
	locOutput += "<\/a><\/td><\/tr>";
	totalRows++;
}

function locationBubble(t) {
	locOutput = '';
	locReturn = 0;
	totalRows = 0;
	greensArray = [];
	parkingArray = [];
	landmarksArray = [];
	document.getElementById(String("initPopup" + t.space.name)).innerHTML = 'Loading location matches..';

   	var parseObjRooms = function (result) {		
		var xmlDoc = result.responseXML.documentElement;
		var ids = xmlDoc.getAttribute("ids");

		if (ids != null) {
			var roomDataArray = ids.split(",");
			var buildingArray;
			var building;
	
			if (roomDataArray.length > 0) {
				buildingArray = roomDataArray[0].split("-");
				if (buildingArray[0] != '') {
					building = String("Building " + buildingArray[0]);
					addLocationRow(String(t.space.name),building);
				}
			}
	
			if (roomDataArray.length > 0) {
				for (var i=roomDataArray.length - 1; i>=0; i--) {
					if (roomDataArray[i] != '') {
						addLocationRow(String(t.space.name),fixLocation(roomDataArray[i]));
					}
				}
			}
		}
		updateLocations(t);
	};
		
	var parseObjGreens = function (result) {		
		var xmlDoc = result.responseXML.documentElement;				
		var ids = xmlDoc.getAttribute("ids");
		
		if (ids != null) {
			var roomDataArray = ids.split(",");
					
			for (var i=roomDataArray.length - 1; i>=0; i--) {
				greensArray.push(roomDataArray[i]);
			}
		}
		updateLocations(t);
	};
	
	var parseObjParking = function (result) {		
		var xmlDoc = result.responseXML.documentElement;				
		var ids = xmlDoc.getAttribute("ids");
		var roomDataArray = ids.split(",");
		
		if (ids != null) {		
			for (var i=roomDataArray.length - 1; i>=0; i--) {
				parkingArray.push(roomDataArray[i]);
			}
		}
		updateLocations(t);
	};
	
	var parseObjLandmarks = function (result) {		
		var xmlDoc = result.responseXML.documentElement;				
		var ids = xmlDoc.getAttribute("ids");
		var roomDataArray = ids.split(",");
				
		if (ids != null) {
			for (var i=roomDataArray.length - 1; i>=0; i--) {
				landmarksArray.push(roomDataArray[i]);
			}
		}
		updateLocations(t);
	};
	
	// Point selection URL  //Buildings for buildings
	//var psURLRooms = ["../cgi-bin/imsreq.xml?request=getselection&type=point&layer=Rooms&idfield=space_name&x=","&y="];
	var psURLRooms = ["federation/IMS/pointQuery.php?x=","&y="];
	var psURLGreens = ["../cgi-bin/imsreq.xml?request=getselection&type=point&layer=Greens&idfield=loc_id&x=","&y="];
	var psURLLandmarks = ["../cgi-bin/imsreq.xml?request=getselection&type=point&layer=Landmarks&idfield=loc_id&x=","&y="];									
	var psURLParking = ["../cgi-bin/imsreq.xml?request=getselection&type=point&layer=Parking&idfield=loc_id&x=","&y="];
                  				
	var pointString = String(t.point);
	var gpointArray = pointString.split(",");
	var itemGPointX = gpointArray[0].substr(1);
	var itemGPointY = gpointArray[1].substr(0,gpointArray[1].length-1);
	
	var urlRooms = psURLRooms[0] + itemGPointX + psURLRooms[1] + itemGPointY;
	var urlGreens = psURLGreens[0] + itemGPointX + psURLGreens[1] + itemGPointY;
	var urlLandmarks = psURLLandmarks[0] + itemGPointX + psURLLandmarks[1] + itemGPointY;
	var urlParking = psURLParking[0] + itemGPointX + psURLParking[1] + itemGPointY;
	//prompt("",urlRooms);
	Agent(urlRooms, parseObjRooms, []);
	Agent(urlGreens, parseObjGreens, []);
	Agent(urlParking, parseObjParking, []);	
	Agent(urlLandmarks, parseObjLandmarks, []);
}

function updateLocations(t) {
	var curNonce = String(t.space.name);
	var curNonceInfo = nonceInfoArray[curNonce];
	
	var output = '';
	locReturn++;
	if (locReturn == 4) {
		var parseRealNames = function (result) {		
			var xmlDoc = result.responseXML.documentElement;
			var numRecords = xmlDoc.getElementsByTagName("rowitem").length;
			var i;
			var j;
			for (i=0;i<numRecords;i++) {
				row = xmlDoc.getElementsByTagName("rowitem").item(i);
				if (row.getAttribute("type") == 'Greens') {
					for (j=0;j<greensArray.length;j++) {
						if (row.getAttribute("spacename") == greensArray[j]) {
							addLocationRow(curNonce,row.getAttribute("realname"));
						}
					}
				}
				else if (row.getAttribute("type") == 'Parking') {
					for (j=0;j<parkingArray.length;j++) {
						if (row.getAttribute("spacename") == parkingArray[j]) {
							addLocationRow(curNonce,row.getAttribute("realname"));
						}
					}
				}
				else if (row.getAttribute("type") == 'Landmarks') {
					for (j=0;j<landmarksArray.length;j++) {
						if (row.getAttribute("spacename") == landmarksArray[j]) {
							addLocationRow(curNonce,row.getAttribute("realname"));
						}
					}
				}
			}
			
			if (totalRows === 0) {
				locOutput += "<tr><td>[No locations found]<\/td><\/tr>";
			}
			
			output += "<table style='width:194px;font-size:8pt;' class='popup' border='0'>" + 
						"<tr><td>Choose a location below:<\/td><\/tr>" +
						locOutput +
						"<tr><td>&nbsp;<\/td><\/tr>" +
						"<tr><td>Or re-position the icon<\/td><\/tr>" +
						"<tr><td>&nbsp;<\/td><\/tr>" +
						"<tr><td>Or name this location:<\/td><\/tr>" +
						"<tr><td><input onKeyPress='return submitenter(\""+ curNonce + "\",this,event)' id='formfield"+curNonce+"' style='width:120px;font-size:8pt;' />" + 
						"<input class='box3' type='button' onclick='dataio=document.getElementById(\"formfield"+curNonce+
						"\"); selectLocation(\""+curNonce+"\",dataio.value)' value='OK' /><\/td><\/tr>";
			
			if (totalRows <= 4) {
				output += "<tr><td height='"+(225 - (totalRows+10)*15)+"px'>&nbsp;<\/td><\/tr>";
			}

			if (nonceInfoArray[curNonce]['isTack']) {
				output += "<tr><td align='right'><input class='box3' type='button' onclick='cancelEdit(\""+curNonce+"\")' value='Delete Tack' /><\/td><\/tr>";
			}
			else {
				output += "<tr><td align='left'><a href='#' onclick='keepLocation(\""+curNonce+"\")'>Keep Original Location ["+curNonceInfo['location']+"]<\/a><\/td><\/tr>";
			}
			
			output += "<\/table>";		
																			
			if (totalRows > 5) {
				curNonceInfo['target'].openInfoWindowHtml(spanCanvas((totalRows+9)*0.68+ieCor,40,
					"<div id='initPopupBig"+curNonce+"' name='initPopupBig"+curNonce+"' class='popup' style='position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+(totalRows+9)*0.68*16+"px;'>" + output +
					"<\/div>"));
			}
			else {
				document.getElementById(String("initPopup" + curNonce)).innerHTML = output;
			}
		};
		
		Agent('wikiqueryspatial.php',parseRealNames,[]);
	}
}

function fixLocation(location) {
	var cLocation = location;
	var beginning;
	var thirdfourthlast;
	var lasttwo;
	if (cLocation.length >= 4) {
		beginning = cLocation.substr(0,cLocation.length - 2);
		thirdfourthlast = cLocation.substr(cLocation.length - 4,2);
		secondlast = cLocation.substr(cLocation.length - 2,1);

		if (thirdfourthlast == '00') {
			if (secondlast == 'C') {
				cLocation = beginning + ' corridor';
			}
			else if (secondlast == 'L') {
				cLocation = beginning + ' lobby';
			}
			else if (secondlast == 'S') {
				cLocation = beginning + ' stairs';
			}
			else if (secondlast == 'E') {
				cLocation = beginning + ' elevator';
			}
		}
	}

	return cLocation;
}