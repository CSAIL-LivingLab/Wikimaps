var GPolygon = function (sides, center, diagonal, rotation, color, thickness, opacity) {

     var points = [];

     for (var i = 0; i <= sides; i++) {

          var point = new GPoint();
          point.x = center.x + diagonal*Math.cos(rotation + 3*Math.PI/2 + Math.PI/sides + 2*Math.PI*i/sides);
          point.y = center.y + diagonal*Math.sin(rotation + 3*Math.PI/2 + Math.PI/sides + 2*Math.PI*i/sides);

          points.push(point);
          
      }

      self = new GPolyline(points, color, thickness, opacity);
      self.center = center;
      self.diagonal = diagonal;

      return self;

}


var GCircle = function (center, radius, color, thickness, opacity) {

      self = new GPolygon(270, center, radius, Math.PI/2, color, thickness, opacity);
      self.radius = radius;

      return self;

}

var GElement = function (map, point, element) {

     transparent = "http://wikimap.csail.mit.edu/mapfiles/transparent.gif";

     var blank = new GIcon();
     blank.image = transparent;
     blank.shadow = transparent;
     blank.transparent = transparent;
     blank.iconSize = new GSize(0,0);
     blank.shadowSize = new GSize(0,0);
     blank.iconAnchor = new GPoint(0,0);

     overlay = new GMarker(point, blank);
     map.addOverlay(overlay);

     element.style.position = "absolute";

     overlay.images.push(element);
     overlay.map.div.appendChild(element);
     overlay.redraw(true);

}

var GText = function (map, point, text) {

     this.map = map;
     this.point = point;
     this.text = text;

     this.span = map.ownerDocument.createElement("SPAN");
     this.span.innerHTML = text;

}

GText.prototype.setText = function (a) { this.text = a; this.span.innerHTML = a; }
GText.prototype.getText = function () { return this.text; }
GText.prototype.setColor = function (a) { this.span.style.color = a; }
GText.prototype.setFontFamily = function (a) { this.span.style.fontFamily = a; }
GText.prototype.setFontSize = function (a) { this.span.style.fontSize = a; }
GText.prototype.setFontStyle = function (a) { this.span.style.fontStyle = a; }
GText.prototype.setFontWeight = function (a) { this.span.style.fontWeight = a; }
GText.prototype.install = function () { this.gElement = new GElement(this.map, this.point, this.span); }

////////// Route/Space Retrieval and display //////////

routeURL = ['http://wikimap.csail.mit.edu/cgi-bin/route.xml?','+','+debug'];
directURL = ['http://wikimap.csail.mit.edu/cgi-bin/directions.xml?'];
spaceURL = ['http://wikimap.csail.mit.edu/cgi-bin/space.xml?'];
roomURL = ['http://wikimap.csail.mit.edu/cgi-bin/room.xml?','+','+'];
proxURL = ['http://wikimap.csail.mit.edu/cgi-bin/proximity.xml?','+','+','+','+'];

Polygon = Array;
Polyline = Array;

Route = function (from, to, type) {

     this.from = from;
     this.to = to;
     this.type = type;

     this.path = new Polyline();

};

Space = function (name) {

     this.name = name;

     this.color = "#FF0000";

     this.centroid = new GPoint();
     this.contour = new Polygon();
     this.triangulation = new Array();

};


