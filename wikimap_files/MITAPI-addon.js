function modifyAPI(map) {

map.publicize('A'); //check - event cancellation
map.publicize('$'); //check - drag object
map.publicize('l'); //check - x+'px'
map.publicize('u'); //check - ua info
map.publicize('F'); //check - cursor setter


GBounds.prototype.getCentroid = function() {return new GPoint(this.minX+((this.maxX-this.minX)/2), this.maxY-((this.maxY-this.minY)/2)); };

GBounds.prototype.isValidExtent = function() {return this.minX && this.minY && this.maxX && this.maxY; };

GBounds.prototype.coordinates = "sp";

GPoint.prototype.coordinates = "sp";    // Should we make a coordinate object that includes its type/units and some methods?

map.addOverlay = function(a) {

     if (a.icon && !a.icon.transparent)
          a.icon.transparent = "mapfiles/transparent.gif";

     this.overlays.push(a);
     a.initialize(this);
     a.redraw(true);
     this.reOrderOverlays();
     var b = this;
     if (a.makeMovable)
          a.makeMovable();  // onmousedown control of a.transparentIcon transferred to a.markerDragObject. To bind a mousedown trigger
                            // to the marker, use addListener/bind on markerDragObject instead of native event binding on a.transparentIcon.
                            // Mousedown triggering still occurs on markerDragObject even when dragging is disabled.
     GEvent.addListener(a, "click", function() { GEvent.trigger(b, "click", a) });
     GEvent.trigger(this, "addoverlay", a);
}


// Previously, this method assumed the use of a latlon coordinate system
// and thus did some spherical manipulation. This method assumes the math
// is done elsewhere.
map.getCenterLatLng = function(a) {

     if (!a) a = new GPoint(0,0);
     if (this.centerLatLng) {
          a.x = this.centerLatLng.x;
          a.y = this.centerLatLng.y
     } else {
          var b = null;
          if (this.lastLatLng && this.centerScreen.equals(this.lastCenterScreen)) {
               b = this.spec.getBitmapCoordinate(this.lastLatLng.y,this.lastLatLng.x,this.zoomLevel);
          }
          if (b && b.equals(this.centerBitmap)) {
               a.x = this.lastLatLng.x;
               a.y = this.lastLatLng.y;
          } else {
               var c = this.spec.getLatLng(this.centerBitmap.x,this.centerBitmap.y,this.zoomLevel);
               a=c;
          }
     }

     return a;

}


// This method is different from the shrink-wrapped
// version in that a map-blowup is pannable.
map.showMapBlowup = function(a,b,c,d,e,f) {

     if(!this.infoWindowEnabled()) return;

     var h=b?b:this.mapBlowupZoom;
     var g=c?c:this.mapBlowupSpec;
     var i=document.createElement("div");

     i.style.border="1px solid #979797";
     i.style.width=map.publicized.l(200);
     i.style.height=map.publicized.l(200);

     var n=this.copy(i,200,200,a,h,g,true);        // map object 'n' bound (appended) to div 'i' inside the map object.

     n.disableInfoWindow();
     n.addControl(new GSmallZoomControl());

     var l=e;

     if(map.publicized.u.type==1) {
          l=function() {
               try{
                    n.redrawOverlays()
               } catch(r) {
                    GLog.dump(r)
               }
               if(e) e()
          }
     }
     if(n.mapTypes.length>1) {
          n.addControl(new GMapTypeControl(true))
     }
     this.openInfoWindow(a,i,d,l,f);
     GEvent.bind(n,"moveend",this,function(){this.mapBlowupZoom=n.zoomLevel;this.mapBlowupSpec=n.spec});
     return n;

}


// Fixed an 'arguments' bug.
GEvent.prototype.bind = function(a,b,c,d) {

     var argumentsList = [];
     if (arguments.length > 4) for (var i=4; i<arguments.length; i++) argumentsList.push(arguments[i]);

     return GEvent.addListener(a, b, function() { d.apply(c, argumentsList) });

};




GMarker.prototype.getMarkerTarget = function() {

     if (!this.markerTarget) {

          this.markerTarget = this.iconImage;

          //if (this.transparentIcon)
          //     this.markerTarget = this.transparentIcon;

          if (this.imageMap)
               this.markerTarget = this.imageMap.getElementsByTagName("area").item(0);
          else
               this.map.publicized.F(this.markerTarget, "pointer");
     }

     return this.markerTarget;

}


GMarker.prototype.enableDragging = function() {
     
     this.markerDragObject.enable();

}

GMarker.prototype.disableDragging = function() {
     
     this.markerDragObject.disable();

}


GMarker.prototype.onClick = GMarker.prototype.onMouseDown;     // We create a new callback function for the native click handling we will add in
                                                               // makeMovable. This callback will take the place of the mousedown callback. We are
GMarker.prototype.onMouseDown = function(a) {}                 // nulling that callback to avoid collision with the native mousedown handling
                                                               // that exists in markerDragObject. We can't remove the native handling here (because
                                                               // the adapter is anonymous and we can't reference it to remove it) so affecting the
                                                               // callback is the next best thing.

GMarker.prototype.makeMovable = function() {

     var a = this;
     var b = this.getMarkerTarget();

//x=a.map.getDivCoordinate(a.map.spec.getBitmapCoordinate(a.point.y,a.point.x,a.map.zoomLevel).x,a.map.spec.getBitmapCoordinate(a.point.y,a.point.x,a.map.zoomLevel).y)
     if (!b) return;

     GEvent.bindDom(b,"click",this,this.onClick);                    // We bind the native click event to transparentIcon. The event takes the place of mousedown.
     this.markerDragObject = new map.publicized.$(b);                // markerDragObject takes control over native mousedown events for transparentIcon.

     if (b.toString() == "[object HTMLAreaElement]") this.markerDragObject.moveTo(a.iconImage.offsetLeft, a.iconImage.offsetTop);

     // The API user can remove this binding by invoking removeListener(token) where token is returned by bind (not assigned below).
     GEvent.bind(this.markerDragObject, "mousedown", this.map, this.map.closeInfoWindow);

     GEvent.bind(this.markerDragObject, "move", this.markerDragObject, function() {
          a.point = a.map.containerCoordToLatLng(new GPoint(this.left + a.icon.iconAnchor.x, this.top + a.icon.iconAnchor.y));
          a.redraw(true);
     });

     //Update the marker's location after a map pan.
     GEvent.bind(this.map, "moveend", this.markerDragObject, function() {
          this.left = this.src.offsetLeft + a.map.dragObject.left;
          this.top = this.src.offsetTop + a.map.dragObject.top;
     });

     this.disableDragging();                                        // Disable dragging by default.

}

} // END modifyAPI;