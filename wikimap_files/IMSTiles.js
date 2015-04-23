/// Map Specification for MIT Map Layer; Includes both map and aerial views.

function _ims(tileType,tileName,tileNameShort) {

        // Keep in mind that the ordering of the layers here is how they are stacked in the rendered image.
        // Putting 'Buildings' after 'Rooms' might/would obstruct a room highlight.
        
		this.mitLayers = {
                                MIT_SVG         :"m",
                                MIT_Aerial      :"a",
                                MIT_Hybrid      :"h"
            }
		

        //this.mitUrl = ["http://ims.mit.edu/WMS_MS/WMS.asp?request=getmap&version=1.1.1&width=","&height=","&bbox=",",",",",",","&layers="];
		this.mitUrl = ["http://wikimap.csail.mit.edu/federation/IMS/cacheImages.php?img=", "&type="];
		this.mitOptionalUrl = "";

	this.numZoomLevels = 15;                                // Zoom levels from 0 to 14 (level 14 has extent 2x1 regardless of tileSize).
        this.baseOrigin = {x:2,y:1,zoom:this.numZoomLevels-2}   // At zoom-level 13 (defined to have an extent of 4x2), we "want" our 
                                                                // center map tile to be at (2,1), effectively setting our tile origin;

        // this.mitOriginStatePlane = {x:703525,y:498540};      // MIT Campus
        // this.mitExtentStatePlane = {x:11460,y:-5730};
        this.mitOriginStatePlane = {x:693000,y:504000};         // MIT and surrounding metropolitan area
        this.mitExtentStatePlane = {x:30000,y:-15000};

        this.backgroundColor="black"; //"#e5e3df";
	this.tileName = tileName;
        this.tileNameShort = tileNameShort;
	this.tileType = tileType;
	this.tileSize = 512;                                    // The lowest zoom-level will always have a 2x1 tile extent, so the tile size
                                                                // will determine the lowest zoom granularity.

        this.emptyTileUrl = "mapfiles/mit-transparent-512.gif";
        this.numTiles=[];

        for(var a = this.numZoomLevels-1; a >= 0; --a)
                this.numTiles[a]=Math.pow(2,this.numZoomLevels-a);

}


_ims.prototype.adjustBitmapX = function(geoX,zoom) {

	return geoX;                                                       // No map wrapping occurs when the abscissa limits are reached.

}

_ims.prototype.getBitmapCoordinate = function(geoY,geoX,zoom,point) {

        if (!point) point = new GPoint(0,0);

        var a = ((geoX - this.mitOriginStatePlane.x) / this.mitExtentStatePlane.x) * (this.numTiles[zoom] * this.tileSize);
        var b = ((geoY - this.mitOriginStatePlane.y) / this.mitExtentStatePlane.y) * (this.numTiles[zoom]/2 * this.tileSize);

        point.x = a;
        point.y = b;

        return point;

}

_ims.prototype.getGeographicCoordinates = function(x,y,zoom,point) {

        return this.getLatLng(x,y,zoom,point);

}

_ims.prototype.getLatLng = function(x,y,zoom,point) {

        if (!point) point = new GPoint(0,0);

        var a = this.mitOriginStatePlane.x + this.mitExtentStatePlane.x * (x / (this.numTiles[zoom] * this.tileSize));
        var b = this.mitOriginStatePlane.y + this.mitExtentStatePlane.y * (y / (this.numTiles[zoom]/2 * this.tileSize));

        point.x = a;
        point.y = b;

        return point;

}

_ims.prototype.getTileCoordinate = function(geoY,geoX,zoom,point) {

	var a = this.getBitmapCoordinate(geoY,geoX,zoom,point);

	a.x = Math.floor(a.x / this.tileSize);
	a.y = Math.floor(a.y / this.tileSize);

	return a;

}

_ims.prototype.getTileURL = function(x,y,zoom) {
        zoom = this.numZoomLevels - zoom;

        if ( x < 0 || y < 0 || x > Math.pow(2, zoom) - 1 || y > Math.pow(2, zoom - 1) - 1 ) return this.emptyTileUrl;

        var code = "";

        for (var z = zoom; z > 0; z--) {

                var pow = Math.pow(2, z - 1);

                var a = x - pow;
                var b = y - pow;

                var i = a < 0 ? pow : 0;
                var j = b < 0 ? pow : 0;

                x = i + a;
                y = j + b;

                var tt = 4 - (i + 2*j)/pow;

                code += String(tt);

        }

        return this.mitUrl[0] + code + this.mitUrl[1] + this.mitLayers[this.tileType];
//prompt("",layersArrayJoin);
//prompt("", url + " (" + x + ", " + y + ", " + zoom + ")")

}


_ims.prototype.getLinkText = function() {

        return this.tileName;

}

_ims.prototype.getShortLinkText = function() {

        return this.tileNameShort;

}

_ims.prototype.zoomBitmapCoord = function(newZoom,oldZoom,point) {

        var d = new GPoint();
        var e = Math.pow(2,oldZoom-newZoom);

        d.x = Math.round(point.x * e);
        d.y = Math.round(point.y * e);

        return d;

}


_ims.prototype.getURLArg = function() {return null}


_ims.prototype.isInTileBoundsY = function(a,b) {

        return 0 <= a && a < this.numTiles[b];

}


_ims.prototype.hasOverlay = function() {return false}


_ims.prototype.getLowestZoomLevel = function(geoPoint,geoSpan,pixelSpan) {

        var d = pixelSpan.width/2;
        var e = pixelSpan.height/2;

        for (var f=0; f<this.numZoomLevels; f++) {
                var h = this.getBitmapCoordinate(geoPoint.y,geoPoint.x,f);
                var g = this.getLatLng(h.x-d,h.y-e,f);                          // Upper-left
                var i = this.getLatLng(h.x+d,h.y+e,f);                          // Lower-right
                var n = i.x - g.x;
                var l = g.y - i.y;
                if (geoSpan.width <= n && geoSpan.height <= l) {
                        return f;
                }
        }

        return this.numZoomLevels-1;

}


IMSMapSpec = _ims;