function retrieveRoute(from, to, debug, leaveOverlays) {

     var route = new Route();
     var spaces = new Array();  // Array of spaces

     var parseRoute = function (result) {

          var xmlDoc = result.responseXML.documentElement;
			//alert(result.responseText);
          if (routeNode = xmlDoc.getElementsByTagName("route").item(0)) {

               route.from = routeNode.getAttribute("from");
               route.to = routeNode.getAttribute("to");
               route.type = routeNode.getAttribute("type");

               var i = 0;
               while (pointNode = routeNode.getElementsByTagName("point").item(i++))
                    route.path.push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));

          } else return;

          var i = 0;
          while (spaceNode = xmlDoc.getElementsByTagName("space").item(i++)) {

               var space = new Space();
               space.name = spaceNode.getAttribute("name");

               if (centroidNode = spaceNode.getElementsByTagName("centroid").item(0))
                     space.centroid = new GPoint(Number(centroidNode.getAttribute("x")), Number(centroidNode.getAttribute("y")));


               contourNode = spaceNode.getElementsByTagName("contour").item(0);
               var j = 0;
               while (contourNode && (pointNode = contourNode.getElementsByTagName("point").item(j++)))
                    space.contour.push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));


               triangulationNode = spaceNode.getElementsByTagName("triangulation").item(0);
               j = 0;
               var triangle = new Space();
               while (triangulationNode && (pointNode = triangulationNode.getElementsByTagName("point").item(j++))) {
                    triangle.contour.push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));
                    if (j % 3 == 0) {
                         triangle.contour.push(triangle.contour[0]);
                         space.triangulation.push(triangle);
                         triangle = new Space();
                    }
               }

               spaces.push(space);

          }

          map.spec.mitOptionalUrl = "&selectlayer=&selectfield=&selectvalues=";
          //document.getElementById("mapinfo").innerHTML = '<br><br><center><span style="font-family:Arial; font-weight:bold; font-size:12pt">' +
          //                                               'Route from Building ' + from.name + ' to Building ' + to.name + '<br>' +
          //                                               (debug?'Debug mode is *ON*':'') + '</span></center>';


          if (!leaveOverlays) {
	        map.clearOverlays();
	  }

          map.addOverlay(new XPolyline(route.path, routeStyle));

          draw(from.dbValues.join(), null, true, true)
          draw(to.dbValues.join(), null, true, true)

          outputMessage("Route from " + from.dbValues.join() + " to " + to.dbValues.join());

          for (var i=0; i<spaces.length; i++) {

               map.addOverlay(new GPolyline(spaces[i].contour, "#FF0000", 1, 1));

               iden = new GMarker(spaces[i].centroid, icon);
               map.addOverlay(iden);
               iden.getMarkerTarget().title = spaces[i].name;

               for (var j = 0; j < spaces[i].triangulation.length; j++)
                    map.addOverlay(new GPolyline(spaces[i].triangulation[j].contour, "#00FF00", 1, 0.5));

          }


          //// $bugbug(yonib) This isn't such a good indicator of the true polyline extent. Try to get actual min+max values...
          //xSpan = route.path[route.path.length-1].x - route.path[0].x;
          //ySpan = route.path[route.path.length-1].y - route.path[0].y;
          var spanMinX;
          var spanMaxX;
          var spanMinY;
          var spanMaxY;
          for (var i=0; i<route.path.length; i++) {
                if (!spanMinX || spanMinX > route.path[i].x) spanMinX = route.path[i].x;
                if (!spanMaxX || spanMaxX < route.path[i].x) spanMaxX = route.path[i].x;
                if (!spanMinY || spanMinY > route.path[i].y) spanMinY = route.path[i].y;
                if (!spanMaxY || spanMaxY < route.path[i].y) spanMaxY = route.path[i].y;
          }
          xSpan = spanMaxX - spanMinX;
          ySpan = spanMaxY - spanMinY;
          span = new GSize(Math.abs(xSpan), Math.abs(ySpan));
          center = new GPoint(spanMinX + xSpan/2, spanMinY + ySpan/2);

          zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
          map.centerAndZoom(center, zoom);

     }

     var displayDirections = function (result) {
		outputMessage("Route from " + from.dbValues.join() + " to " + to.dbValues.join());
		//outputMessage(result.responseText);
		//document.getElementById("mapinfo").innerHTML = result.responseText;

     }

     var urlRoute = routeURL[0] + escape(from.dbValues.join()) + routeURL[1] + escape(to.dbValues.join()) + (debug?routeURL[2]:"");
     var urlDirect = directURL[0] + escape(from.dbValues.join()) + "+" + escape(to.dbValues.join());

     Agent(urlRoute, parseRoute, []);
     //Agent(urlDirect, displayDirections, []);

}

