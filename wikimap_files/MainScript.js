// Yoni's edits (start) 
// Create our 'X' shape and register it.
var xShape = {
    iconAnchor: new GPoint(21, 20),
    infoWindowAnchor: new GPoint(21, 20),
    shadow: false,
    points: [38, 10, 34, 11, 29, 14, 24, 18, 22, 20, 26, 23, 31, 26, 36, 27, 40, 26, 33, 35, 31, 30, 28, 26, 22, 21, 16, 27, 13, 32, 11, 37, 1, 27, 3, 28, 11, 26, 16, 23, 20, 20, 13, 15, 8, 13, 0, 12, 10, 0, 12, 8, 16, 14, 21, 19, 24, 15, 26, 10, 27, 5, 26, 1]
};
XIcon.shapes['x'] = xShape;

// Create our 'X' icon.
var xStyle = {
    outlineColor: '#e11010',
    outlineWeight: 2,
    fillColor: '#e11010',
    fillOpacity: 1
};
var xIcon = new XIcon('x', xStyle);

var routeStyle = {
    color: '#0000FF',
    pattern: [20, 10],
    opacity: 0.5,
    weight: 6,
    arrowsEvery: 200
};

// Yoni's edits end

// main script not yoni's edits (start)
var Browser = new Browser();

function resetVars() {
    var parseObj = function(result) {
        var xmlDoc = result.responseXML.documentElement;
        var row = xmlDoc.getElementsByTagName("record").item(0);

        if ((row != null) && (row.getAttribute("ret") == 'success')) {
            resetObjs();
            document.getElementById('useremail').value = 'none';
            outputMessage("Session variables reset.");
        } else {
            outputMessage("There was an error trying to reset the session variables.");
        }
    };

    var url = "session_reset.php";

    Agent(url, parseObj, []);
}

function calcLink() {
    var center = map.getCenterLatLng()
    var zoom = map.getZoomLevel();
    var query = document.getElementById("formfield").value;
    var urlparams = "?x=" + center.x + "&y=" + center.y + "&zoom=" + zoom;
    if (query != '')
        urlparams += "&query=" + query;

    var cat = '';
    for (var i = 0; i < usedArray.length; i++) {
        if (i == 0)
            cat += usedArray[i];
        else
            cat += ',' + usedArray[i];
    }

    if (cat != '')
        urlparams += "&cat=" + cat;

    document.getElementById("maplink").href = urlparams;
}

function resetObjs() {
    SchedObj.resetObjs();
    WikiObj.resetObjs();
    EquipObj.resetObjs();
    PeopleObj.resetObjs();
}

function setZIndex(target) {
    topZIndex++;
    target.iconImage.style.zIndex = topZIndex;
    target.getMarkerTarget().style.zIndex = topZIndex;
}

function correctMozillaBug() {
    map.pan(0.1, 0);
    map.pan(-0.1, 0);
}

function addTack() {
    map.closeInfoWindow();
    var pinMarker = createGMarker(map.getCenterLatLng(), 'Added Tack');
    pinMarker.space = {};
    pinMarker.space.name = "0";

    var genNonce = function(result) {
        var xmlDoc = result.responseXML.documentElement;
        var record = xmlDoc.getElementsByTagName("record").item(0);
        pinMarker.space.name = record.getAttribute("nonce");

        addNonceMapping(pinMarker.space.name, '', '', '', '', 'Added Tack', '', '', true, pinMarker);

        map.addOverlay(pinMarker);

        //must be after addOverlay
        pinMarker.enableDragging();

        addNewPoint(pinMarker);

        setZIndex(pinMarker);

        correctMozillaBug();

        outputMessage("Drag tack to desired location.");
    };

    var url = "gennonce.php";

    Agent(url, genNonce, []);
}

var activeNonce = '';
var topZIndex = 25000;
var listener;