function retrieveSpacesOld(url, message, floorSpace, radius, leaveOverlays) {

     var route = new Route();
     var spaces = new Array();  // Array of spaces

     var center = new GPoint(0,0);
     var span = new GSize(0,0);
	 var noData = false;

     var parseResult = function (result) {

          var xmlDoc = result.responseXML.documentElement;

          if (fcentroid = xmlDoc.getElementsByTagName("centroid").item(0)) {

               center.x = Number(fcentroid.getAttribute("x"));
               center.y = Number(fcentroid.getAttribute("y"));

          }
		  else {
		  	   noData = true;
		  }


          if (fextent = xmlDoc.getElementsByTagName("extent").item(0)) {

               var minx = Number(fextent.getAttribute("minx"));
               var miny = Number(fextent.getAttribute("miny"));
               var maxx = Number(fextent.getAttribute("maxx"));
               var maxy = Number(fextent.getAttribute("maxy"));
               
               span.width = maxx-minx;
               span.height = maxy-miny;

          }
		  else {
		  	   noData = true;
		  }
		  
		  if (noData) {
		  	   outputMessage("No data available.");
		  }
		  else {		  
			  var i = 0;
			  while (spaceNode = xmlDoc.getElementsByTagName("space").item(i++)) {
	
				   var space = new Space();
				   space.name = spaceNode.getAttribute("name");
	
				   if (centroid = spaceNode.getElementsByTagName("centroid").item(0)) {
	
						space.centroid.x = Number(centroid.getAttribute("x"));
						space.centroid.y = Number(centroid.getAttribute("y"));
	
				   } else { alert ("Corrupt data."); return; }
	
				   if (contourNode = spaceNode.getElementsByTagName("contour").item(0)) {
	
						if (color = contourNode.getAttribute("color")) space.color = color;
	
						var j = 0;
						while (contourNode && (pointNode = contourNode.getElementsByTagName("point").item(j++)))
							 space.contour.push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));
	
						spaces.push(space);
	
				   } else { alert ("Corrupt data."); return; }
	
			  }
	
			  map.spec.mitOptionalUrl = "&selectlayer=&selectfield=&selectvalues=";
			  //outputMessage(infoText);
			  //document.getElementById("mapinfo").innerHTML = '<br><br><center><span style="font-family:Arial; font-weight:bold; font-size:12pt">' + infoText + '<br></span></center>';
			  if (!leaveOverlays) {
				map.clearOverlays();
			  }
			  
			  for (var i=0; i<spaces.length; i++) {
	
				   map.addOverlay(new GPolyline(spaces[i].contour, spaces[i].color, 1, 1));
	
				   //var label = new GText(map, spaces[i].centroid, floorSpace+spaces[i].name);
				   var label = new GText(map, spaces[i].centroid, spaces[i].name);
				   label.setFontFamily("Arial");
				   label.setFontSize("8pt");
	
				   label.install();
	
			  }
	
			  radius?map.addOverlay(new GPolygon(4, center, radius*Math.sqrt(2), 0, "#0000FF", 1, 0.5)):void(0);
	
			  if (!leaveOverlays) {
				  //zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
				  map.centerAndZoom(center, 7);
			  }
			  outputMessage(message);
		  }
     }
	 //prompt("",url);
     Agent(url, parseResult, []);
}


function centerOnSpace(url, message, floorSpace, radius, leaveOverlays) {

     var center = new GPoint(0,0);
     var span = new GSize(0,0);
	 var noData = false;

     var parseResult = function (result) {

          var xmlDoc = result.responseXML.documentElement;

          if (fcentroid = xmlDoc.getElementsByTagName("centroid").item(0)) {

               center.x = Number(fcentroid.getAttribute("x"));
               center.y = Number(fcentroid.getAttribute("y"));

          }
		  else {
		  	   noData = true;
		  }

          if (fextent = xmlDoc.getElementsByTagName("extent").item(0)) {

               var minx = Number(fextent.getAttribute("minx"));
               var miny = Number(fextent.getAttribute("miny"));
               var maxx = Number(fextent.getAttribute("maxx"));
               var maxy = Number(fextent.getAttribute("maxy"));
               
               span.width = maxx-minx;
               span.height = maxy-miny;

          }
		  else {
		  	   noData = true;
		  }

		  if (noData) {
		  	  outputMessage("No data available.");
		  }		  
		  else {  
			  if (!leaveOverlays) {
				  map.clearOverlays();
				  zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
				  map.centerAndZoom(center, zoom + 1);
			  }
			  outputMessage(message);
		  }

     }
	 
     Agent(url, parseResult, []);
}

function retrieveRoom(url, message, roomName, radius, leaveOverlays, suppressMsg) {

     var route = new Route();
     var spaces = new Array();  // Array of spaces

     var portalPairs = [];

     var center = new GPoint(0,0);
     var span = new GSize(0,0);
	 var noData = true;

     var parseResult = function (result) {
          var xmlDoc = result.responseXML.documentElement;

          var i = 0;
          while (spaceNode = xmlDoc.getElementsByTagName("space").item(i++)) {
			   noData = false;
               var space = new Space();
               space.name = spaceNode.getAttribute("name");

               if (centroid = spaceNode.getElementsByTagName("centroid").item(0)) {

                    space.centroid.x = Number(centroid.getAttribute("x"));
                    space.centroid.y = Number(centroid.getAttribute("y"));

					center.x = Number(centroid.getAttribute("x"));
					center.y = Number(centroid.getAttribute("y"));

               } else { alert ("Corrupt data."); return; }

               if (contourNode = spaceNode.getElementsByTagName("contour").item(0)) {

                    if (color = contourNode.getAttribute("color")) space.color = color;

                    var j = 0;
                    while (contourNode && (pointNode = contourNode.getElementsByTagName("point").item(j++)))
                         space.contour.push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));

                    var j = 0;
                    while (portalNode = spaceNode.getElementsByTagName("portal").item(j++)) {
     //                handle = [ spaceNode.getAttribute("name"), portalNode.getAttribute("target") ].sort().join();
                       if (contourNode) {
                           var pointA, pointB;
                           var edgeNode = portalNode.getElementsByTagName("edge").item(0);
                           var iPoint = Number(edgeNode.getAttribute("index"));
                           pointA = new GPoint(Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("x")),
                                               Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("y")));
                           if (contourNode.getElementsByTagName("point").length == ++iPoint) iPoint = 0;
                           pointB = new GPoint(Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("x")),
                                               Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("y")));
                           if (portalNode.getAttribute("type") == "implicit") {
                               var t, a, b;
                               t = Number(edgeNode.getAttribute("minparam"));
                               a = new GPoint(pointA.x + t*(pointB.x - pointA.x), pointA.y + t*(pointB.y - pointA.y));
                               t = Number(edgeNode.getAttribute("maxparam"));
                               b = new GPoint(pointA.x + t*(pointB.x - pointA.x), pointA.y + t*(pointB.y - pointA.y));
                               portalPairs.push([a, b]);
                           }
                           if (portalNode.getAttribute("type") == "explicit") {
                               var t, p, h, a, b, vB, d;
                               t = Number(edgeNode.getAttribute("param"));
                               d = Math.sqrt( Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2) )
                               p = new GPoint(pointA.x + t*(pointB.x - pointA.x), pointA.y + t*(pointB.y - pointA.y));
                               vB = new GPoint(pointA.x + (t+2/d)*(pointB.x - pointA.x), pointA.y + (t+2/d)*(pointB.y - pointA.y));
                               a = new GPoint(p.x - (vB.y - p.y), p.y + (vB.x - p.x));
                               b = new GPoint(p.x + (vB.y - p.y), p.y - (vB.x - p.x));
                               // Commented out below line because it assumes bidirectional portals will duplicate each other.
                               // This is not the case with single spaces.
                               //if (portalNode.getAttribute("source") == "false") {
                               h = new GPoint(p.x + .5*(vB.x - p.x)*.5 + .5*(vB.y - p.y)*.87, p.y - .5*(vB.x - p.x)*.87 + .5*(vB.y - p.y)*.5);
                               portalPairs.push([a, b, h]);
                               //}
                           }
                       }
                    }

                    spaces.push(space);

               } else { alert ("Corrupt data."); return; }

          }
		  if (noData) {
			  if (!suppressMsg) { 
			  	  outputMessage("No data available.");
			  }
		  }
		  else {
			  map.spec.mitOptionalUrl = "&selectlayer=&selectfield=&selectvalues=";
			  //outputMessage(infoText);
			  //document.getElementById("mapinfo").innerHTML = '<br><br><center><span style="font-family:Arial; font-weight:bold; font-size:12pt">' + infoText + '<br></span></center>';
	
			  if (!leaveOverlays) {
				  map.clearOverlays();
			  }
	
			  for (var i=0; i<spaces.length; i++) {
	
				   map.addOverlay(new GPolyline(spaces[i].contour, spaces[i].color, 2, 1));
	
				   var label = new GText(map, spaces[i].centroid, roomName);
				   label.setFontFamily("Arial");
				   label.setFontSize("8pt");
	
				   label.install();
	
			  }

                          for (var i = 0; i < portalPairs.length; i++)
                               map.addOverlay(new GPolyline(portalPairs[i], "#884BAE", 3, 1));
	
			  radius?map.addOverlay(new GPolygon(4, center, radius*Math.sqrt(2), 0, "#0000FF", 1, 0.5)):void(0);
	
        		  //zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
			  if (!leaveOverlays) {
				map.centerAndZoom(center, 7);
			  }
			  
			  if (!suppressMsg) { 
				outputMessage(message);
			  }
		  }
     }

     Agent(url, parseResult, []);
}