function openWindowCallback(tempPinMarker) {
    var curNonce = String(tempPinMarker.space.name);
    var curNonceInfo = nonceInfoArray[curNonce];
    var defaultPopup = String("defaultPopup" + curNonce);
    var editPopup = String("editPopup" + curNonce);
    var initPopup = String("initPopup" + curNonce);
    //alert(curNonceInfo['target'].point.x + " , " + curNonceInfo['target'].point.y);
    //alert(activeNonce + ":" + curNonce + ":" + curNonceInfo['editable']);
    //alert(curNonceInfo['type']);
    if ((activeNonce == tempPinMarker.space.name) && ((curNonceInfo['isTack']) || (curNonceInfo['type'] == 'wikis'))) {
        if (nonceInfoArray[curNonce]['isTack']) {
            document.getElementById(String("cancelEdit" + curNonce)).value = 'Delete Tack';
        }

        var itemCategoryE = String("itemCategoryE" + curNonce);
        document.getElementById(itemCategoryE).options.length = 0;
        for (var i = 0; i < catArray.length; i++) {
            document.getElementById(itemCategoryE).options[i] = new Option(catArray[i], catArray[i], false, false);
        }
        for (var j = 0; j < catArrayND.length; j++) {
            document.getElementById(itemCategoryE).options[i + j] = new Option(catArrayND[j], catArrayND[j], false, false);
        }

        if ((curNonceInfo['gpointxE'] != curNonceInfo['target'].point.x) || (curNonceInfo['gpointyE'] != curNonceInfo['target'].point.y)) {
            document.getElementById(defaultPopup).style.display = 'none';
            document.getElementById(editPopup).style.display = 'none';
            document.getElementById(initPopup).style.display = '';
            locationBubble(tempPinMarker);
        } else if (nonceInfoArray[curNonce]['editable']) {
            editData(curNonce);
        } else if (!nonceInfoArray[curNonce]['recent']) {
            var parseObj = function(result) {
                var xmlDoc = result.responseXML.documentElement;
                var row = xmlDoc.getElementsByTagName("rowitem").item(0);
                var itemName = String("itemName" + curNonce);
                var itemLocation = String("itemLocation" + curNonce);
                var itemCategory = String("itemCategory" + curNonce);
                var itemImages = String("itemImages" + curNonce);
                var itemDescription = String("itemDescription" + curNonce);

                var itemNameE = String("itemNameE" + curNonce);
                var itemLocationE = String("itemLocationE" + curNonce);
                var itemCategoryE = String("itemCategoryE" + curNonce);
                var itemDescriptionE = String("itemDescriptionE" + curNonce);

                document.getElementById(itemNameE).value = row.getAttribute("name");
                document.getElementById(itemName).innerHTML = row.getAttribute("name");
                curNonceInfo['name'] = row.getAttribute("name");
                curNonceInfo['nameE'] = row.getAttribute("name");
                document.getElementById(itemLocationE).innerHTML = row.getAttribute("location");
                document.getElementById(itemLocation).innerHTML = row.getAttribute("location");
                curNonceInfo['location'] = row.getAttribute("location");
                curNonceInfo['locationE'] = row.getAttribute("location");
                document.getElementById(itemCategory).innerHTML = row.getAttribute("category");

                var i;
                for (i = 0; i < document.getElementById(itemCategoryE).options.length; i++) {
                    if (document.getElementById(itemCategoryE).options[i].value == row.getAttribute("category")) {
                        document.getElementById(itemCategoryE).selectedIndex = i;
                    }
                }
                curNonceInfo['category'] = row.getAttribute("category");
                curNonceInfo['categoryE'] = row.getAttribute("category");

                //if (row.getAttribute("imageloc") == '')
                //  document.getElementById(itemImages).innerHTML = '0 Images';
                //else
                //  document.getElementById(itemImages).innerHTML = '1 Image';

                curNonceInfo['category'] = row.getAttribute("category");
                curNonceInfo['categoryE'] = row.getAttribute("category");

                document.getElementById(itemDescriptionE).value = row.getAttribute("description");
                document.getElementById(itemDescription).innerHTML = row.getAttribute("description");
                curNonceInfo['description'] = row.getAttribute("description");
                curNonceInfo['descriptionE'] = row.getAttribute("description");
            };

            var url = String("wikiviewobj.php?nonce=" + curNonce);

            Agent(url, parseObj, []);
        }
    }
}