// draws floor contour of first floor to simulate building contour. -yoni

function retrieveBuilding(url, message, roomName, radius, leaveOverlays, suppressMsg) {

     var route = new Route();
     var spaces = new Array();  // Array of spaces

     var center = new GPoint(0,0);
     var span = new GSize(0,0);
	 var noData = true;

     var parseResult = function (result) {
          var xmlDoc = result.responseXML.documentElement;

          var i = 0;
          while (spaceNode = xmlDoc.getElementsByTagName("floor").item(i++)) {
			   noData = false;
               var space = new Space();
               space.name = spaceNode.getAttribute("name");

               if (centroid = spaceNode.getElementsByTagName("centroid").item(0)) {

                    space.centroid.x = Number(centroid.getAttribute("x"));
                    space.centroid.y = Number(centroid.getAttribute("y"));

					center.x = Number(centroid.getAttribute("x"));
					center.y = Number(centroid.getAttribute("y"));

               } else { alert ("Corrupt data."); return; }

               if (contourNode = spaceNode.getElementsByTagName("contour").item(0)) {

                    if (color = contourNode.getAttribute("color")) space.color = color;

                    var j = 0;
                    while (contourNode && (pointNode = contourNode.getElementsByTagName("point").item(j++)))
                         space.contour.push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));

                    spaces.push(space);

               } else { alert ("Corrupt data."); return; }

          }
		  if (noData) {
			  if (!suppressMsg) { 
			  	  outputMessage("No data available.");
			  }
		  }
		  else {
			  map.spec.mitOptionalUrl = "&selectlayer=&selectfield=&selectvalues=";
			  //outputMessage(infoText);
			  //document.getElementById("mapinfo").innerHTML = '<br><br><center><span style="font-family:Arial; font-weight:bold; font-size:12pt">' + infoText + '<br></span></center>';
	
			  if (!leaveOverlays) {
				  map.clearOverlays();
			  }
	
			  for (var i=0; i<spaces.length; i++) {
	
				   map.addOverlay(new GPolyline(spaces[i].contour, spaces[i].color, 2, 1));
	
				   var label = new GText(map, spaces[i].centroid, roomName);
				   label.setFontFamily("Arial");
				   label.setFontSize("8pt");
	
				   label.install();
	
			  }
	
			  radius?map.addOverlay(new GPolygon(4, center, radius*Math.sqrt(2), 0, "#0000FF", 1, 0.5)):void(0);
	
			  //zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
			  if (!leaveOverlays) {
				map.centerAndZoom(center, 9);
			  }
			  
			  if (!suppressMsg) { 
				outputMessage(message);
			  }
		  }
     }

     Agent(url, parseResult, []);
}



function proximity(parameters) {

     parameters = parameters.split(",");

     var url = proxURL[0] + parameters[0].toUpperCase() + proxURL[1] + parameters[1] +
               proxURL[2] + parameters[2].toUpperCase() + proxURL[3] + parameters[3] +
               proxURL[4] + parameters[4];
     var infoText = "Proximity query for " + parameters[0].toUpperCase() + "-" + parameters[1] + parameters[2].toUpperCase() + " using a bounding box half-height of " + parameters[3] + " " + parameters[4];

     retrieveSpaces(url, infoText, parameters[0].toUpperCase() + "-" + parameters[1], Number(parameters[3])*(parameters[4] == "meters"?3.281:1));

}

function draw(name,text,leaveOverlays,suppressMsg) {
	var url = '';
	var message = '';

        if (!text) text = name

	var displaySpace = function (result) {
		nameCommas = result.responseText;
		nameArray = nameCommas.split(",");

		if (nameArray[0] == 'building' || nameArray[0] == 'floor') {
                        floor_level = nameArray[0] == 'floor' ? nameArray[2] : "1";
			name = name.toUpperCase();
			url = spaceURL[0] + name + '-' + floor_level;
			if (text != name) {
				message = text + " (" + name + ") shown on map";
			}
			else {
				message = name + " shown on map";
			}
			//centerOnSpace(url, message, name, false);
			retrieveBuilding(url, message, text, false, leaveOverlays, suppressMsg);
		}
		else if (nameArray[0] == 'Xfloor') {
			name = name.toUpperCase();
			//url = spaceURL[0] + name;
			url = spaceURL[0] + text;
			if (text != name) {
				message = text + " (Floorplan " + name + ") shown on map";
			}
			else {
				message = "Floorplan for " + name + " shown on map";
			}
			//retrieveSpaces(url, message, name, false);
			retrieveSpaces(url, message, text, false, leaveOverlays, suppressMsg);
		}
		else {
			url = roomURL[0] + nameArray[1] + roomURL[1] + nameArray[2] + roomURL[2] + nameArray[3];
			if (text != name) {
				message = text + " (Room contour " + name + ") shown on map";
			}
			else {
				message = "Room contour for " + name + " shown on map";
			}	
			retrieveRoom(url, message, name, false, leaveOverlays, suppressMsg);
		}
	}
	 
	//var url = "parseSpaceToCommas.php?space=" + name;
	//var url = "http://wikimap.csail.mit.edu/parseSpaceToCommas.php?space=" + name;
	var url = "http://wikimap.csail.mit.edu/parseSpaceToCommas.php?space=" + text;

	Agent(url, displaySpace, []);
}

function drawroom(room) {
	var displayRoom = function (result) {
		roomCommas = result.responseText;
		roomArray = roomCommas.split(",");
	
		var url = roomURL[0] + roomArray[0] + roomURL[1] + roomArray[1] + roomURL[2] + roomArray[2];
		var infoText = "Room contour for " + room;

		retrieveRoom(url, infoText, room, false);
	}

	var url = "http://wikimap.csail.mit.edu/parseSpaceToCommas.php?space=" + room;

	Agent(url, displayRoom, []);
}

function drawroom2(room) {
	var displayRoom = function (result) {
		roomCommas = result.responseText;
		roomArray = roomCommas.split(",");
	
		var url = roomURL[0] + roomArray[1] + roomURL[1] + roomArray[2] + roomURL[2] + room;
		var infoText = "Room contour for " + room;
	
		retrieveRoom(url, infoText, room, false, true, true);
	}

	var url = "http://wikimap.csail.mit.edu/parseSpaceToCommas.php?space=" + room;
	Agent(url, displayRoom, []);
}

function drawfloor(room) {
	var displayRoom = function (result) {
		roomCommas = result.responseText;
		roomArray = roomCommas.split(",");
	
		var url = spaceURL[0] + roomArray[1] + '-' + roomArray[2];
		infoText = "Floorplan for " + name;
		retrieveSpaces(url, infoText, roomArray[1] + '-' + roomArray[2], false, true);
	}

	var url = "http://wikimap.csail.mit.edu/parseSpaceToCommas.php?space=" + room;
	Agent(url, displayRoom, []);
}



// Updated floorplan drawing with portals. -yoni