function addNewPoint(tempPinMarker) {
    var curNonce = String(tempPinMarker.space.name);
    listener = GEvent.addListener(map, "infowindowopen", function() {
        openWindowCallback(tempPinMarker);
    });

    GEvent.bindDom(tempPinMarker.getMarkerTarget(), "mousedown", tempPinMarker, function(a) {
        setZIndex(nonceInfoArray[curNonce]['target']);
    });

    GEvent.bindDom(tempPinMarker.getMarkerTarget(), "mouseover", tempPinMarker, function(a) {
        //drawfloor(nonceInfoArray[curNonce]['location']);
        drawroom2(nonceInfoArray[curNonce]['location']);
    });

    // Added by Yoni to show contour of landmark space immediately.
    drawroom2(nonceInfoArray[curNonce]['location']);


    GEvent.bindDom(tempPinMarker.getMarkerTarget(), "click", tempPinMarker, function(a) {
        //prompt("",nonceInfoArray[curNonce]['target'].point.x + ',' + nonceInfoArray[curNonce]['target'].point.y);
        map.publicized.A(a);
        openMarkerInfo(curNonce);
        //alert(tempPinMarker.point.x + ":" + tempPinMarker.point.y);
    });
}


function addNonceMapping(nonce, name, location, gpointx, gpointy, category, imageloc, description, isTack, target) {
    var inArray = false;
    var displayIcon = true;
    var parentIcon = '';
    var locSelected;
    var editable;
    var recent;

    if (isTack) {
        locSelected = false;
        editable = true;
        recent = true;
    } else {
        locSelected = true;
        editable = false;
        recent = false;
    }

    for (var i = 0; i < nonceArray.length; i++) {
        if (nonce == nonceArray[i]) {
            inArray = true;
        }
    }

    //if (nonceInfoArray[nonce] != null)
    //  inArray = true;

    if (!inArray) {
        var nonceMapping = {
            'nonce': nonce,
            'name': name,
            'location': location,
            'gpointx': gpointx,
            'gpointy': gpointy,
            'category': category,
            'imageloc': imageloc,
            'description': description,
            'nameE': name,
            'locationE': location,
            'gpointxE': gpointx,
            'gpointyE': gpointy,
            'categoryE': category,
            'imagelocE': imageloc,
            'descriptionE': description,
            'target': target,
            'locSelected': locSelected,
            'displayed': true,
            'displayIcon': displayIcon,
            'parentIcon': parentIcon,
            'editable': editable,
            'isTack': isTack,
            'recent': recent
        };
        nonceArray.push(nonce);
        if (nonceInfoArray[nonce] == null) {
            nonceInfoArray[nonce] = nonceMapping;
        } else {
            return false;
        }

        nonceInfoArray[nonce] = nonceMapping;

        var parseObj = function(result) {
            var xmlDoc = result.responseXML.documentElement;
            var row = xmlDoc.getElementsByTagName("record").item(0);

            if (row.getAttribute("ret") != 'success') {
                outputMessage("There was an error saving session variables.");
            }
        };

        var url = String("wikiaddsessionvars.php?nonce=" + nonce);

        Agent(url, parseObj, []);

        return displayIcon;
    } else {
        return false;
    }
}

var nonceArray = [];
var nonceInfoArray = {};

var dbMapping = {
    Rooms: "space_name",
    Landmarks: "loc_id",
    Greens: "loc_id",
    Parking: "loc_id",
    Buildings: "facility",
    Floor: "facility"
};

function layerTransform(layer) {
    if (layer.indexOf("Floor") != -1) {
        return "Floor";
    } else {
        return layer;
    }
}

SpaceObject = function(text, layer, value) {

    this.name = text;
    this.dbLayer = layer;

    this.dbField = null;
    this.dbValues = [];

    if (layer) {
        this.dbField = dbMapping[layerTransform(layer)];
    }
    if (value) {
        this.dbValues.push(value);
    }
};

cNameURL = ['../cgi-bin/bcname?'];