function retrieveSpaces(url, message, floorSpace, radius, leaveOverlays) {

     var route = new Route();
     var spaces = new Array();  // Array of spaces

     var center = map.getCenterLatLng(); //new GPoint(0,0);
     var span = map.getSpanLatLng(); //new GSize(0,0);

     var portalPairs = [];

     var parseResult = function (result) {

          var xmlDoc = result.responseXML.documentElement;

          if (floorNode = xmlDoc.getElementsByTagName("floor").item(0)) {
              if (fcentroid = floorNode.getElementsByTagName("centroid").item(0)) {

                  center.x = Number(fcentroid.getAttribute("x"));
                  center.y = Number(fcentroid.getAttribute("y"));

              } else { alert ("No data available."); return; }

              if (fextent = floorNode.getElementsByTagName("extent").item(0)) {

                  var minx = Number(fextent.getAttribute("minx"));
                  var miny = Number(fextent.getAttribute("miny"));
                  var maxx = Number(fextent.getAttribute("maxx"));
                  var maxy = Number(fextent.getAttribute("maxy"));

                  span.width = maxx-minx;
                  span.height = maxy-miny;

                  } else { alert ("No data available."); return; }

          }

          var i = 0;
          while (spaceNode = xmlDoc.getElementsByTagName("space").item(i++)) {

               var space = new Space();
               space.name = spaceNode.getAttribute("name");

               if (centroid = spaceNode.getElementsByTagName("centroid").item(0)) {

                    space.centroid.x = Number(centroid.getAttribute("x"));
                    space.centroid.y = Number(centroid.getAttribute("y"));

               } else { alert ("Corrupt data."); return; }

               var k = 0;
               while (contourNode = spaceNode.getElementsByTagName("contour").item(k)) {

                    if (color = contourNode.getAttribute("color")) space.color = color;

                    space.contour.push(new Polygon());
                    var j = 0;
                    while (pointNode = contourNode.getElementsByTagName("point").item(j++))
                        space.contour[k].push(new GPoint(Number(pointNode.getAttribute("x")), Number(pointNode.getAttribute("y"))));
                    k++;
               }

               spaces.push(space);

               contourNode = spaceNode.getElementsByTagName("contour").item(--k)

               var j = 0;
               while (portalNode = spaceNode.getElementsByTagName("portal").item(j++)) {
//                handle = [ spaceNode.getAttribute("name"), portalNode.getAttribute("target") ].sort().join();
                  if (contourNode) {
                      if (portalNode.getAttribute("class").toLowerCase() == "vertical") continue;
                      var pointA, pointB;
                      var edgeNode = portalNode.getElementsByTagName("edge").item(0);
                      var iPoint = Number(edgeNode.getAttribute("index"));
                      pointA = new GPoint(Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("x")),
                                          Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("y")));
                      if (contourNode.getElementsByTagName("point").length == ++iPoint) iPoint = 0;
                      pointB = new GPoint(Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("x")),
                                          Number(contourNode.getElementsByTagName("point").item(iPoint).getAttribute("y")));
                      if (portalNode.getAttribute("type") == "implicit") {
                          var t, a, b;
                          t = Number(edgeNode.getAttribute("minparam"));
                          a = new GPoint(pointA.x + t*(pointB.x - pointA.x), pointA.y + t*(pointB.y - pointA.y));
                          t = Number(edgeNode.getAttribute("maxparam"));
                          b = new GPoint(pointA.x + t*(pointB.x - pointA.x), pointA.y + t*(pointB.y - pointA.y));
                          portalPairs.push([a, b]);
                      }
                      if (portalNode.getAttribute("type") == "explicit" || portalNode.getAttribute("type") == "TRANSITION") {
                          var t, p, h, a, b, vB, d;
                          t = Number(edgeNode.getAttribute("param"));
                          d = Math.sqrt( Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2) )
                          p = new GPoint(pointA.x + t*(pointB.x - pointA.x), pointA.y + t*(pointB.y - pointA.y));
                          vB = new GPoint(pointA.x + (t+2/d)*(pointB.x - pointA.x), pointA.y + (t+2/d)*(pointB.y - pointA.y));
                          a = new GPoint(p.x - (vB.y - p.y), p.y + (vB.x - p.x));
                          b = new GPoint(p.x + (vB.y - p.y), p.y - (vB.x - p.x));
                          if (portalNode.getAttribute("source") == "false") {
                              h = new GPoint(p.x + .5*(vB.x - p.x)*.5 + .5*(vB.y - p.y)*.87, p.y - .5*(vB.x - p.x)*.87 + .5*(vB.y - p.y)*.5);
                              portalPairs.push([a, b, h]);
                          }
                      }
                  }
               }
          }

          map.spec.mitOptionalUrl = "&selectlayer=&selectfield=&selectvalues=";
          //document.getElementById("mapinfo").innerHTML = '<br><br><center><span style="font-family:Arial; font-weight:bold; font-size:12pt">' + infoText + '<br></span></center>';
          if (!leaveOverlays) {
                map.clearOverlays();
          }

          for (var i=0; i<spaces.length; i++) {

               for (var j=0; j<spaces[i].contour.length; j++)
                   map.addOverlay(new GPolyline(spaces[i].contour[j], spaces[i].color, 1, 1));

               var label = new GText(map, spaces[i].centroid, spaces[i].name);
               label.setFontFamily("Arial");
               label.setFontSize("8pt");

               label.install();

               }

          for (var i = 0; i < portalPairs.length; i++)
               map.addOverlay(new GPolyline(portalPairs[i], "#884BAE", 3, 1));

          radius?map.addOverlay(new GPolygon(4, center, radius*Math.sqrt(2), 0, "#0000FF", 1, 0.5)):void(0);


                if (!leaveOverlays) {
                        zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
                        map.centerAndZoom(center, zoom);
                }
                outputMessage(message);

//          zoom = map.spec.getLowestZoomLevel(center, span, map.viewSize);
//          map.centerAndZoom(center, zoom);

//box()

     }

     Agent(url, parseResult, []);

}