function handleSearch(text) {
    var startMessage = [];
    startMessage.push('Searching..');

    var sMLength = startMessage.length;

    var rnd_no = Math.round((sMLength - 1) * Math.random());

    outputMessage(startMessage[rnd_no]);

    var from = new SpaceObject();
    var to = new SpaceObject();
    var debug;

    launchRouteFinder = function() {
        if (from.dbValues.length > 0 && to.dbValues.length > 0) {
            retrieveRoute(from, to, debug);
        }
    };

    getCName = function(result, start) {
        if (result.responseText) {
            if (start) {
                from.dbValues.push(result.responseText);
            } else {
                to.dbValues.push(result.responseText);
            }
            launchRouteFinder();
        }
    };

    if (text.indexOf("route ") != -1) {

        text = text.replace("route ", "");
        var nodes = text.split(" to ");

        debug = nodes[2] == "debug";
        overlay = nodes[2] == "overlay";

        from.name = nodes[0].toUpperCase();
        to.name = nodes[1].toUpperCase();

        var urlFrom = cNameURL + from.name;
        var urlTo = cNameURL + to.name;

        //Agent(urlFrom, getCName, [true]);
        //Agent(urlTo, getCName, [false]);

        from.dbValues.push(from.name);
        to.dbValues.push(to.name);

        retrieveRoute(from, to, debug, overlay);

    } else if (text.indexOf(":") != -1) {
        //if (text.indexOf(":") != -1) {
        var query = text.split(":");

        var method = query[0];
        var args = query[1];

        args = args.replace(/ /g, "");

        eval(method + "(\"" + args + "\")");
    } else {
        var type = document.getElementById("select_formfield").value;
        if (type != 'all')
            text += ' ' + type;
        getSpaceAndGenMarker(text);
    }
}

function getSpaceAndGenMarker(text) {
    text = escape(text);
    var value;
    var layer;

    var url = String("handleSearch.php?query=" + text);

    var resolveSpaceName = function(result) {
        var xmlDoc = result.responseXML.documentElement;
        var type = xmlDoc.getElementsByTagName("type").item(0);
        if (type.getAttribute("name") == 'spaces') {
            resetObjs();
            var record = xmlDoc.getElementsByTagName("record").item(0);
            if (record.getAttribute("message") == "success") {
                text = record.getAttribute("origname");
                value = record.getAttribute("name");
                layer = record.getAttribute("layer");
                if ((record.getAttribute("type") == "floor") || (layer == "Rooms") || (layer == "Buildings")) {
                    draw(value, text);
                } else {
                    IMSSpaceRequest(text, value, layer);
                }
            } else {
                outputMessage(record.getAttribute("message"));
            }
        } else if (type.getAttribute("name") == 'wikis') {
            resetObjs();
            WikiObj.addObjsResult(result);
        } else if (type.getAttribute("name") == 'schedule') {
            resetObjs();
            SchedObj.addObjsResult(result);
        } else if (type.getAttribute("name") == 'equipment') {
            resetObjs();
            EquipObj.addObjsResult(result);
        } else if (type.getAttribute("name") == 'people') {
            resetObjs();
            PeopleObj.addObjsResult(result);
        } else {
            var record = xmlDoc.getElementsByTagName("record").item(0);
            outputMessage(record.getAttribute("message"));
        }
    };
    Agent(url, resolveSpaceName, []);
}

function IMSSpaceRequest(text, value, layer) {
    // Query selection URL
    var queryURL = ["../cgi-bin/shared/imsreq.xml?request=getselection&type=query&layer=", "&idfield=", "&query=", "+in+('", "')"];

    var spaceObject = new SpaceObject(text, layer, value);

    var setBounds = function(result) {

        var spaceBounds = new GBounds();
        var xmlDoc = result.responseXML.documentElement;
        var extent = xmlDoc.getElementsByTagName("Extent").item(0);

        if (extent) {
            spaceBounds.minX = Number(extent.getAttribute("minx"));
            spaceBounds.minY = Number(extent.getAttribute("miny"));
            spaceBounds.maxX = Number(extent.getAttribute("maxx"));
            spaceBounds.maxY = Number(extent.getAttribute("maxy"));
        } else {
            return;
        }

        spaceObject.extent = spaceBounds;

        map.centerAndZoom(spaceObject.extent.getCentroid(), 9);
        message = text + " shown on map";
        outputMessage(message);
    };

    if (spaceObject.dbLayer && spaceObject.dbField && spaceObject.dbValues) {
        var url = queryURL[0] + spaceObject.dbLayer + queryURL[1] + spaceObject.dbField +
            queryURL[2] + spaceObject.dbField + queryURL[3] + spaceObject.dbValues.join() + queryURL[4];
        Agent(url, setBounds, []);
    } else {
        return;
    }
}
