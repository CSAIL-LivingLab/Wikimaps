function MITMapsNamespace() {

   function Cb(a, b, c) {
       this.type = a;
       this.version = b;
       this.os = c
   };
   var u = new Cb(0, 0, null);
   var ba = navigator.userAgent.toLowerCase();
   if (ba.indexOf("opera") != -1) {
       u.type = 4;
       if (ba.indexOf("opera/7") != -1 || ba.indexOf("opera 7") != -1) {
           u.version = 7
       } else if (ba.indexOf("opera/8") != -1 || ba.indexOf("opera 8") != -1) {
           u.version = 8
       }
   } else if (ba.indexOf("msie") != -1 && document.all) {
       u.type = 1;
       if (ba.indexOf("msie 5")) {
           u.version = 5
       }
   } else if (ba.indexOf("safari") != -1) {
       u.type = 3
   } else if (ba.indexOf("mozilla") != -1) {
       u.type = 2
   }
   if (ba.indexOf("x11;") != -1) {
       u.os = 1
   } else if (ba.indexOf("macintosh") != -1) {
       u.os = 2
   };

   var R = Number.MAX_VALUE;

   function na(a, b, c) {
       var d = window.setTimeout(function() {
           b.apply(a)
       }, c);
       return d
   }

   function xb(a, b, c) {
       var d = window.setInterval(function() {
           b.apply(a)
       }, c);
       return d
   }

   function oa(a) {
       return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   }

   function cd(a) {
       return oa(a).replace(/\"/g, "&quot;")
   }
   Array.prototype.clear = function() {
       while (this.length > 0) this.pop()
   };
   document.getElementsByClassName = function(a) {
       var b = document.all;
       if (!b) b = document.getElementsByTagName("*");
       var c = [];
       for (var d = 0; d < b.length; d++) {
           if (b[d].className == a) {
               c[c.length] = b[d]
           }
       }
       return c
   };

   function F(a, b) {
       try {
           a.style.cursor = b
       } catch (c) {
           if (b == "pointer") {
               F(a, "hand")
           }
       }
   }

   function A(a) {
       if (u.type == 1) {
           window.event.cancelBubble = true;
           window.event.returnValue = false
       } else {
           a.cancelBubble = true;
           a.preventDefault();
           a.stopPropagation()
       }
   }

   function Ya(a) {
       if (u.type == 1) {
           window.event.cancelBubble = true
       } else {
           a.stopPropagation()
       }
   }
   if (!Array.prototype.push) {
       Array.prototype.push = function(a) {
           this[this.length] = a
       }
   }

   function qb(a) {
       return document.getElementById(a)
   }

   function l(a) {
       return Math.round(a) + "px"
   }

   function Ia(a, b) {
       if (a.className) {
           a.className += " " + b
       } else {
           a.className = b
       }
   }

   function La(a) {
       var b = {
           "x": 0,
           "y": 0
       };
       while (a) {
           b.x += a.offsetLeft;
           b.y += a.offsetTop;
           a = a.offsetParent
       }
       return b
   }

   function va(a, b) {
       if (typeof a.offsetX != "undefined") {
           var c = a.target || a.srcElement;
           var d = Xc(c, b);
           return new q(a.offsetX + d.x, a.offsetY + d.y)
       } else if (typeof a.pageX != "undefined") {
           var e = La(b);
           return new q(a.pageX - e.x, a.pageY - e.y)
       } else {
           y.incompatible("dblclick");
           return new q()
       }
   }

   function Xc(a, b) {
       var c = {
           "x": 0,
           "y": 0
       };
       while (a && a != b) {
           c.x += a.offsetLeft;
           c.y += a.offsetTop;
           a = a.offsetParent
       }
       return c
   }

   function _nullFunction() {};

   function ja() {}
   ja.create = function(a, b, c, d, e, f, h, g, i, m) {
       var n;
       i = i || document;
       if (!m) {
           n = i.createElement("img");
           if (a) {
               n.src = a
           }
       } else {
           n = m(a, h, i)
       }
       if (b && c) {
           n.style.width = l(b);
           n.style.height = l(c);
           n.width = b;
           n.height = c
       }
       if (e || (d || (e == 0 || d == 0))) {
           n.style.position = "absolute";
           n.style.left = l(d);
           n.style.top = l(e)
       }
       if (f || f == 0) {
           n.style.zIndex = f
       }
       if (u.type == 1) {
           n.unselectable = "on";
           n.onselectstart = Xa
       } else {
           n.style.MozUserSelect = "none"
       }
       if (u.type == 1) {
           n.galleryImg = "no"
       }
       n.style.border = "0";
       n.style.padding = "0";
       n.style.margin = "0";
       n.oncontextmenu = Xa;
       if (g) {
           Ia(n, g)
       }
       return n
   };

   function o() {}
   o.create = function(a, b, c, d, e, f, h, g, i) {
       return ja.create(a, b, c, d, e, f, h, g, i, o.createElement)
   };
   o.createElement = function(a, b, c) {
       if (typeof arguments.callee.hasFilters == "undefined") {
           var d = document.createElement("div");
           arguments.callee.hasFilters = typeof d.style.filter != "undefined"
       }
       var e;
       if (arguments.callee.hasFilters) {
           var f = c.PNG_cache;
           if (f && f.childNodes.length > 0) {
               e = f.removeChild(f.lastChild)
           } else {
               e = c.createElement("div");
               o.destroyBeforeUnload(e)
           }
           if (!e.loader) {
               e.loader = c.createElement("img");
               e.loader.style.visibility = "hidden";
               e.loader.onload = function() {
                   if (!e.cleared) {
                       e.style.filter = o.alphaImageLoader(this.src, this.ieCrop);
                       e.src = a
                   }
               }
           }
       } else {
           e = c.createElement("img")
       }
       o.setImage(e, a, b);
       return e
   };
   o.alphaImageLoader = function(a, b) {
       var c = "DXImageTransform.Microsoft.AlphaImageLoader";
       var d = b ? ",sizingMethod=crop" : "";
       return "progid:" + c + '(src="' + a + '"' + d + ")"
   };
   o.remove = function(a, b) {
       if (a.nodeName == "DIV") {
           if (!b.PNG_cache) {
               b.PNG_cache = b.createElement("div");
               b.PNG_cache.style.display = "none";
               b.body.appendChild(b.PNG_cache)
           }
           b.PNG_cache.appendChild(a);
           o.clearImage(a)
       } else {
           a.parentNode.removeChild(a)
       }
   };
   o.setImage = function(a, b, c) {
       if (a.tagName == "DIV") {
           a.cleared = false;
           a.loader.ieCrop = c || false;
           a.loader.src = b
       } else {
           a.src = b
       }
   };
   o.clearImage = function(a, b) {
       if (a.tagName == "DIV") {
           a.cleared = true;
           a.style.filter = ""
       } else {
           a.src = b
       }
   };
   o.destroyBeforeUnload = function(a) {
       if (!o.cleanupQueue) {
           o.cleanupQueue = [];
           j.addBuiltInListener(window, "unload", o.onUnload)
       }
       o.cleanupQueue.push(a)
   };
   o.onUnload = function() {
       for (var a = 0; a < o.cleanupQueue.length; ++a) {
           o.destroyImage(o.cleanupQueue[a])
       }
   };
   o.destroyImage = function(a) {
       if (a.loader) {
           a.loader.onload = null;
           a.loader = null
       }
   };

   function j() {}
   j.addListener = function(a, b, c) {
       var d = j.getPropertyName(b);
       if (a[d]) {
           a[d].push(c)
       } else {
           a[d] = [c]
       }
       return new Sb(a, d, c)
   };
   j.removeListener = function(a) {
       var b = a.instance[a.propertyName];
       for (var c = 0; c < b.length; c++) {
           if (b[c] == a.listenerFn) {
               b.splice(c, 1);
               return
           }
       }
   };
   j.clearListeners = function(a, b) {
       var c = j.getPropertyName(b);
       a[c] = null
   };
   j.trigger = function(a, b) {
       var c = j.getPropertyName(b);
       var d = a[c];
       if (d && d.length > 0) {
           var e = [];
           for (var f = 2; f < arguments.length; f++) {
               e.push(arguments[f])
           }
           for (var f = 0; f < d.length; f++) {
               var h = d[f];
               if (h) {
                   try {
                       h.apply(a, e)
                   } catch (g) {
                       y.dump(g)
                   }
               }
           }
       }
   };

   function Sb(a, b, c) {
       this.instance = a;
       this.propertyName = b;
       this.listenerFn = c
   }
   j.getPropertyName = function(a) {
       return "_e__" + a
   };
   j.addBuiltInListener = function(a, b, c) {
       if (u.type == 3 && b == "dblclick") {
           a["on" + b] = c;
           return
       }
       if (a.addEventListener) {
           a.addEventListener(b, c, false)
       } else if (a.attachEvent) {
           a.attachEvent("on" + b, c)
       } else {
           a["on" + b] = c
       }
   };
   j.removeBuiltInListener = function(a, b, c) {
       if (a.removeEventListener) {
           a.removeEventListener(b, c, false)
       } else if (a.detachEvent) {
           a.detachEvent("on" + b, c)
       } else {
           a["on" + b] = null
       }
   };
   j.bindDom = function(a, b, c, d) {
       var e = j.createAdapter(c, d);
       return j.addBuiltInListener(a, b, e)
   };
   j.bind = function(a, b, c, d) {
       return j.addListener(a, b, function() {
           d.apply(c, arguments)
       })
   };
   j.callback = function(a, b) {
       var c = function() {
           return b.apply(a, arguments)
       };
       return c
   };
   j.createAdapter = function(a, b) {
       return function(c) {
           if (!c) {
               c = window.event
           }
           if (c && !c.target) {
               c.target = c.srcElement
           }
           b.call(a, c)
       }
   };

   function pa(a) {
       this.size = 0;
       if (a) {
           for (var b = a.length - 1; b >= 0; b--) this.add(a[b])
       }
   }
   pa.prototype.add = function(a) {
       if (!this.contains(a)) {
           this[":" + a] = 1;
           this.size++
       }
   };
   pa.prototype.remove = function(a) {
       if (this.contains(a)) {
           delete this[":" + a];
           this.size--
       }
   };
   pa.prototype.contains = function(a) {
       return this[":" + a] == 1
   };

   function Xa() {
       return false
   }

   function ob(a) {
       if (!a) {
           if (Error) {
               throw "assertion failed: " + Error().stack;
           } else {
               throw "assertion failed";
           }
       }
   };

   function $(a, b, c, d) {
       this.src = a;
       this.container = d;
       this.disabled = false;
       this.dragPoint = new q(0, 0);
       this.dragging = false;
       this.clickStartPos = new q(0, 0);
       this.src.style.position = "absolute";
       this.moveTo(b != null ? b : a.offsetLeft, c != null ? c : a.offsetTop);
       this.mouseDownHandler = j.createAdapter(this, this.onMouseDown);
       this.mouseMoveHandler = j.createAdapter(this, this.onMouseMove);
       this.mouseUpHandler = j.createAdapter(this, this.onMouseUp);
       if (u.type == 2) {
           j.bindDom(window, "mouseout", this, this.onWindowMouseOut)
       }
       this.eventSrc = this.src.setCapture ? this.src : window;
       j.addBuiltInListener(this.src, "mousedown", this.mouseDownHandler);
       j.bindDom(this.src, "mouseup", this, this.onDisabledMouseUp);
       j.bindDom(this.src, "click", this, this.onDisabledClick)
   }
   $.prototype.moveTo = function(a, b) {
       if (this.left != a || this.top != b) {
           this.left = a;
           this.top = b;
           this.src.style.left = this.left + "px";
           this.src.style.top = this.top + "px";
           j.trigger(this, "move")
       }
   };
   $.prototype.onDisabledClick = function(a) {
       if (this.disabled) {
           j.trigger(this, "click", a)
       }
   };
   $.prototype.onDisabledMouseUp = function(a) {
       if (this.disabled) {
           j.trigger(this, "mouseup", a)
       }
   };
   $.prototype.onMouseDown = function(a) {
       j.trigger(this, "mousedown", a);
       if (a.cancelDrag) {
           return
       }
       var b = a.button == 0 || a.button == 1;
       if (this.disabled || !b) {
           A(a);
           return false
       }
       this.dragPoint.x = a.clientX;
       this.dragPoint.y = a.clientY;
       this.dragging = true;
       j.addBuiltInListener(this.eventSrc, "mousemove", this.mouseMoveHandler);
       j.addBuiltInListener(this.eventSrc, "mouseup", this.mouseUpHandler);
       if (this.src.setCapture) {
           this.src.setCapture()
       }
       this.clickStartTime = (new Date()).getTime();
       this.clickStartPos.x = a.clientX;
       this.clickStartPos.y = a.clientY;
       j.trigger(this, "dragstart");
       this.originalCursor = this.src.style.cursor;
       F(this.src, "move");
       A(a)
   };
   $.prototype.onMouseMove = function(a) {
       if (u.os == 1) {
           if (a == null) {
               return
           }
           if (this.dragDisabled) {
               this.savedMove = new Object();
               this.savedMove.clientX = a.clientX;
               this.savedMove.clientY = a.clientY;
               return
           }
           na(this, function() {
               this.dragDisabled = false;
               this.onMouseMove(this.savedMove)
           }, 30);
           this.dragDisabled = true;
           this.savedMove = null
       }
       var b = this.left + (a.clientX - this.dragPoint.x);
       var c = this.top + (a.clientY - this.dragPoint.y);
       var d = 0;
       var e = 0;
       if (this.container) {
           var f = b;
           if (b < this.container.minX) {
               f = this.container.minX
           } else {
               var h = this.container.maxX - this.src.offsetWidth;
               if (b > h) {
                   f = h
               }
           }
           d = f - b;
           b = f;
           var g = c;
           if (c < this.container.minY) {
               g = this.container.minY
           } else {
               var i = this.container.maxY - this.src.offsetHeight;
               if (c > i) g = i
           }
           e = g - c;
           c = g
       }
       this.moveTo(b, c);
       this.dragPoint.x = a.clientX + d;
       this.dragPoint.y = a.clientY + e;
       j.trigger(this, "drag")
   };
   $.prototype.onMouseUp = function(a) {
       j.trigger(this, "mouseup", a);
       j.removeBuiltInListener(this.eventSrc, "mousemove", this.mouseMoveHandler);
       j.removeBuiltInListener(this.eventSrc, "mouseup", this.mouseUpHandler);
       this.dragging = false;
       F(this.src, this.originalCursor);
       if (document.releaseCapture) {
           document.releaseCapture()
       }
       j.trigger(this, "dragend");
       var b = (new Date()).getTime();
       if (b - this.clickStartTime <= 500 && (Math.abs(this.clickStartPos.x - a.clientX) <= 2 && Math.abs(this.clickStartPos.y - a.clientY) <= 2)) {
           j.trigger(this, "click", a)
       }
   };
   $.prototype.onWindowMouseOut = function(a) {
       if (!a.relatedTarget && this.dragging) {
           this.onMouseUp(a)
       }
   };
   $.prototype.disable = function() {
       this.disabled = true
   };
   $.prototype.enable = function() {
       this.disabled = false
   };

   var p = "http://www.google.com/mapfiles/";
   var nb = "http://maps.google.com";
   var ma = p + "transparent.gif";
   var Ga = ["q", "ll", "sll", "spn", "sspn", "vp", "z", "t", "output", "deb", "f", "file", "saddr", "daddr", "near", "stat_m", "key", "cid", "num", "start"];

   function E() {
       this.args = new Object();
       this.reset()
   }
   E.prototype.setValue = function(a, b) {
       this.args[a] = b
   };
   E.prototype.setQueryValue = function(a, b) {
       var c = b.replace(/^\s*|\s*$/g, "");
       this.setValue(a, c)
   };
   E.prototype.setAllMapValues = function(a) {
       this.setValue("ll", this.getLatLngArg(a.getCenterLatLng()));
       this.setValue("spn", this.getSpanArg(a.getSpanLatLng()));
       this.setValue("z", a.zoomLevel);
       this.setValue("t", a.spec.getURLArg())
   };
   E.prototype.getLatLngArg = function(a) {
       return Ka(a.y) + "," + Ka(a.x)
   };
   E.prototype.getSpanArg = function(a) {
       return Ka(a.height) + "," + Ka(a.width)
   };
   E.prototype.reset = function() {
       for (var a = 0; a < Ga.length; a++) {
           this.args[Ga[a]] = null
       }
   };
   E.prototype.getURL = function(a, b) {
       var c = new Array();
       for (var d = 0; d < Ga.length; d++) {
           var e = Ga[d];
           if (this.args[e]) {
               c.push(e + "=" + this.beautify(encodeURIComponent(this.args[e])))
           }
       }
       if (window._sf && window._sf.length > 0) {
           c.push(window._sf)
       }
       var f = "/maps";
       if (c.length > 0) f += "?" + c.join("&");
       if (a) {
           var h;
           if (b) {
               h = "http://" + window.location.host
           } else {
               h = nb
           }
           f = h + f
       }
       return f
   };
   E.prototype.beautify = function(a) {
       return a.replace(/%20/g, "+").replace(/%2C/gi, ",")
   };
   E.getFileURL = function(a) {
       var b = new E();
       b.setValue("file", a);
       return b.getURL()
   };
   E.getPrintImageUrl = function(a) {
       var b = a.map.getCenterLatLng();
       var c = a.map;
       var d = {
           "x": c.viewSize.width,
           "y": c.viewSize.height
       };
       var e = {
           "x": c.centerBitmap.x - d.x / 2,
           "y": c.centerBitmap.y - d.y / 2
       };
       var f = c.zoomLevel;
       while (d.x * d.y > 480000) {
           var h = a.map.spec.zoomBitmapCoord(f + 1, f, e);
           var g = a.map.spec.zoomBitmapCoord(f + 1, f, d);
           f = f + 1;
           e = h;
           d = g
       }
       var i = "c=" + Math.floor(b.x * 1000000);
       i += "," + Math.floor(b.y * 1000000);
       i += "&r=" + d.x;
       i += "," + d.y;
       i += "&z=" + f;
       if (a.vpage.overlays.length > 0) {
           var m = a.vpage.overlays[0].markers;
           for (var n = 0; n < m.length; ++n) {
               var s = m[n];
               var t = s.point;
               var v = this.printIconId(s.id);
               i += this.locationAsUrlParam(t.x, t.y, v)
           }
       }
       i += this.directionsAsUrlParam(a, f, e);
       var N;
       if (window.location.host.match(/:(.*)/) && RegExp.$1 != "80") {
           N = window.location.host.replace(/:.*/, ":9589")
       } else {
           N = window.location.host.replace(/:.*/, "")
       }
       var O = "http://" + N + "/mapprint?" + i;
       y.write(O);
       return O
   };
   E.printIconId = function(a) {
       var b = {
           "A": 17,
           "B": 18,
           "C": 19,
           "D": 20,
           "E": 21,
           "F": 22,
           "G": 23,
           "H": 24,
           "I": 25,
           "J": 26
       };
       var c = b[a] || 16;
       return c
   };
   E.locationAsUrlParam = function(a, b, c) {
       var d = "";
       d += "&l=" + Math.floor(a * 1000000);
       d += "," + Math.floor(b * 1000000);
       d += "," + c;
       return d
   };
   E.directionsAsUrlParam = function(a, b, c) {
       var d = a.vpage.directions;
       if (!d) {
           return ""
       }
       var e = d.polyline;
       var f = a.map;
       var h = f.getBoundsLatLng();
       var g;
       var i = e.getDrawingTolerance();
       do {
           var m = e.getVectors(h, i);
           var n = [];
           var s = new z();
           e.getBitmapVectors(m, n, s, b);
           g = e.getEncodedImageSource(n, c.x, c.y);
           ++i
       } while (g.length > 900);
       var t = "&p=" + g;
       var v = e.getPoint(0);
       var N = (e.points.length >> 1) - 1;
       var O = e.getPoint(N);
       t += this.locationAsUrlParam(v.x, v.y, 31);
       t += this.locationAsUrlParam(O.x, O.y, 32);
       return t
   };
   E.getTileBaseUrl = function(a, b, c, e) {
       var d = a || (b || "");
       if (d.indexOf("?") == -1) {
           d += "?"
       } else {
           d += "&"
       }
       if (c) {
           d += "v=" + encodeURIComponent(c) + "&n=" + encodeURIComponent(e) + "&"
       }
       return d
   };

   function Ka(a) {
       if (a.toFixed) {
           return a.toFixed(6).toString()
       } else {
           return a.toString()
       }
   };

   var ha = new Object();

   function ea(a, b) {
       this.id = a;
       this.ticketClass = b
   }
   ea.create = function(a) {
       if (!a) a = "_dtc";
       if (!ha[a]) ha[a] = 1;
       else ha[a]++;
       return new ea(ha[a], a)
   };
   ea.invalidateAll = function() {
       for (var a in ha) {
           try {
               ha[a]++
           } catch (b) {}
       }
   };
   ea.invalidate = function(a) {
       ha[a]++
   };
   ea.prototype.isValid = function() {
       return ha[this.ticketClass] == this.id
   };

   function Ha() {}
   Ha.create = function() {
       if (typeof ActiveXObject != "undefined") {
           try {
               return new ActiveXObject("Microsoft.XMLHTTP")
           } catch (a) {}
       }
       if (typeof XMLHttpRequest != "undefined") {
           return new XMLHttpRequest()
       }
       return null
   };

   function xa() {}
   xa.create = function(a, b) {
       var c = Ha.create();
       if (c) {
           return new kb(c)
       } else if (b) {
           var d = "mapsxmlhttpiframe" + (a || "");
           return new eb(d)
       } else {
           return null
       }
   };

   function kb(a) {
       this.xmlhttp = a
   }
   kb.prototype.continueWith = function(a, b) {
       y.writeURL(a);
       var c = this.xmlhttp;
       c.open("GET", a, true);
       c.onreadystatechange = function() {
           if (c.readyState == 4) {
               b(c.responseText);
               c.onreadystatechange = _nullFunction
           }
       };
       c.send(null)
   };
   var oc = "/maps?file=sf" + (window._sf ? "&" + window._sf : "");

   function eb(a) {
       this.frameid = a
   }
   eb.prototype.continueWith = function(a, b) {
       y.writeURL(a);
       var c = window.document.getElementById(this.frameid);
       if (!c) {
           y.write("IFRAME create " + this.frameid);
           c = pb(this.frameid)
       } else {
           y.write("IFRAME found " + this.frameid)
       }
       j.addBuiltInListener(c, "load", function() {
           y.write("IFRAME loaded " + d);
           var f = rb(c);
           y.write(f);
           b(f.jsfile)
       });
       var d = a + "&wrap=js";
       y.write("IFRAME load " + d);
       if (u.type == 4 && u.version == 7) {
           c.src = d
       } else {
           var e = rb(c);
           e.location.replace(d)
       }
       y.write("IFRAME loading " + d)
   };

   function M(a) {
       this.stylesheet = a
   }
   M.cache_ = new Object();
   M.create = function(a) {
       return new M(a)
   };
   M.getCached = function(a) {
       return M.cache_[a]
   };
   M.cache = function(a, b) {
       M.cache_[a] = b
   };
   M.prototype.transformToHtml = function(a, b) {
       if (typeof a.transformNode != "undefined") {
           b.innerHTML = a.transformNode(this.stylesheet)
       } else if (!Oc && (typeof XSLTProcessor != "undefined" && typeof XSLTProcessor.prototype.importStylesheet != "undefined")) {
           var c = new XSLTProcessor();
           c.importStylesheet(this.stylesheet);
           var d = c.transformToFragment(a, window.document);
           b.innerHTML = "";
           b.appendChild(d)
       } else {
           var e = "";
           b.innerHTML = e
       }
       ad(b, 20)
   };
   M.asynchronousTransform = function(a, b, c, d, e) {
       if (u.type == 3 && M.scriptedTransform) {
           var f = function() {
               try {
                   M.scriptedTransform(a, b, c)
               } catch (n) {
                   y.dump(n)
               }
               if (d) {
                   d()
               }
           };
           if (!document.getElementById("nxsl")) {
               var h = pb("nxsl");
               h.onload = f;
               h.src = oc
           } else {
               window.setTimeout(f, 1)
           }
           return
       }
       var g = M.getCached(c);
       if (g) {
           window.setTimeout(function() {
               g.transformToHtml(a, b);
               if (d) {
                   d()
               }
           }, 1)
       } else {
           var i = ea.create(e);
           var m = xa.create(e, true);
           m.continueWith(c, function(n) {
               if (i.isValid()) {
                   var s = n.replace(/\{\{[#\/!].*?\}\}/g, "").replace(/^[^<]*/, "");
                   var t = Wa(s);
                   var v = M.create(t);
                   v.transformToHtml(a, b);
                   M.cache(c, v);
                   if (d) {
                       d()
                   }
               }
           })
       }
   };

   function Yc(a) {
       while (a.hasChildNodes()) {
           a.removeChild(a.lastChild)
       }
   }

   function Wa(a) {
       try {
           if (typeof ActiveXObject != "undefined" && typeof GetObject != "undefined") {
               var b = new ActiveXObject("Microsoft.XMLDOM");
               b.loadXML(a);
               return b
           } else if (typeof DOMParser != "undefined") {
               return (new DOMParser()).parseFromString(a, "text/xml")
           } else {
               return zb(a)
           }
       } catch (c) {
           y.write(c.toString());
           y.incompatible("xmlparse")
       }
       try {
           y.write("XML xmlParse catch");
           return zb(a)
       } catch (c) {
           y.write(c.toString());
           y.incompatible("xmlparse");
           return document.createElement("div")
       }
   }

   function sb(a) {
       var b = "";
       if (a.nodeName == "#text") {
           b += oa(a.nodeValue)
       } else {
           b += "<" + a.nodeName;
           if (a.hasAttributes()) {
               for (var c = 0; c < a.attributes.length; ++c) {
                   b += " " + a.attributes[c].nodeName + '="' + cd(a.attributes[c].nodeValue) + '"'
               }
           }
           if (a.childNodes.length == 0) {
               b += "/>"
           } else {
               b += ">";
               for (var c = 0; c < a.childNodes.length; ++c) {
                   b += sb(a.childNodes[c])
               }
               b += "</" + a.nodeName + ">"
           }
       }
       return b
   }

   function Pc(a) {
       if (!a) return "";
       var b = "";
       if (a.nodeName == "#text") {
           b += oa(a.nodeValue)
       } else {
           for (var c = 0; c < a.childNodes.length; ++c) {
               b += sb(a.childNodes[c])
           }
       }
       return b
   }

   function pb(a) {
       var b = window.document.createElement("iframe");
       b.style.width = l(100);
       b.style.height = l(50);
       b.style.position = "absolute";
       b.style.top = l(-110);
       b.style.left = l(-110);
       b.id = a;
       b.name = a;
       window.document.body.appendChild(b);
       return b
   }

   function rb(a) {
       if (a.contentWindow) {
           y.write("IFRAME window: contentWindow");
           return a.contentWindow
       } else {
           y.write("IFRAME window: " + a.id);
           return window[a.id]
       }
   }

   function I(a, b) {
       if (a) {
           return a.getElementsByTagName(b)[0]
       } else {
           return null
       }
   }

   function V(a) {
       if (!a) {
           return ""
       }
       var b = "";
       if (a.nodeType == 3 || (a.nodeType == 4 || a.nodeType == 2)) {
           b += a.nodeValue
       } else if (a.nodeType == 1 || (a.nodeType == 9 || a.nodeType == 11)) {
           for (var c = 0; c < a.childNodes.length; ++c) {
               b += arguments.callee(a.childNodes[c])
           }
       }
       return b
   }

   function Za(a, b) {
       var c = (a.className || "").split(/\s+/);
       var d = false;
       for (var e = 0; e < c.length; ++e) {
           if (c[e] == b) {
               d = true;
               break
           }
       }
       if (!d) {
           c.push(b)
       }
       a.className = c.join(" ")
   }

   function Ab(a, b) {
       var c = (a.className || "").split(/\s+/);
       var d = [];
       for (var e = 0; e < c.length; ++e) {
           if (c[e] != b) {
               d.push(c[e])
           }
       }
       a.className = d.join(" ")
   };

   function $a(a) {
       if (!a) {
           return null
       } else if (a.nodeType == 1) {
           var b = dd(a);
           if (b) {
               return $a(b)
           } else {
               var c = [];
               for (var d = 0; d < a.childNodes.length; ++d) {
                   var e = a.childNodes[d];
                   var f = $a(e);
                   if (f) {
                       c.push(f)
                   }
                   if (!c[e.nodeName]) {
                       c[e.nodeName] = f
                   } else if (typeof c[e.nodeName] != "array") {
                       var h = c[e.nodeName];
                       c[e.nodeName] = [h, f]
                   } else {
                       c[e.nodeName].push(f)
                   }
               }
               for (var d = 0; d < a.attributes.length; ++d) {
                   var g = a.attributes[d];
                   c[g.nodeName] = g.nodeValue
               }
               return c
           }
       } else if (a.nodeType == 3) {
           return "" + a.nodeValue
       } else {
           return null
       }
   }

   function dd(a) {
       if (a.attributes && a.attributes.length > 0) {
           return null
       }
       var b = null;
       for (var c = 0; c < a.childNodes.length; ++c) {
           var d = a.childNodes[c];
           if (d.nodeType == 1) {
               return null
           }
           if (d.nodeType == 3 && !d.nodeValue.match(/^\s*$/)) {
               if (!b) {
                   b = d
               } else {
                   return null
               }
           }
       }
       return b
   }

   function ad(a, b) {
       var c = new RegExp("(\\S{" + b + "})", "g");
       bd(a, c)
   }

   function bd(a, b) {
       for (var c = a.firstChild; c; c = c.nextSibling) {
           if (c.nodeType == 1) {
               arguments.callee.call(this, c, b)
           } else if (c.nodeType == 3) {
               var d = "" + c.nodeValue;
               c.nodeValue = d.replace(b, "$1 ")
           }
       }
   }

   function ua() {}
   ua.value = V;
   ua.parse = Wa;

   function q(a, b) {
       this.x = a;
       this.y = b
   }
   q.prototype.toString = function() {
       return "(" + this.x + ", " + this.y + ")"
   };
   q.prototype.equals = function(a) {
       if (!a) return false;
       return this.x == a.x && this.y == a.y
   };
   q.prototype.distanceFrom = function(a) {
       var b = this.x - a.x;
       var c = this.y - a.y;
       return Math.sqrt(b * b + c * c)
   };
   q.prototype.approxEquals = function(a) {
       if (!a) return false;
       return Ja(this.x, a.x) && Ja(this.y, a.y)
   };

   function H(a, b) {
       this.width = a;
       this.height = b
   }
   H.prototype.toString = function() {
       return "(" + this.width + ", " + this.height + ")"
   };
   H.prototype.equals = function(a) {
       if (!a) return false;
       return this.width == a.width && this.height == a.height
   };
   H.prototype.approxEquals = function(a) {
       if (!a) return false;
       return Ja(this.width, a.width) && Ja(this.height, a.height)
   };

   function Ja(a, b) {
       return Math.round(a * 1000000) == Math.round(b * 1000000)
   }

   function z(a, b, c, d) {
       this.minX = a;
       this.minY = b;
       this.maxX = c;
       this.maxY = d
   }
   z.prototype.toString = function() {
       return "Bounds(" + this.minX + "," + this.minY + "," + this.maxX + "," + this.maxY + ")"
   };
   z.prototype.intersectsLatLng = function(a) {
       var b = this.minX > this.maxX ? this.minX - 360 : this.minX;
       var c = a.minX > a.maxX ? a.minX - 360 : a.minX;
       if (c > this.maxX || (a.minY > this.maxY || (a.maxX < b || a.maxY < this.minY))) {
           return false
       }
       return true
   };
   z.prototype.scaleLatLng = function(a, b, c) {
       var d = b.getBitmapCoordinate(this.minX, this.minY, c);
       var e = b.getBitmapCoordinate(this.maxX, this.maxY, c);
       var f = (e.x - d.x) / 2;
       var h = (e.y - d.y) / 2;
       var g = b.getLatLng(d.x - (a - 1) * f, d.y - (a - 1) * h, c);
       var i = b.getLatLng(e.x + (a - 1) * f, e.y + (a - 1) * h, c);
       return new z(g.x, g.y, i.x, i.y)
   };
   z.prototype.containsSegment = function(a, b) {
       if (this.minX > a.x && this.minX > b.x) return false;
       if (this.maxX < a.x && this.maxX < b.x) return false;
       if (this.minY > a.y && this.minY > b.y) return false;
       if (this.maxY < a.y && this.maxY < b.y) return false;
       return true
   };
   z.prototype.containsBounds = function(a) {
       return this.minX < a.minX && (this.maxX > a.maxX && (this.minY < a.minY && this.maxY > a.maxY))
   };
   z.prototype.extend = function(a) {
       this.minX = Math.min(this.minX, a.x);
       this.maxX = Math.max(this.maxX, a.x);
       this.minY = Math.min(this.minY, a.y);
       this.maxY = Math.max(this.maxY, a.y)
   };
   z.intersection = function(a, b) {
       return new z(Math.max(a.minX, b.minX), Math.max(a.minY, b.minY), Math.min(a.maxX, b.maxX), Math.min(a.maxY, b.maxY))
   };

   function qa(a) {
       this.ticks = a;
       this.tick = 0
   }
   qa.prototype.reset = function() {
       this.tick = 0
   };
   qa.prototype.next = function() {
       this.tick++;
       var a = Math.PI * (this.tick / this.ticks - 0.5);
       return (Math.sin(a) + 1) / 2
   };
   qa.prototype.more = function() {
       return this.tick < this.ticks
   };
   var mb = Math.PI / 180;
   var Fc = 2 * Math.PI;

   function Na(a) {
       return a * mb
   };

   function ub(a) {
       var b = new q(0, 0);
       b.x = Na(a.x);
       b.y = Na(a.y);
       return b
   }

   function Qc(a, b) {
       var c = ub(a);
       var d = ub(b);
       var e = Rc(c, d);
       return 6378137 * e
   }

   function Rc(a, b) {
       var c = a.y;
       var d = a.x;
       var e = b.y;
       var f = b.x;
       var h = c - e;
       var g = d - f;
       var i = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(h / 2), 2) + Math.cos(c) * Math.cos(e) * Math.pow(Math.sin(g / 2), 2)));
       return i
   };

   function k(a, b, c, d, e) {
       ob(a);
       this.container = a;
       this.ownerDocument = a.ownerDocument || document;
       if (!b || b.length == 0) {
           if (window.createMapSpecs) {
               this.mapTypes = window.createMapSpecs()
           } else {
               this.mapTypes = [new Q()]
           }
       } else {
           this.mapTypes = b
       }
       this.enableInfoWindow();
       this.zoomLevel = 0;
       this.topLeftTile = null;
       this.currentPanOffset = new H(0, 0);
       this.centerBitmap = new q(0, 0);
       this.centerScreen = new q(0.5, 0.5);
       this.lastCenterScreen = new q(0.5, 0.5);
       this.tilePaddingOffset = new H(0, 0);
       this.tableSize = new H(0, 0);
       this.overlays = [];
       this.controls = [];
       this.panDistance = new H(0, 0);
       this.panKeys = new pa();
       this.stateMonitor = null;
       this.mapBlowupZoom = 1;
       this.mapBlowupSpec = null;
       this.container.style.overflow = "hidden";
       if (this.container.style.position != "absolute") {
           this.container.style.position = "relative"
       }
       if (!c || !d) {
           c = this.container.offsetWidth;
           d = this.container.offsetHeight
       }
       this.viewSize = new H(c, d);
       j.bindDom(window, "blur", this, this.onWindowBlur);
       this.div = this.createMapDiv();
       this.container.appendChild(this.div);
       this.dragObject = new $(this.div, 0, 0);
       j.bind(this.dragObject, "drag", this, this.onDrag);
       j.bind(this.dragObject, "dragend", this, this.onDragEnd);
       j.bind(this.dragObject, "dragstart", this, this.onDragStart);
       j.bind(this.dragObject, "click", this, this.onClick);
       j.bind(this.dragObject, "mousedown", this, this.onMouseDown);
       j.bind(this.dragObject, "mouseup", this, this.onMouseUp);
       j.bindDom(this.div, "dblclick", this, this.onDoubleClick);
       this.setSpecification(this.mapTypes[0]);
       this.initializeMap();
       if (!e) {
           this.addControl(new ka(true, false));
           this.addControl(new za())
       }
       j.bind(this, "moveend", this, this.checkLongitudeWrapping);
       j.bind(this, "moveend", this, this.resetCenterScreen)
   }
   k.prototype.enableDragging = function() {
       this.dragObject.enable()
   };
   k.prototype.disableDragging = function() {
       this.dragObject.disable()
   };
   k.prototype.draggingEnabled = function() {
       return !this.dragObject.disabled
   };
   k.prototype.enableInfoWindow = function() {
       this.iwEnabled = true
   };
   k.prototype.disableInfoWindow = function() {
       this.iwEnabled = false;
       if (this.infoWindow) {
           this.closeInfoWindow();
           this.infoWindow = null
       }
   };
   k.prototype.infoWindowEnabled = function() {
       return this.iwEnabled
   };
   k.prototype.createInfoWindow = function() {
       if (!this.infoWindow) {
           this.infoWindow = new x(this.div, 40000, 30000);
           j.bind(this.infoWindow, "closeclick", this, this.onInfoCloseClick)
       }
   };
   k.prototype.getMapTypes = function() {
       return this.mapTypes
   };
   k.prototype.getCurrentMapType = function() {
       return this.spec
   };
   k.prototype.setMapType = function(a) {
       var b = a.getLowestZoomLevel(this.getCenterLatLng(), this.getSpanLatLng(), this.viewSize);
       this.switchSpecification(a, null, b)
   };
   k.prototype.isLoaded = function() {
       return this.topLeftTile != null
   };
   k.prototype.createMapDiv = function() {
       var a = document.createElement("div");
       a.style.position = "absolute";
       a.style.top = l(0);
       a.style.left = l(0);
       a.style.zIndex = 0;
       return a
   };
   k.prototype.loadTileImages = function() {
       this.loadTileImagesLayer(this.tileImages, false);
       if (this.spec.hasOverlay()) {
           this.loadTileImagesLayer(this.overlayImages, true)
       }
   };
   k.prototype.loadTileImagesLayer = function(a, b) {
       while (a.length > this.tableSize.width) {
           var c = a.pop();
           for (var d = 0; d < c.length; d++) {
               o.remove(c[d], this.ownerDocument)
           }
       }
       for (var d = a.length; d < this.tableSize.width; d++) {
           a.push([])
       }
       for (var d = 0; d < a.length; d++) {
           while (a[d].length > this.tableSize.height) {
               var e = a[d].pop();
               o.remove(e, this.ownerDocument)
           }
           for (var f = a[d].length; f < this.tableSize.height; f++) {
               if (b) {
                   e = o.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 1, null, null, this.ownerDocument)
               } else {
                   e = ja.create(null, this.spec.tileSize, this.spec.tileSize, null, null, 0, null, null, this.ownerDocument)
               }
               e.style.position = "absolute";
               a[d].push(e);
               this.div.appendChild(e);
               this.configureImage(e, d, f, b)
           }
       }
   };
   k.prototype.deleteTiles = function() {
       this.removeTilesFromDiv(this.tileImages);
       this.tileImages = null;
       if (this.overlayImages) {
           this.removeTilesFromDiv(this.overlayImages);
           this.overlayImages = null
       }
   };
   k.prototype.removeTilesFromDiv = function(a) {
       if (a) {
           for (var b = 0; b < a.length; b++) {
               if (a[b]) {
                   for (var c = 0; c < a[b].length; c++) {
                       o.remove(a[b][c], this.ownerDocument)
                   }
               }
           }
       }
   };
   k.prototype.initializeMap = function() {
       this.deleteTiles();
       this.tileImages = [];
       this.overlayImages = [];
       this.calculateTileMeasurements();
       this.loadTileImages()
   };
   k.prototype.getSpanLatLng = function(a) {
       if (!a) a = new H(0, 0);
       var b = this.spec.getLatLng(this.centerBitmap.x - this.viewSize.width * this.centerScreen.x, this.centerBitmap.y - this.viewSize.height * this.centerScreen.y, this.zoomLevel);
       var c = this.spec.getLatLng(this.centerBitmap.x + this.viewSize.width * (1 - this.centerScreen.x), this.centerBitmap.y + this.viewSize.height * (1 - this.centerScreen.y), this.zoomLevel);
       a.width = Math.abs(c.x - b.x);
       a.height = Math.abs(c.y - b.y);
       return a
   };
   k.prototype.getZoomLevel = function() {
       return this.zoomLevel
   };
   k.prototype.getCenterBitmap = function() {
       return this.centerBitmap
   };
   k.prototype.getCenterLatLng = function(a) {
       if (!a) a = new q(0, 0);
       if (this.centerLatLng) {
           a.x = this.centerLatLng.x;
           a.y = this.centerLatLng.y
       } else {
           var b = null;
           if (this.lastLatLng && this.centerScreen.equals(this.lastCenterScreen)) {
               b = this.spec.getBitmapCoordinate(this.lastLatLng.y, this.lastLatLng.x, this.zoomLevel)
           }
           if (b && b.equals(this.centerBitmap)) {
               a.x = this.lastLatLng.x;
               a.y = this.lastLatLng.y
           } else {
               var c = this.spec.getLatLng(this.centerBitmap.x, this.centerBitmap.y, this.zoomLevel);
               a.x = c.x - Math.floor((c.x + 180) / 360) * 360;
               a.y = c.y
           }
       }
       return a
   };
   k.prototype.getBoundsBitmap = function(a) {
       if (!a) {
           a = new z(0, 0, 0, 0)
       }
       var b = this.centerBitmap.x;
       var c = this.centerBitmap.y;
       var d = this.viewSize.width;
       var e = this.viewSize.height;
       var f = this.centerScreen.x;
       var h = this.centerScreen.y;
       a.minX = b - d * f;
       a.minY = c - e * h;
       a.maxX = b + d * (1 - f);
       a.maxY = c + e * (1 - h);
       return a
   };
   k.prototype.getBoundsLatLng = function(a) {
       a = this.getBoundsBitmap(a);
       var b = this.spec.getLatLng(a.minX, a.minY, this.zoomLevel);
       var c = this.spec.getLatLng(a.maxX, a.maxY, this.zoomLevel);
       a.minX = b.x;
       a.minY = c.y;
       a.maxX = c.x;
       a.maxY = b.y;
       return a
   };
   k.prototype.getDivCoordinate = function(a, b, c) {
       if (!c) c = new q(0, 0);
       var d = a - this.topLeftTile.x * this.spec.tileSize - this.tilePaddingOffset.width + this.currentPanOffset.width * this.spec.tileSize;
       var e = b - this.topLeftTile.y * this.spec.tileSize - this.tilePaddingOffset.height + this.currentPanOffset.height * this.spec.tileSize;
       c.x = d;
       c.y = e;
       return c
   };
   k.prototype.containerCoordToLatLng = function(a) {
       return this.spec.getLatLng(this.centerBitmap.x - this.viewSize.width * this.centerScreen.x + a.x, this.centerBitmap.y - this.viewSize.height * this.centerScreen.y + a.y, this.zoomLevel)
   };
   k.prototype.calculateTileMeasurements = function() {
       var a = Math.ceil(this.viewSize.width / this.spec.tileSize) + 2;
       var b = Math.ceil(this.viewSize.height / this.spec.tileSize) + 2;
       this.tableSize.width = a;
       this.tableSize.height = b;
       var c = Math.floor((this.tableSize.width * this.spec.tileSize - this.viewSize.width) / 2);
       var d = Math.floor((this.tableSize.height * this.spec.tileSize - this.viewSize.height) / 2);
       this.tilePaddingOffset.width = c;
       this.tilePaddingOffset.height = d
   };
   k.prototype.configureImage = function(a, b, c, d) {
       var e = (this.currentPanOffset.width + b) * this.spec.tileSize;
       var f = (this.currentPanOffset.height + c) * this.spec.tileSize;
       var h = -this.tilePaddingOffset.width + e;
       var g = -this.tilePaddingOffset.height + f;
       if (a.tileLeft != h || a.tileTop != g) {
           a.style.left = l(h);
           a.style.top = l(g);
           a.tileLeft = h;
           a.tileTop = g
       }
       if (!this.isLoaded()) {
           if (!d) {
               a.src = this.spec.emptyTileUrl
           }
       } else {
           var i = d ? this.spec.getOverlayURL(this.topLeftTile.x + b, this.topLeftTile.y + c, this.zoomLevel) : this.spec.getTileURL(this.topLeftTile.x + b, this.topLeftTile.y + c, this.zoomLevel);
           if (a.src != i) {
               if (d) {
                   o.clearImage(a, this.spec.emptyTileUrl);
                   o.setImage(a, i)
               } else {
                   a.src = this.spec.emptyTileUrl;
                   a.src = i
               }
           }
       }
   };
   k.prototype.onDrag = function() {
       if (!this.isLoaded()) {
           return
       }
       this.onMove();
       this.rotateTiles()
   };
   var tc = new H(0, 0);
   k.prototype.onMove = function() {
       this.centerLatLng = null;
       var a = this.getCurrentOffset(tc);
       var b = this.topLeftTile.x * this.spec.tileSize + Math.floor(this.viewSize.width * this.centerScreen.x) + this.tilePaddingOffset.width - a.width;
       var c = this.topLeftTile.y * this.spec.tileSize + Math.floor(this.viewSize.height * this.centerScreen.y) + this.tilePaddingOffset.height - a.height;
       this.centerBitmap.x = b;
       this.centerBitmap.y = c;
       for (var d = 0; d < this.overlays.length; d++) {
           this.overlays[d].redraw(false)
       }
       j.trigger(this, "move")
   };
   var uc = new H(0, 0);
   k.prototype.rotateTiles = function() {
       var a = this.getCurrentOffset(uc);
       if (Math.abs(this.dragObject.left) > 10000000 || Math.abs(this.dragObject.top) > 10000000) {
           this.cancelPan();
           this.centerAtBitmap(this.centerBitmap);
           return
       }
       while (a.width < -this.tilePaddingOffset.width / 2) {
           this.rotateRight(this.tileImages, false);
           if (this.spec.hasOverlay()) {
               this.rotateRight(this.overlayImages, true)
           }
           this.getCurrentOffset(a)
       }
       while (a.width > this.tilePaddingOffset.width / 2) {
           this.rotateLeft(this.tileImages, false);
           if (this.spec.hasOverlay()) {
               this.rotateLeft(this.overlayImages, true)
           }
           this.getCurrentOffset(a)
       }
       while (a.height < -this.tilePaddingOffset.height / 2) {
           this.rotateDown(this.tileImages, false);
           if (this.spec.hasOverlay()) {
               this.rotateDown(this.overlayImages, true)
           }
           this.getCurrentOffset(a)
       }
       while (a.height > this.tilePaddingOffset.height / 2) {
           this.rotateUp(this.tileImages, false);
           if (this.spec.hasOverlay()) {
               this.rotateUp(this.overlayImages, true)
           }
           this.getCurrentOffset(a)
       }
   };
   k.prototype.rotateLeft = function(a, b) {
       if (!b) {
           this.currentPanOffset.width--;
           this.topLeftTile.x--
       }
       var c = a.pop();
       if (c) {
           a.unshift(c);
           for (var d = 0; d < c.length; d++) {
               this.configureImage(c[d], 0, d, b)
           }
       }
   };
   k.prototype.rotateRight = function(a, b) {
       if (!b) {
           this.currentPanOffset.width++;
           this.topLeftTile.x++
       }
       var c = a.shift();
       a.push(c);
       var d = a.length - 1;
       for (var e = 0; e < c.length; e++) {
           this.configureImage(c[e], d, e, b)
       }
   };
   k.prototype.rotateUp = function(a, b) {
       if (!b) {
           this.currentPanOffset.height--;
           this.topLeftTile.y--
       }
       for (var c = 0; c < a.length; c++) {
           var d = a[c].pop();
           a[c].unshift(d);
           this.configureImage(d, c, 0, b)
       }
   };
   k.prototype.rotateDown = function(a, b) {
       if (!b) {
           this.currentPanOffset.height++;
           this.topLeftTile.y++
       }
       var c = a[0].length - 1;
       for (var d = 0; d < a.length; d++) {
           var e = a[d].shift();
           a[d].push(e);
           this.configureImage(e, d, c, b)
       }
   };
   k.prototype.onDragEnd = function() {
       j.trigger(this, "moveend")
   };
   k.prototype.onDragStart = function() {
       this.cancelPan();
       j.trigger(this, "movestart")
   };
   k.prototype.onDoubleClick = function(a) {
       if (!this.draggingEnabled()) {
           return
       }
       var b = va(a, this.container);
       var c = Math.floor(this.viewSize.width / 2) - b.x;
       var d = Math.floor(this.viewSize.height / 2) - b.y;
       this.pan(c, d)
   };
   k.prototype.onClick = function(a) {
       this.closeInfoWindow();
       var b = null;
       if (a) {
           var c = va(a, this.container);
           b = this.containerCoordToLatLng(c)
       }
       j.trigger(this, "click", null, b)
   };
   k.prototype.onMouseDown = function(a) {
       var b = null;
       if (a) {
           var c = va(a, this.container);
           b = this.containerCoordToLatLng(c)
       }
       j.trigger(this, "mousedown", b)
   };
   k.prototype.onMouseUp = function(a) {
       var b = null;
       if (a) {
           var c = va(a, this.container);
           b = this.containerCoordToLatLng(c)
       }
       j.trigger(this, "mouseup", b)
   };
   k.prototype.sortImagesFromCenter = function(a) {
       var b = [];
       for (var c = 0; c < a.length; c++) {
           for (var d = 0; d < a[c].length; d++) {
               var e = a[c][d];
               e.coordX = c;
               e.coordY = d;
               var f = Math.min(c, a.length - c - 1);
               var h = Math.min(d, a[c].length - d - 1);
               if (f == 0 || h == 0) {
                   e.priority = 0
               } else {
                   e.priority = f + h
               }
               b.push(e)
           }
       }
       b.sort(function(g, i) {
           return i.priority - g.priority
       });
       return b
   };
   k.prototype.reconfigureImage = function(a, b) {
       if (u.type == 1 || u.type == 4 && u.version == 7) {
           this.div.removeChild(a);
           this.configureImage(a, a.coordX, a.coordY, b);
           this.div.appendChild(a)
       } else {
           this.configureImage(a, a.coordX, a.coordY, b)
       }
   };
   k.prototype.reconfigureAllImages = function() {
       if (this.tileImages.length == 0) {
           return
       }
       var a = this.sortImagesFromCenter(this.tileImages);
       if (this.spec.hasOverlay()) {
           var b = this.sortImagesFromCenter(this.overlayImages)
       } else {
           var b = []
       }
       var c = Math.max(a.length, b.length);
       for (var d = 0; d < c; d++) {
           if (d < a.length) {
               this.reconfigureImage(a[d], false)
           }
           if (d < b.length) {
               this.reconfigureImage(b[d], true)
           }
       }
   };
   k.prototype.pan = function(a, b) {
       if (!this.isLoaded()) {
           return
       }
       var c = Math.sqrt(a * a + b * b);
       var d = Math.max(10, Math.floor(c / 20));
       this.panSiner = new qa(d);
       this.panSiner.reset();
       this.panDistance.width = a;
       this.panDistance.height = b;
       this.panStart = new q(this.dragObject.left, this.dragObject.top);
       j.trigger(this, "movestart");
       this.doPan()
   };
   k.prototype.doPan = function() {
       var a = this.panSiner.next();
       this.dragObject.moveTo(this.panStart.x + this.panDistance.width * a, this.panStart.y + this.panDistance.height * a);
       this.onMove();
       if (this.panSiner.more()) {
           this.panTimeout = na(this, function() {
               this.doPan()
           }, 10);
           this.rotateTiles()
       } else {
           this.panTimeout = null;
           j.trigger(this, "moveend")
       }
   };
   k.prototype.cancelPan = function() {
       if (this.panTimeout) {
           clearTimeout(this.panTimeout);
           j.trigger(this, "moveend")
       }
   };
   k.prototype.recenterOrPanToLatLng = function(a) {
       if (!this.isLoaded()) {
           return
       }
       this.centerLatLng = new q(a.x, a.y);
       this.lastLatLng = this.centerLatLng;
       this.lastCenterScreen = new q(this.centerScreen.x, this.centerScreen.y);
       var a = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.zoomLevel);
       this.recenterOrPanToBitmap(a)
   };
   k.prototype.recenterOrPanToBitmap = function(a) {
       if (!this.isLoaded()) return;
       var b = this.centerBitmap.x - a.x;
       var c = this.centerBitmap.y - a.y;
       if (b == 0 && c == 0) {
           this.resetCenterScreen();
           return
       }
       if (Math.abs(b) < this.viewSize.width && Math.abs(c) < this.viewSize.height) {
           this.pan(b, c);
           return
       }
       this.centerAtBitmap(a)
   };
   k.prototype.centerAndZoom = function(a, b) {
       var c = null;
       if (!this.isLoaded() || b != this.zoomLevel) {
           c = this.zoomLevel;
           this.zoomLevel = b
       }
       this.centerAtLatLng(a);
       if (c != null) {
           j.trigger(this, "zoom", c, this.zoomLevel)
       }
   };
   k.prototype.centerAtLatLng = function(a) {
       this.centerLatLng = new q(a.x, a.y);
       this.lastLatLng = this.centerLatLng;
       this.lastCenterScreen = new q(this.centerScreen.x, this.centerScreen.y);
       var a = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.zoomLevel);
       this.centerAtBitmap(a)
   };
   k.prototype.centerAtBitmap = function(a) {
       this.centerBitmap.x = a.x;
       this.centerBitmap.y = a.y;
       var b = new q(Math.round(this.viewSize.width * this.centerScreen.x), Math.round(this.viewSize.height * this.centerScreen.y));
       var c = this.centerBitmap.x - b.x - this.tilePaddingOffset.width;
       var d = this.centerBitmap.y - b.y - this.tilePaddingOffset.height;
       var e = Math.floor(c / this.spec.tileSize);
       var f = Math.floor(d / this.spec.tileSize);
       var h = e * this.spec.tileSize - c;
       var g = f * this.spec.tileSize - d;
       if (h < -this.tilePaddingOffset.width / 2) {
           e++;
           h += this.spec.tileSize
       } else if (h > this.tilePaddingOffset.width / 2) {
           e--;
           h -= this.spec.tileSize
       }
       if (g < -this.tilePaddingOffset.height / 2) {
           f++;
           g += this.spec.tileSize
       } else if (g > this.tilePaddingOffset.height / 2) {
           f--;
           g -= this.spec.tileSize
       }
       if (!this.isLoaded()) {
           this.topLeftTile = new q(e, f);
           if (!this.stateMonitor) {
               this.stateMonitor = new ta(this)
           }
       } else {
           this.topLeftTile.x = e;
           this.topLeftTile.y = f
       }
       this.currentPanOffset.width = 0;
       this.currentPanOffset.height = 0;
       var i = screen.updateInterval || 0;
       screen.updateInterval = 1000;
       this.dragObject.moveTo(h, g);
       this.reconfigureAllImages();
       this.redrawOverlays();
       screen.updateInterval = i;
       j.trigger(this, "move");
       j.trigger(this, "moveend")
   };
   k.prototype.onResize = function(a) {
       if (this.viewSize.width != this.container.offsetWidth || this.viewSize.height != this.container.offsetHeight) {
           this.viewSize.width = this.container.offsetWidth;
           this.viewSize.height = this.container.offsetHeight;
           this.calculateTileMeasurements();
           this.loadTileImages();
           this.centerAtBitmap(this.centerBitmap);
           j.trigger(this, "resize")
       }
   };
   k.prototype.getCurrentOffset = function(a) {
       if (!a) a = new H(0, 0);
       a.width = this.dragObject.left + this.currentPanOffset.width * this.spec.tileSize;
       a.height = this.dragObject.top + this.currentPanOffset.height * this.spec.tileSize;
       return a
   };
   k.prototype.switchSpecification = function(a, b, c) {
       if (this.spec == a) return;
       var d = this.spec;
       var e = b || this.getCenterLatLng();
       this.setSpecification(a);
       if (d.tileSize != a.tileSize || d.hasOverlay() != a.hasOverlay()) {
           this.topLeftTile = null;
           this.initializeMap()
       }
       if (!c && c != 0) {
           this.centerAtLatLng(e)
       } else {
           this.centerAndZoom(e, c)
       }
       j.trigger(this, "maptypechanged", d, a)
   };
   k.prototype.setSpecification = function(a) {
       this.spec = a;
       if (!a.emptyTilePreload) {
           var b = document.createElement("IMG");
           b.style.position = "absolute";
           b.style.visibility = "hidden";
           b.style.top = l(-200);
           b.style.left = l(-200);
           document.body.appendChild(b);
           a.emptyTilePreload = b
       }
       this.spec.emptyTilePreload.src = this.spec.emptyTileUrl;
       this.container.style.background = this.spec.backgroundColor;
       this.div.style.backgroundColor = this.spec.backgroundColor
   };
   k.prototype.zoomTo = function(a) {
       if (!this.isLoaded()) {
           return
       }
       if (a >= this.spec.numZoomLevels) {
           a = this.spec.numZoomLevels - 1
       } else if (a < 0) {
           a = 0
       }
       var b = this.zoomLevel;
       if (a != this.zoomLevel) {
           if (!this.centerLatLng) this.centerLatLng = this.getCenterLatLng();
           this.zoomLevel = a;
           var c = this.spec.getBitmapCoordinate(this.centerLatLng.y, this.centerLatLng.x, this.zoomLevel);
           this.centerAtBitmap(c)
       }
       j.trigger(this, "zoom", b, this.zoomLevel)
   };
   k.prototype.checkLongitudeWrapping = function() {
       var a = this.spec.adjustBitmapX(this.centerBitmap.x, this.zoomLevel);
       if (a != this.centerBitmap.x) {
           this.centerBitmap.x = a;
           this.centerAtBitmap(this.centerBitmap)
       }
   };
   k.prototype.addOverlay = function(a) {
       this.overlays.push(a);
       a.initialize(this);
       a.redraw(true);
       this.reOrderOverlays();
       var b = this;
       j.addListener(a, "click", function() {
           j.trigger(b, "click", a)
       });
       j.trigger(this, "addoverlay", a)
   };
   k.prototype.removeOverlay = function(a) {
       var b = [];
       for (var c = 0; c < this.overlays.length; c++) {
           if (this.overlays[c] == a) {
               a.remove()
           } else {
               b.push(this.overlays[c])
           }
       }
       if (this.overlays.length != b.length) {
           this.overlays = b
       }
       j.trigger(this, "removeoverlay", a)
   };
   k.prototype.reOrderOverlays = function() {
       this.overlays.sort(k.orderOverlays);
       var a = [];
       for (var b = 0; b < this.overlays.length; b++) {
           a[0] = 10000 + b;
           a[2] = 15000;
           a[1] = 20000 + b;
           a[3] = 25000 + b;
           a[5] = 30000;
           a[4] = 35000 + b;
           a[6] = 45000 + b;
           a[7] = 50000 + b;
           this.overlays[b].setZIndex(a)
       }
   };
   k.orderOverlays = function(a, b) {
       var c = a.getLatitude();
       var d = b.getLatitude();
       if (c > d) return -1;
       if (c < d) return 1;
       return 0
   };
   k.prototype.openInfoWindow = function(a, b, c, d, e) {
       if (!this.infoWindowEnabled()) return;
       if (!this.infoWindow) {
           this.createInfoWindow()
       }
       var f = this.spec.getBitmapCoordinate(a.y, a.x, this.zoomLevel);
       var h = this.getDivCoordinate(f.x, f.y);
       if (this.infoWindow.isVisible()) {
           j.trigger(this, "infowindowclose");
           if (this.infoWindow.onCloseFn) {
               this.infoWindow.onCloseFn()
           }
       }
       this.infoWindow.point = a;
       this.infoWindow.pixelOffset = c;
       this.infoWindow.onOpenFn = d;
       this.infoWindow.onCloseFn = e;
       this.infoWindow.offscreenArea.innerHTML = "";
       this.infoWindow.offscreenArea.appendChild(b);
       this.showSizedInfoWindow(h.x, h.y, c)
   };
   k.prototype.openInfoWindowXslt = function(a, b, c, d, e, f) {
       var h = document.createElement("div");
       var g = this;
       var i = function() {
           g.openInfoWindow(a, h, d, e, f)
       };
       M.asynchronousTransform(b, h, c, i, null)
   };
   k.prototype.openInfoWindowHtml = function(a, b, c, d, e) {
       var f = document.createElement("div");
       f.innerHTML = b;
       this.openInfoWindow(a, f, c, d, e)
   };
   k.prototype.closeInfoWindow = function() {
       if (this.infoWindow && this.infoWindow.isVisible()) {
           this.infoWindow.hide();
           this.resetCenterScreen();
           j.trigger(this, "infowindowclose");
           if (this.infoWindow.onCloseFn) {
               this.infoWindow.onCloseFn()
           }
           this.infoWindow.point = null;
           this.infoWindow.pixelOffset = null;
           this.infoWindow.onOpenFn = null;
           this.infoWindow.onCloseFn = null
       }
   };
   k.prototype.saveMapState = function() {
       this.lastPageCenter = this.getCenterLatLng();
       this.lastPageZoom = this.zoomLevel
   };
   k.prototype.clearOverlays = function() {
       this.closeInfoWindow();
       for (var a = 0; a < this.overlays.length; a++) {
           this.overlays[a].remove()
       }
       this.overlays.clear();
       this.saveMapState();
       this.mapBlowupZoom = 1;
       this.mapBlowupSpec = null;
       j.trigger(this, "clearoverlays")
   };
   k.prototype.redrawOverlays = function() {
       for (var a = 0; a < this.overlays.length; a++) {
           this.overlays[a].redraw(true)
       }
       if (this.infoWindow) {
           this.repositionInfoWindow();
           if (u.type != 1 && this.infoWindow.hasMask()) {
               this.addOverlaysToInfoWindowMask()
           }
       }
   };
   k.prototype.repositionInfoWindow = function() {
       if (!this.infoWindow.isVisible() || !this.infoWindow.point) {
           return
       }
       var a = this.infoWindow.point;
       var b = this.spec.getBitmapCoordinate(a.y, a.x, this.zoomLevel);
       var c = this.getDivCoordinate(b.x, b.y);
       this.infoWindow.positionAt(c.x, c.y, this.infoWindow.pixelOffset)
   };
   k.prototype.onInfoCloseClick = function(a) {
       this.closeInfoWindow()
   };
   k.prototype.resetCenterScreen = function() {
       var a = 0.5;
       var b = 0.5;
       var c = null;
       if (this.infoWindow && (this.infoWindow.isVisible() && this.infoWindow.point)) {
           var d = this.getScreenCoord(this.infoWindow.point);
           if (d.x >= 0 && (d.x <= 1 && (d.y >= 0 && d.y <= 1))) {
               a = d.x;
               b = d.y;
               c = new q(this.infoWindow.point.x, this.infoWindow.point.y)
           }
       }
       if (a == this.centerScreen.x && b == this.centerScreen.y) {
           return
       }
       this.centerBitmap.x -= Math.round(this.viewSize.width * (this.centerScreen.x - a));
       this.centerBitmap.y -= Math.round(this.viewSize.height * (this.centerScreen.y - b));
       this.centerScreen.x = a;
       this.centerScreen.y = b;
       if (c) {
           this.centerLatLng = c
       } else {
           this.centerLatLng = null;
           this.centerLatLng = this.getCenterLatLng()
       }
   };
   k.prototype.getScreenCoord = function(a) {
       var b = this.spec.getBitmapCoordinate(a.y, a.x, this.zoomLevel);
       b = this.getDivCoordinate(b.x, b.y);
       b.x += this.dragObject.left;
       b.y += this.dragObject.top;
       return new q(b.x / this.viewSize.width, b.y / this.viewSize.height)
   };
   k.prototype.panToInfoWindow = function() {
       var a = this.spec.getBitmapCoordinate(this.infoWindow.point.y, this.infoWindow.point.x, this.zoomLevel);
       var b = this.getDivCoordinate(a.x, a.y);
       var c = new q(this.centerBitmap.x, this.centerBitmap.y);
       var d = this.infoWindow.left + (a.x - b.x);
       var e = this.infoWindow.top + (a.y - b.y);
       var f = Math.round(this.viewSize.width * this.centerScreen.x);
       var h = this.viewSize.width - f;
       var g = Math.round(this.viewSize.height * this.centerScreen.y);
       var i = this.viewSize.height - g;
       c.y = Math.min(c.y, e + g - 25);
       c.y = Math.max(c.y, a.y - i + 25);
       var m = 25;
       var n = a.y - this.infoWindow.getTotalHeightAboveGround() - (c.y - g);
       if (n < 55) {
           m = m + 50
       } else if (n < 295) {
           m = m + 35
       }
       c.x = Math.min(c.x, d + f - m);
       c.x = Math.max(c.x, d + this.infoWindow.getTotalWidth() - h + 25);
       this.centerLatLng = null;
       this.recenterOrPanToBitmap(c)
   };
   k.prototype.showSizedInfoWindow = function(a, b, c) {
       var d = ea.create("infoWindowOffscreen");
       this.infoWindow.prepareOffscreen();
       na(this, function() {
           if (d.isValid()) {
               this.infoWindow.flipOffscreenAndSize();
               this.infoWindow.positionAt(a, b, c);
               if (u.type != 1 && this.infoWindow.hasMask()) {
                   this.addOverlaysToInfoWindowMask()
               }
               na(this, function() {
                   this.infoWindow.show();
                   this.panToInfoWindow();
                   if (this.infoWindow.onOpenFn) {
                       this.infoWindow.onOpenFn()
                   }
                   j.trigger(this, "infowindowopen")
               }, 1)
           }
       }, 1)
   };
   k.prototype.addOverlaysToInfoWindowMask = function() {
       if (!this.infoWindow.isVisible()) {
           return
       }
       this.infoWindow.clearMaskMap();
       var a = new q(this.infoWindow.getOffsetLeft(), this.infoWindow.getOffsetTop());
       var b = new q(a.x + this.infoWindow.getTotalWidth(), a.y + this.infoWindow.getTotalHeight());
       for (var c = 0; c < this.overlays.length; c++) {
           var d = this.overlays[c];
           if (d.addToInfoWindowMask) {
               if (d.getOffsetTop() > b.y) {
                   break
               }
               d.addToInfoWindowMask(a, b)
           }
       }
   };
   k.prototype.showMapBlowup = function(a, b, c, d, e, f) {
       if (!this.infoWindowEnabled()) return;
       var h = b ? b : this.mapBlowupZoom;
       var g = c ? c : this.mapBlowupSpec;
       var i = document.createElement("div");
       i.style.border = "1px solid #979797";
       i.style.width = l(200);
       i.style.height = l(200);
       var m = this.copy(i, 200, 200, a, h, g, true);
       m.disableDragging();
       m.disableInfoWindow();
       m.addControl(new sa());
       var n = e;
       if (u.type == 1) {
           n = function() {
               try {
                   m.redrawOverlays()
               } catch (s) {
                   y.dump(s)
               }
               if (e) e()
           }
       }
       if (m.mapTypes.length > 1) {
           m.addControl(new fa(true))
       }
       this.openInfoWindow(a, i, d, n, f);
       j.bind(m, "moveend", this, function() {
           this.mapBlowupZoom = m.zoomLevel;
           this.mapBlowupSpec = m.spec
       });
       return m
   };
   k.prototype.copy = function(a, b, c, d, e, f, h) {
       var g = new k(a, this.mapTypes, b, c, h);
       var i = d ? d : this.getCenterLatLng();
       var m = f ? f : this.spec;
       var n = e || e == 0 ? e : this.zoomLevel;
       if (m == g.spec) {
           g.centerAndZoom(i, n)
       } else {
           g.switchSpecification(m, i, n)
       }
       for (var s = 0; s < this.overlays.length; s++) {
           g.addOverlay(this.overlays[s].copy())
       }
       return g
   };
   k.prototype.registerKeyHandlers = function(a) {
       if (u.type == 2 && u.os == 2) {
           j.bindDom(a, "keydown", this, this.cancelKey);
           j.bindDom(a, "keypress", this, this.handleKey)
       } else {
           j.bindDom(a, "keydown", this, this.handleKey);
           j.bindDom(a, "keypress", this, this.cancelKey)
       }
       j.bindDom(a, "keyup", this, this.releaseKey)
   };
   k.prototype.handleKey = function(a) {
       if (this.ignoreKeyEvent(a)) {
           return true
       }
       switch (a.keyCode) {
           case 38:
           case 40:
           case 37:
           case 39:
               this.panKeys.add(a.keyCode);
               this.startContinuousPan();
               A(a);
               return false;
           case 34:
               this.pan(0, -Math.floor(this.viewSize.height * 0.75));
               A(a);
               return false;
           case 33:
               this.pan(0, Math.floor(this.viewSize.height * 0.75));
               A(a);
               return false;
           case 36:
               this.pan(Math.floor(this.viewSize.width * 0.75), 0);
               A(a);
               return false;
           case 35:
               this.pan(-Math.floor(this.viewSize.width * 0.75), 0);
               A(a);
               return false;
           case 187:
           case 107:
               this.zoomTo(this.zoomLevel - 1);
               A(a);
               return false;
           case 189:
           case 109:
               this.zoomTo(this.zoomLevel + 1);
               A(a);
               return false
       }
       switch (a.which) {
           case 61:
           case 43:
               this.zoomTo(this.zoomLevel - 1);
               A(a);
               return false;
           case 45:
           case 95:
               this.zoomTo(this.zoomLevel + 1);
               A(a);
               return false
       }
       return true
   };
   k.prototype.cancelKey = function(a) {
       if (this.ignoreKeyEvent(a)) {
           return true
       }
       switch (a.keyCode) {
           case 38:
           case 40:
           case 37:
           case 39:
           case 34:
           case 33:
           case 36:
           case 35:
           case 187:
           case 107:
           case 189:
           case 109:
               A(a);
               return false
       }
       switch (a.which) {
           case 61:
           case 43:
           case 45:
           case 95:
               A(a);
               return false
       }
       return true
   };
   k.prototype.releaseKey = function(a) {
       switch (a.keyCode) {
           case 38:
           case 40:
           case 37:
           case 39:
               this.panKeys.remove(a.keyCode);
               return false
       }
       return true
   };
   k.prototype.ignoreKeyEvent = function(a) {
       if (a.ctrlKey || (a.altKey || a.metaKey)) {
           return true
       }
       if (a.target && (a.target.nodeName == "INPUT" && a.target.getAttribute("type").toLowerCase() == "text" || a.target.nodeName == "TEXTAREA")) {
           return true
       }
       return false
   };
   k.prototype.startContinuousPan = function() {
       if (!this.isLoaded()) {
           return
       }
       this.cancelPan();
       j.trigger(this, "movestart");
       if (!this.continuousPanTimeout) {
           this.panSiner = new qa(100);
           this.continuousPanTimeout = na(this, function() {
               this.doContinuousPan()
           }, 5)
       }
   };
   k.prototype.doContinuousPan = function() {
       if (this.panKeys.size > 0) {
           var a = (this.panKeys.contains(37) ? 1 : 0) + (this.panKeys.contains(39) ? -1 : 0);
           var b = (this.panKeys.contains(38) ? 1 : 0) + (this.panKeys.contains(40) ? -1 : 0);
           var c = 1;
           if (this.panSiner.more()) {
               c = this.panSiner.next()
           }
           var d = a > 0 ? Math.floor : Math.ceil;
           var e = d(7 * c * a + 5 * a);
           d = b > 0 ? Math.floor : Math.ceil;
           var f = d(7 * c * b + 5 * b);
           this.dragObject.moveTo(this.dragObject.left + e, this.dragObject.top + f);
           this.onMove();
           this.rotateTiles();
           this.continuousPanTimeout = na(this, function() {
               this.doContinuousPan()
           }, 10)
       } else {
           this.continuousPanTimeout = null;
           j.trigger(this, "moveend")
       }
   };
   k.prototype.onWindowBlur = function(a) {
       if (this.panKeys.size > 0) {
           this.panKeys = new pa()
       }
   };

   function Rb(a, b) {
       this.control = a;
       this.element = b
   }
   k.prototype.addControl = function(a, b, c) {
       var d = a.initialize(this);
       var e = b || a.getDefaultPosition();
       if (!c) {
           Ia(d, "noprint")
       }
       j.addBuiltInListener(d, "click", A);
       j.addBuiltInListener(d, "dblclick", A);
       j.addBuiltInListener(d, "contextmenu", A);
       e.apply(d);
       this.container.appendChild(d);
       this.controls.push(new Rb(a, d))
   };
   k.prototype.removeControl = function(a) {
       for (var b = 0; b < this.controls.length; b++) {
           var c = this.controls[b];
           if (c.control == a) {
               this.container.removeChild(c.element);
               this.controls.splice(b, 1);
               return
           }
       }
   };
   k.prototype.applyControlStyles = function(a) {
       a.style.position = "absolute";
       F(a, "default");
       a.unselectable = "on";
       a.onselectstart = Xa;
       a.style.fontSize = l(11);
       a.style.fontFamily = "Arial, sans serif";
       a.style.MozUserSelect = "none"
   };
   k.prototype.hideOverlays = function() {
       this.infoWindowVisible = this.infoWindow && this.infoWindow.isVisible();
       if (this.infoWindowVisible) {
           this.infoWindow.hide()
       }
       for (var a = 0; a < this.overlays.length; ++a) {
           if (this.overlays[a].display) {
               this.overlays[a].display(false)
           }
       }
   };
   k.prototype.showOverlays = function() {
       if (this.infoWindowVisible) {
           this.infoWindow.show()
       }
       for (var a = 0; a < this.overlays.length; ++a) {
           if (this.overlays[a].display) {
               this.overlays[a].display(true)
           }
       }
   };

   ;

   var db = ["image", "shadow", "iconSize", "shadowSize", "iconAnchor", "infoWindowAnchor", "infoShadowAnchor", "transparent", "printImage", "mozPrintImage", "printShadow", "imageMap"];

   function aa(a) {
       this.properties = new Object();
       if (a) {
           for (var b = 0; b < db.length; b++) {
               var c = db[b];
               this[c] = a[c]
           }
       }
   }
   aa.prototype.translateImageMap = function(a, b) {
       var c = [];
       for (var d = 0; d < this.imageMap.length; d += 2) {
           c.push(this.imageMap[d] + a);
           c.push(this.imageMap[d + 1] + b)
       }
       return c
   };
   aa.prototype.getInfoWindowOffset = function() {
       return new H(this.infoWindowAnchor.x - this.iconAnchor.x, this.infoWindowAnchor.y - this.iconAnchor.y)
   };
   aa.prototype.setImage = function(a) {
       this.image = a;
       this.printImage = a.replace(/\.png$/, "ie.gif");
       this.mozPrintImage = a.replace(/\.png$/, "ff.gif")
   };

   var jb = 0;

   function J(a, b) {
       this.point = a;
       this.icon = b || T
   }
   J.prototype.initialize = function(a) {
       this.map = a;
       var b = this.icon;
       this.iconImage = o.create(b.image, b.iconSize.width, b.iconSize.height, 0, 0, null, false, b.printImage ? "noprint" : null, a.ownerDocument);
       this.shadow = o.create(b.shadow, b.shadowSize.width, b.shadowSize.height, 0, 0, null, false, "noprint", a.ownerDocument);
       this.images = [this.iconImage, this.shadow];
       if (b.transparent) {
           this.transparentIcon = o.create(b.transparent, b.iconSize.width, b.iconSize.height, 0, 0, null, false, "noprint", a.ownerDocument);
           this.images.push(this.transparentIcon)
       }
       if (b.printImage && u.type != 2) {
           this.printIcon = ja.create(b.printImage, b.iconSize.width, b.iconSize.height, 0, 0, null, false, "noscreen", a.ownerDocument)
       } else if (b.mozPrintImage && u.type == 2) {
           this.printIcon = ja.create(b.mozPrintImage, b.iconSize.width, b.iconSize.height, 0, 0, null, false, "noscreen", a.ownerDocument)
       }
       if (this.printIcon) this.images.push(this.printIcon);
       if (b.printShadow && u.type != 2) {
           this.printShadow = ja.create(b.printShadow, b.shadowSize.width, b.shadowSize.height, 0, 0, null, false, "noscreen", a.ownerDocument);
           this.images.push(this.printShadow)
       }
       var c = this.iconImage;
       if (this.transparentIcon) {
           c = this.transparentIcon
       }
       if (u.type == 2 && b.imageMap) {
           var d = "map" + jb;
           jb++;
           this.imageMap = a.ownerDocument.createElement("map");
           this.imageMap.setAttribute("name", d);
           var e = a.ownerDocument.createElement("area");
           e.setAttribute("shape", "poly");
           e.setAttribute("alt", "");
           e.setAttribute("coords", b.imageMap.join(","));
           e.setAttribute("href", "javascript:void(0)");
           c = e;
           this.imageMap.appendChild(e);
           this.transparentIcon.setAttribute("usemap", "#" + d)
       } else {
           F(c, "pointer")
       }
       j.bindDom(c, "mousedown", this, this.onMouseDown);
       if (this.imageMap) {
           this.map.div.appendChild(this.imageMap)
       }
       for (var f = 0; f < this.images.length; f++) {
           this.map.div.appendChild(this.images[f])
       }
   };
   J.prototype.remove = function() {
       for (var a = 0; a < this.images.length; a++) {
           this.map.div.removeChild(this.images[a])
       }
       if (this.imageMap) {
           this.map.div.removeChild(this.imageMap)
       }
   };
   J.prototype.copy = function() {
       return new J(this.point, this.icon)
   };
   J.prototype.redraw = function(a) {
       if (!a) return;
       var b = this.map.spec.getBitmapCoordinate(this.point.y, this.point.x, this.map.zoomLevel);
       var c = this.map.getDivCoordinate(b.x, b.y);
       var d = c.x - this.icon.iconAnchor.x;
       var e = c.y - this.icon.iconAnchor.y;
       for (var f = 0; f < this.images.length; f++) {
           this.images[f].style.left = l(d);
           this.images[f].style.top = l(e)
       }
   };
   J.prototype.getLatitude = function() {
       return this.point.y
   };
   J.prototype.setZIndex = function(a) {
       this.iconImage.style.zIndex = a[3];
       if (this.printIcon) {
           this.printIcon.style.zIndex = a[3]
       }
       if (this.transparentIcon) {
           this.transparentIcon.style.zIndex = a[4]
       }
       this.shadow.style.zIndex = a[2];
       if (this.printShadow) {
           this.printShadow.style.zIndex = a[2]
       }
   };
   J.prototype.addToInfoWindowMask = function(a, b) {
       if (!this.icon.imageMap) {
           return
       }
       var c = this.iconImage;
       if (c.offsetLeft + c.width >= a.x && (c.offsetLeft <= b.x && (c.offsetTop + c.height >= a.y && c.offsetTop <= b.y))) {
           var d = this.icon.translateImageMap(c.offsetLeft - a.x, c.offsetTop - a.y);
           var e = j.callback(this, this.onMouseDown);
           this.map.infoWindow.addAreaToMaskMap(d, e)
       }
   };
   J.prototype.getOffsetTop = function() {
       return this.iconImage.offsetTop
   };
   J.prototype.display = function(a) {
       if (a) {
           for (var b = 0; b < this.images.length; ++b) {
               this.images[b].style.display = ""
           }
       } else {
           for (var b = 0; b < this.images.length; ++b) {
               this.images[b].style.display = "none"
           }
       }
   };
   J.prototype.openInfoWindow = function(a) {
       this.map.openInfoWindow(this.point, a, this.icon.getInfoWindowOffset(), j.callback(this, this.onInfoWindowOpen), j.callback(this, this.onInfoWindowClose))
   };
   J.prototype.openInfoWindowHtml = function(a) {
       this.map.openInfoWindowHtml(this.point, a, this.icon.getInfoWindowOffset(), j.callback(this, this.onInfoWindowOpen), j.callback(this, this.onInfoWindowClose))
   };
   J.prototype.openInfoWindowXslt = function(a, b) {
       this.map.openInfoWindowXslt(this.point, a, b, this.icon.getInfoWindowOffset(), j.callback(this, this.onInfoWindowOpen), j.callback(this, this.onInfoWindowClose))
   };
   J.prototype.showMapBlowup = function(a, b) {
       this.map.showMapBlowup(this.point, a, b, this.icon.getInfoWindowOffset(), j.callback(this, this.onInfoWindowOpen), j.callback(this, this.onInfoWindowClose))
   };
   J.prototype.onMouseDown = function(a) {
       A(a);
       j.trigger(this, "click")
   };
   J.prototype.onInfoWindowOpen = function() {
       j.trigger(this, "infowindowopen", this)
   };
   J.prototype.onInfoWindowClose = function() {
       j.trigger(this, "infowindowclose", this)
   };

   function D(a, b, c, d) {
       this.color = b || "#0000ff";
       this.weight = c || 5;
       this.opacity = d || 0.45;
       this.points = null;
       this.nextPointAtIndexLevel = null;
       this.zoomFactor = 32;
       this.minTolerance = 1.0E-5;
       if (a) {
           this.points = [];
           for (var e = 0; e < a.length; e++) {
               this.points.push(a[e].y / 1.0E-5);
               this.points.push(a[e].x / 1.0E-5)
           }
           this.nextPointIndexAtLevel = [
               []
           ];
           for (var e = 0; e < this.points.length / 2; e++) {
               this.nextPointIndexAtLevel[0][e] = e + 1
           }
       }
   }
   D.fromEncoded = function(a, b, c, d, e, f, h) {
       var g = new D(null, e, f, h);
       g.points = D.decodePolyline(a);
       g.zoomFactor = d;
       g.nextPointIndexAtLevel = D.decodeLevels(b, c, g.points.length / 2);
       return g
   };
   D.prototype.initialize = function(a) {
       this.map = a;
       this.drawBounds = new z(-R, -R, R, R)
   };
   D.prototype.remove = function() {
       if (this.drawElement) {
           this.map.div.removeChild(this.drawElement);
           this.drawElement = null
       }
   };
   D.prototype.copy = function() {
       var a = new D(null, this.color, this.weight, this.opacity);
       a.points = this.points;
       a.zoomFactor = this.zoomFactor;
       a.nextPointIndexAtLevel = this.nextPointIndexAtLevel;
       return a
   };
   D.prototype.redraw = function(a) {
       if (!a && this.drawElement) {
           var b = this.map.getBoundsBitmap();
           if (this.drawBounds.containsBounds(b)) {
               return
           }
       }
       P.start("Polyline", "redraw");
       var c = 900;
       var d = Math.min(this.map.viewSize.width, c);
       var e = Math.min(this.map.viewSize.height, c);
       if (u.type == 1) {
           d = 5000;
           e = 5000
       }
       this.drawBounds.minX = this.map.centerBitmap.x - d;
       this.drawBounds.minY = this.map.centerBitmap.y - e;
       this.drawBounds.maxX = this.map.centerBitmap.x + d;
       this.drawBounds.maxY = this.map.centerBitmap.y + e;
       var f = this.map.spec.getLatLng(this.drawBounds.minX, this.drawBounds.minY, this.map.zoomLevel);
       var h = this.map.spec.getLatLng(this.drawBounds.maxX, this.drawBounds.maxY, this.map.zoomLevel);
       var g = new z(f.x, h.y, h.x, f.y);
       var i = 0;
       if (this.drawElement) {
           i = this.drawElement.style.zIndex;
           this.map.div.removeChild(this.drawElement);
           this.drawElement = null
       }
       var m = this.getDrawingTolerance();
       if (u.type == 1) {
           this.drawElement = this.createVectorSegments(g, m, this.drawBounds)
       } else {
           this.drawElement = this.createImageSegments(g, m, this.drawBounds)
       }
       this.drawElement.style.zIndex = i;
       this.map.div.appendChild(this.drawElement);
       P.end("Polyline", "redraw")
   };
   D.prototype.getLatitude = function() {
       return 0
   };
   D.prototype.setZIndex = function(a) {
       this.drawElement.style.zIndex = a[0]
   };
   D.prototype.display = function(a) {
       if (a) {
           this.drawElement.style.display = ""
       } else {
           this.drawElement.style.display = "none"
       }
   };
   D.prototype.getPoint = function(a) {
       a <<= 1;
       return new q(this.points[a + 1] * 1.0E-5, this.points[a] * 1.0E-5)
   };
   D.prototype.getVectors = function(a, b, c) {
       P.start("Polyline", "getVectors");
       if (c == null) c = new Array();
       this.getVectorsHelper(a, 0, this.points.length / 2 - 1, this.nextPointIndexAtLevel.length - 1, b, c);
       P.end("Polyline", "getVectors");
       return c
   };
   D.prototype.getVectorsHelper = function(a, b, c, d, e, f) {
       var h = 1 / Oa[0];
       for (var g = d; g > 0; --g) {
           h *= this.zoomFactor
       }
       var i = new z();
       i.minX = Math.floor((a.minX - h) * 100000);
       i.minY = Math.floor((a.minY - h) * 100000);
       i.maxX = Math.ceil((a.maxX + h) * 100000);
       i.maxY = Math.ceil((a.maxY + h) * 100000);
       var m = b;
       var n;
       var s = new q();
       s.y = this.points[m << 1];
       s.x = this.points[(m << 1) + 1];
       var t = new q();
       while ((n = this.nextPointIndexAtLevel[d][m]) <= c) {
           t.y = this.points[n << 1];
           t.x = this.points[(n << 1) + 1];
           if (i.containsSegment(s, t)) {
               if (d > e) {
                   this.getVectorsHelper(a, m, n, d - 1, e, f)
               } else {
                   f.push(s.y * 1.0E-5);
                   f.push(s.x * 1.0E-5);
                   f.push(t.y * 1.0E-5);
                   f.push(t.x * 1.0E-5)
               }
           }
           var v = s;
           s = t;
           t = v;
           m = n
       }
   };
   D.decodePolyline = function(a) {
       P.start("Polyline", "decodePolyline");
       var b = a.length;
       var c = 0;
       var d = new Array();
       var e = 0;
       var f = 0;
       while (c < b) {
           var h;
           var g = 0;
           var i = 0;
           do {
               h = a.charCodeAt(c++) - 63;
               i |= (h & 31) << g;
               g += 5
           } while (h >= 32);
           var m = i & 1 ? ~(i >> 1) : i >> 1;
           e += m;
           d.push(e);
           g = 0;
           i = 0;
           do {
               h = a.charCodeAt(c++) - 63;
               i |= (h & 31) << g;
               g += 5
           } while (h >= 32);
           var n = i & 1 ? ~(i >> 1) : i >> 1;
           f += n;
           d.push(f)
       }
       P.end("Polyline", "decodePolyline");
       return d
   };
   D.decodeLevels = function(a, b, c) {
       P.start("Polyline", "decodeLevels");
       var d = new Array(b);
       for (var e = 0; e < b; ++e) d[e] = new Array();
       var f = 0;
       for (var h = 0; h < c; ++h) {
           var g = a.charCodeAt(f++) - 63;
           while (g >= 0) {
               var i = d[g--];
               while (i.length < h) {
                   i.push(h)
               }
           }
       }
       for (var g = 0; g < b; ++g) {
           var i = d[g];
           for (var h = i.length; h < c; ++h) {
               i.push(c)
           }
       }
       P.end("Polyline", "decodeLevels");
       return d
   };
   D.prototype.encodeSigned = function(a, b) {
       return this.encodeUnsigned(a < 0 ? ~(a << 1) : a << 1, b)
   };
   D.prototype.encodeUnsigned = function(a, b) {
       if (!b) b = new Array();
       while (a >= 32) {
           b.push(String.fromCharCode((32 | a & 31) + 63));
           a >>= 5
       }
       b.push(String.fromCharCode(a + 63));
       return b
   };
   D.prototype.getDrawingTolerance = function() {
       var a = 0;
       var b = this.getPoint(0);
       var c = new H(this.minTolerance, this.minTolerance);
       var d = new H(2, 2);
       while (a < this.nextPointIndexAtLevel.length) {
           c.width *= this.zoomFactor;
           c.height *= this.zoomFactor;
           var e = this.map.spec.getLowestZoomLevel(b, c, d);
           if (this.map.zoomLevel < e) {
               break
           }++a
       }
       return a
   };
   var lb = new q(0, 0);
   D.prototype.createVectorSegments = function(a, b, c) {
       P.start("Polyline", "createVectorSegments");
       var d = this.getVectors(a, b);
       var e = new Array();
       var f = new z();
       this.getBitmapVectors(d, e, f);
       if (!c) {
           c = new z()
       }
       var h = z.intersection(c, f);
       var g;
       if (e.length > 0) {
           var i = this.map.centerBitmap;
           var m = this.map.getDivCoordinate(i.x, i.y, lb);
           g = document.createElement("v:shape");
           g.unselectable = "on";
           g.fill = false;
           g.filled = false;
           var n = 1;
           var s = 1;
           g.style.position = "absolute";
           g.style.width = l(n);
           g.style.height = l(s);
           g.style.left = l(m.x);
           g.style.top = l(m.y);
           var t = i.x + " " + i.y;
           g.coordorigin = t;
           g.coordsize = n + " " + s;
           g.path = this.getVectorPath(e);
           var v = document.createElement("v:stroke");
           v.joinstyle = "round";
           v.endcap = "round";
           v.opacity = this.opacity;
           v.color = this.color;
           v.weight = l(this.weight);
           g.appendChild(v)
       } else {
           g = document.createElement("div")
       }
       P.end("Polyline", "createVectorSegments");
       return g
   };
   var Ec = new q(0, 0);
   D.prototype.getBitmapVectors = function(a, b, c, d) {
       if (!b) b = new Array();
       if (!c) c = new z();
       c.minX = R;
       c.minY = R;
       c.maxX = -R;
       c.maxY = -R;
       var e = typeof d != "undefined" ? d : this.map.zoomLevel;
       for (var f = 0; f < a.length;) {
           var h = a[f++];
           var g = a[f++];
           var i = this.map.spec.getBitmapCoordinate(h, g, e, Ec);
           i.x = Math.round(i.x);
           i.y = Math.round(i.y);
           b.push(i.x);
           b.push(i.y);
           if (i.x < c.minX) c.minX = i.x;
           if (i.y < c.minY) c.minY = i.y;
           if (i.x > c.maxX) c.maxX = i.x;
           if (i.y > c.maxY) c.maxY = i.y
       }
       return b
   };
   D.prototype.getVectorPath = function(a) {
       var b = new Array();
       var c;
       var d;
       for (var e = 0; e < a.length;) {
           var f = a[e++];
           var h = a[e++];
           var g = a[e++];
           var i = a[e++];
           if (h != c || f != d) {
               b.push("m");
               b.push(f);
               b.push(h);
               b.push("l")
           }
           b.push(g);
           b.push(i);
           c = i;
           d = g
       }
       b.push("e");
       return b.join(" ")
   };
   D.prototype.createImageSegments = function(a, b, c) {
       P.start("Polyline", "createImageSegments");
       var d;
       var e;
       do {
           var f = this.getVectors(a, b);
           var h = new Array();
           var g = new z();
           this.getBitmapVectors(f, h, g);
           g.minX -= this.weight;
           g.minY -= this.weight;
           g.maxX += this.weight;
           g.maxY += this.weight;
           if (!c) {
               c = new z()
           }
           e = z.intersection(c, g);
           d = this.getEncodedImageSource(h, e.minX, e.minY);
           ++b
       } while (d.length > 900);
       var i;
       if (d.length > 0) {
           var m = this.map.getDivCoordinate(e.minX, e.minY, lb);
           var n = 0;
           var s = 0;
           var t = 255;
           try {
               var v = this.color;
               if (v.charAt(0) == "#") {
                   v = v.substring(1)
               }
               n = parseInt(v.substring(0, 2), 16);
               s = parseInt(v.substring(2, 4), 16);
               t = parseInt(v.substring(4, 6), 16)
           } catch (N) {
               y.dump(N)
           }
           var O = (1 - this.opacity) * 255;
           var Z = Math.ceil(e.maxX - e.minX);
           var da = Math.ceil(e.maxY - e.minY);
           var L = "http://mt.google.com/mld?width=" + Z + "&height=" + da + "&path=" + d + "&color=" + n + "," + s + "," + t + "," + O + "&weight=" + this.weight;
           y.writeURL(L);
           if (u.type != 1) {
               Z = null;
               da = null
           }
           var Ba = u.type == 2 ? "noprint" : null;
           i = o.create(L, Z, da, m.x, m.y, 0, false, Ba)
       } else {
           i = document.createElement("div")
       }
       P.end("Polyline", "createImageSegments");
       return i
   };
   D.prototype.getEncodedImageSource = function(a, b, c) {
       if (b == R || c == R) {
           return ""
       }
       var d = [];
       var e;
       var f;
       for (var h = 0; h < a.length;) {
           var g = a[h++];
           var i = a[h++];
           var m = a[h++];
           var n = a[h++];
           if (g == m && i == n) {
               continue
           }
           if (g != e || i != f) {
               if (d.length > 0) {
                   this.encodeSigned(9999, d)
               }
               this.encodeSigned(g - b, d);
               this.encodeSigned(i - c, d)
           }
           this.encodeSigned(m - g, d);
           this.encodeSigned(n - i, d);
           f = n;
           e = m
       }
       this.encodeSigned(9999, d);
       return d.join("")
   };

   var Bb = p + "dir_";

   function W(a, b, c) {
       this.point = a;
       this.start = b;
       this.end = c;
       this.element = null;
       this.angle = null;
       this.lastSpec = null
   }
   W.fromPolylinePoint = function(a, b) {
       ob(b >= 2);
       var c = a.getPoint(b);
       var d = a.getPoint(b - 2);
       return new W(c, d, c)
   };
   W.prototype.initialize = function(a) {
       this.map = a
   };
   W.prototype.remove = function() {
       if (this.element) {
           this.map.div.removeChild(this.element);
           this.element = null
       }
   };
   W.prototype.copy = function() {
       return new W(this.point, this.start, this.end)
   };
   W.prototype.redraw = function(a) {
       if (!a) {
           return
       }
       if (!this.element || this.lastSpec != this.map.spec) {
           this.remove();
           var b = this.getAngle();
           var c = this.getDirIndicatorPath(b);
           this.element = o.create(c, 24, 24, 0, 0, 2, false);
           this.map.div.appendChild(this.element);
           this.angle = b;
           this.lastSpec = this.map.spec
       }
       var d = 12 * Math.cos(this.angle);
       var e = 12 * Math.sin(this.angle);
       d = Math.floor(-12 - d);
       e = Math.floor(-12 - e);
       var f = this.map.spec.getBitmapCoordinate(this.point.y, this.point.x, this.map.zoomLevel);
       var h = this.map.getDivCoordinate(f.x, f.y);
       this.element.style.left = l(h.x + d);
       this.element.style.top = l(h.y + e)
   };
   W.prototype.getLatitude = function() {
       return this.point.y
   };
   W.prototype.setZIndex = function(a) {
       this.element.style.zIndex = a[0]
   };
   W.prototype.getAngle = function() {
       var a = this.map.spec.getBitmapCoordinate(this.start.y, this.start.x, this.map.zoomLevel);
       var b = this.map.spec.getBitmapCoordinate(this.end.y, this.end.x, this.map.zoomLevel);
       return Math.atan2(b.y - a.y, b.x - a.x)
   };
   W.prototype.getDirIndicatorPath = function(a) {
       var b = Math.round(a * 60 / Math.PI) * 3 + 90;
       while (b >= 120) b -= 120;
       while (b < 0) b += 120;
       var c = Bb + b + ".png";
       return c
   };

   function X(a, b, c) {
       this.anchor = a;
       this.offsetWidth = b || 0;
       this.offsetHeight = c || 0
   }
   X.prototype.apply = function(a) {
       a.style.position = "absolute";
       a.style[this.getWidthMeasure()] = l(this.offsetWidth);
       a.style[this.getHeightMeasure()] = l(this.offsetHeight)
   };
   X.prototype.getWidthMeasure = function() {
       switch (this.anchor) {
           case 1:
           case 3:
               return "right";
           default:
               return "left"
       }
   };
   X.prototype.getHeightMeasure = function() {
       switch (this.anchor) {
           case 2:
           case 3:
               return "bottom";
           default:
               return "top"
       }
   };

   var Ib = p + "center.png";
   var Jb = p + "east.png";
   var Nb = p + "west.png";
   var Kb = p + "north.png";
   var Mb = p + "south.png";
   var Lb = p + "panshadow.png";
   var Ob = p + "zoom-plus.png";
   var Pb = p + "zoom-minus.png";
   var Qb = p + "slider.png";
   var Eb = p + "east-mini.png";
   var Hb = p + "west-mini.png";
   var Fb = p + "north-mini.png";
   var Gb = p + "south-mini.png";
   var bb = p + "zoom-plus-mini.png";
   var cb = p + "zoom-minus-mini.png";

   function U() {}
   U.prototype.initialize = function(a) {
       this.map = a;
       var b = a.ownerDocument.createElement("div");
       this.createPanningControls(a, b);
       this.createZoomControls(a, b);
       this.createZoomSlider(a, b);
       return b
   };
   U.prototype.getDefaultPosition = function() {
       return new X(0, 8, 8)
   };
   U.prototype.createPanningControls = function(a, b) {
       var c = o.create(Lb, 59, 64, 0, 0, 0, false, null, a.ownerDocument);
       b.appendChild(c);
       var d = o.create(Kb, 17, 17, 20, 0, 1, false, null, a.ownerDocument);
       F(d, "pointer");
       j.bindDom(d, "click", this, function(i) {
           a.pan(0, Math.floor(a.viewSize.height * 0.5));
           A(i)
       });
       d.title = _mPanNorth;
       b.appendChild(d);
       var e = o.create(Jb, 17, 17, 40, 20, 1, false, null, a.ownerDocument);
       F(e, "pointer");
       j.bindDom(e, "click", this, function(i) {
           a.pan(-Math.floor(a.viewSize.width * 0.5), 0);
           A(i)
       });
       e.title = _mPanEast;
       b.appendChild(e);
       var f = o.create(Mb, 17, 17, 20, 40, 1, false, null, a.ownerDocument);
       F(f, "pointer");
       j.bindDom(f, "click", this, function(i) {
           a.pan(0, -Math.floor(a.viewSize.height * 0.5));
           A(i)
       });
       f.title = _mPanSouth;
       b.appendChild(f);
       var h = o.create(Nb, 17, 17, 0, 20, 1, false, null, a.ownerDocument);
       F(h, "pointer");
       j.bindDom(h, "click", this, function(i) {
           a.pan(Math.floor(a.viewSize.width * 0.5), 0);
           A(i)
       });
       h.title = _mPanWest;
       b.appendChild(h);
       var g = o.create(Ib, 17, 17, 20, 20, 1, false, null, a.ownerDocument);
       F(g, "pointer");
       j.bindDom(g, "click", this, function(i) {
           a.closeInfoWindow();
           if (a.lastPageCenter) {
               if (a.lastPageZoom != a.zoomLevel) {
                   a.centerAndZoom(a.lastPageCenter, a.lastPageZoom)
               } else {
                   a.recenterOrPanToLatLng(a.lastPageCenter)
               }
           } else if (a.lastLatLng) {
               a.recenterOrPanToLatLng(a.lastLatLng)
           }
           A(i)
       });
       g.title = _mLastResult;
       b.appendChild(g)
   };
   U.prototype.createZoomControls = function(a, b) {
       var c = o.create(Ob, 17, 17, 20, 70, 1, false, null, a.ownerDocument);
       F(c, "pointer");
       j.bindDom(c, "click", this, function(e) {
           a.zoomTo(a.zoomLevel - 1);
           A(e)
       });
       c.title = _mZoomIn;
       b.appendChild(c);
       var d = o.create(Pb, 17, 17, 20, 260, 1, false, null, a.ownerDocument);
       F(d, "pointer");
       j.bindDom(d, "click", this, function(e) {
           a.zoomTo(a.zoomLevel + 1);
           A(e)
       });
       d.title = _mZoomOut;
       b.appendChild(d)
   };
   U.prototype.createZoomSlider = function(a, b) {
       if (a.mapTypes[0].numZoomLevels >= 18) {
           var c = p + "18sliderbar.png";
           var d = p + "18slidershadow.png";
           var e = 166;
           var f = 214;
           this.sliderNotchHeight = 7
       } else {
           var c = p + "sliderbar.png";
           var d = p + "slidershadow.png";
           var e = 167;
           var f = 215;
           this.sliderNotchHeight = 11
       }
       var h = o.create(d, 19, f, 20, 64, 0, false, null, a.ownerDocument);
       b.appendChild(h);
       var g = a.ownerDocument.createElement("div");
       g.style.position = "absolute";
       g.style.left = l(21);
       g.style.top = l(90);
       g.style.width = l(15);
       g.style.height = l(e);
       var c = o.create(c, 15, e, 0, 0, 1, false, null, a.ownerDocument);
       g.appendChild(c);
       var i = -1 * Math.floor(3.5) + 1;
       var m = o.create(Qb, 22, 14, i, this.getRelativeZoomSliderPos(), 2, false, null, a.ownerDocument);
       m.title = _mZoomDrag;
       g.appendChild(m);
       b.appendChild(g);
       var n = new z(i, 1, i + 22, e - 1);
       var s = new $(m, i, this.getRelativeZoomSliderPos(), n);
       j.bind(a, "zoom", this, function() {
           s.moveTo(i, this.getRelativeZoomSliderPos())
       });
       if (u.type == 1) {
           j.bind(s, "dragstart", this, function() {
               this.savedOffset = {
                   "x": this.map.div.offsetLeft,
                   "y": this.map.div.offsetTop
               };
               this.map.hideOverlays()
           });
           j.bind(s, "drag", this, function() {
               var t = s.top + Math.floor(this.sliderNotchHeight / 2);
               var v = this.getZoomFactorFromRelativeCoord(t);
               this.applyZoom(v)
           });
           j.bind(s, "dragend", this, function() {
               var t = s.top + Math.floor(this.sliderNotchHeight / 2);
               this.targetZoom = this.getZoomFromRelativeCoord(t);
               this.currentZoom = this.getZoomFactorFromRelativeCoord(t);
               this.zoomInterval = xb(this, this.animateZoom, 50)
           })
       } else {
           j.bind(s, "dragend", this, function() {
               var t = s.top + Math.floor(this.sliderNotchHeight / 2);
               this.map.zoomTo(this.getZoomFromRelativeCoord(t))
           })
       }
       F(c, "pointer");
       c.title = _mZoomSet;
       j.bindDom(c, "click", this, function(t) {
           var v;
           if (u.type == 1) {
               v = window.event.offsetY
           } else {
               var N = La(g);
               v = t.pageY - N.y - 2
           }
           A(t);
           a.zoomTo(this.getZoomFromRelativeCoord(v))
       })
   };
   U.prototype.getRelativeZoomSliderPos = function() {
       return 1 + this.map.zoomLevel * this.sliderNotchHeight
   };
   U.prototype.getZoomFromRelativeCoord = function(a) {
       var b = Math.floor((a - 1) / this.sliderNotchHeight);
       return Math.max(0, Math.min(this.map.spec.numZoomLevels - 1, b))
   };
   U.prototype.getZoomFactorFromRelativeCoord = function(a) {
       var b = (a - 1) / this.sliderNotchHeight;
       return Math.max(0, Math.min(this.map.spec.numZoomLevels - 1, b))
   };
   U.prototype.applyZoom = function(a) {
       var b = this.map;
       var c = Math.floor(Math.log(this.map.viewSize.width) * Math.LOG2E - 2);
       var d = b.zoomLevel - a;
       if (d > c) {
           d = c
       } else if (d < -c) {
           d = -c
       }
       var e = Math.pow(2, d);
       b.div.style.zoom = e;
       var f = b.viewSize.width * b.centerScreen.x;
       var h = b.viewSize.height * b.centerScreen.y;
       b.div.style.left = l((this.savedOffset.x - f) * e + f);
       b.div.style.top = l((this.savedOffset.y - h) * e + h)
   };
   U.prototype.animateZoom = function() {
       var a = this.map;
       this.currentZoom = this.currentZoom + 0.3 * (this.targetZoom - this.currentZoom);
       if (Math.abs(this.targetZoom - this.currentZoom) < 0.05) {
           a.div.style.left = l(this.savedOffset.x);
           a.div.style.top = l(this.savedOffset.y);
           a.div.style.zoom = 1;
           a.showOverlays();
           a.zoomTo(this.targetZoom);
           this.savedOffset = null;
           window.clearInterval(this.zoomInterval)
       } else {
           this.applyZoom(this.currentZoom)
       }
   };

   function ra() {}
   ra.prototype.initialize = function(a) {
       this.map = a;
       var b = a.ownerDocument.createElement("div");
       var c = o.create(Fb, 18, 18, 9, 0, 1, false, null, a.ownerDocument);
       F(c, "pointer");
       j.bindDom(c, "click", this, function(i) {
           a.pan(0, Math.floor(a.viewSize.height * 0.5));
           A(i)
       });
       c.title = _mPanNorth;
       b.appendChild(c);
       var d = o.create(Eb, 18, 18, 18, 18, 1, false, null, a.ownerDocument);
       F(d, "pointer");
       j.bindDom(d, "click", this, function(i) {
           a.pan(-Math.floor(a.viewSize.width * 0.5), 0);
           A(i)
       });
       d.title = _mPanEast;
       b.appendChild(d);
       var e = o.create(Gb, 18, 18, 9, 36, 1, false, null, a.ownerDocument);
       F(e, "pointer");
       j.bindDom(e, "click", this, function(i) {
           a.pan(0, -Math.floor(a.viewSize.height * 0.5));
           A(i)
       });
       e.title = _mPanSouth;
       b.appendChild(e);
       var f = o.create(Hb, 18, 18, 0, 18, 1, false, null, a.ownerDocument);
       F(f, "pointer");
       j.bindDom(f, "click", this, function(i) {
           a.pan(Math.floor(a.viewSize.width * 0.5), 0);
           A(i)
       });
       f.title = _mPanWest;
       b.appendChild(f);
       var h = o.create(bb, 18, 18, 9, 57, 1, false, null, a.ownerDocument);
       F(h, "pointer");
       j.bindDom(h, "click", this, function(i) {
           a.zoomTo(a.zoomLevel - 1);
           A(i)
       });
       h.title = _mZoomIn;
       b.appendChild(h);
       var g = o.create(cb, 18, 18, 9, 75, 1, false, null, a.ownerDocument);
       F(g, "pointer");
       j.bindDom(g, "click", this, function(i) {
           a.zoomTo(a.zoomLevel + 1);
           A(i)
       });
       g.title = _mZoomOut;
       b.appendChild(g);
       return b
   };
   ra.prototype.getDefaultPosition = function() {
       return new X(0, 9, 9)
   };

   function sa() {}
   sa.prototype.initialize = function(a) {
       this.map = a;
       var b = a.ownerDocument.createElement("div");
       b.style.width = l(18);
       b.style.height = l(36);
       var c = o.create(bb, 18, 18, 0, 0, 1, false, null, a.ownerDocument);
       F(c, "pointer");
       j.bindDom(c, "click", this, function(e) {
           a.zoomTo(a.zoomLevel - 1);
           A(e)
       });
       c.title = _mZoomIn;
       b.appendChild(c);
       var d = o.create(cb, 18, 18, 0, 18, 1, false, null, a.ownerDocument);
       F(d, "pointer");
       j.bindDom(d, "click", this, function(e) {
           a.zoomTo(a.zoomLevel + 1);
           A(e)
       });
       d.title = _mZoomOut;
       b.appendChild(d);
       return b
   };
   sa.prototype.getDefaultPosition = function() {
       return new X(0, 6, 6)
   };

   var Db = p + "poweredby.png";

   function ka(a, b) {
       this.enableTermsLink = a;
       this.enableGoogleCopyright = b
   }
   ka.prototype.initialize = function(a) {
       this.map = a;
       var b = a.ownerDocument.createElement("div");
       a.applyControlStyles(b);
       b.style.right = l(3);
       b.style.bottom = l(3);
       this.div = b;
       this.copyrightSpan = a.ownerDocument.createElement("span");
       b.appendChild(this.copyrightSpan);
       if (this.enableTermsLink) {
           var c = a.ownerDocument.createElement("a");
           c.href = _mTermsURL;
           c.appendChild(a.ownerDocument.createTextNode(_mTerms));
           j.addBuiltInListener(c, "click", Ya);
           b.appendChild(c);
           this.termsLink = c
       }
       this.updateColor();
       this.updateNotice();
       j.bind(this.map, "maptypechanged", this, this.updateColor);
       j.bind(this.map, "moveend", this, this.updateNotice);
       return b
   };
   ka.prototype.getDefaultPosition = function() {
       return new X(3, 3, 3)
   };
   ka.prototype.updateColor = function() {
       if (this.map.spec.getTextColor) {
           this.div.style.color = this.map.spec.getTextColor()
       } else {
           this.div.style.color = "black"
       }
       if (this.termsLink) {
           if (this.map.spec.getLinkColor) {
               this.termsLink.style.color = this.map.spec.getLinkColor()
           } else {
               this.termsLink.style.color = "#7777cc"
           }
       }
   };
   ka.prototype.updateNotice = function() {
       var a = [];
       if (this.enableGoogleCopyright) {
           a.push(_mGoogleCopy)
       }
       if (this.map.spec.getCopyright) {
           var b = this.map.spec.getCopyright(this.map);
           if (b) {
               a.push(b)
           }
       }
       if (this.enableTermsLink) {
           a.push("")
       }
       this.copyrightSpan.innerHTML = a.join(" - ")
   };

   function za() {}
   za.prototype.initialize = function(a) {
       var b = a.ownerDocument.createElement("div");
       a.applyControlStyles(b);
       F(b, "auto");
       b.style.height = l(30);
       var c = a.ownerDocument.createElement("a");
       c.href = nb;
       c.title = _mSiteName;
       c.appendChild(o.create(Db, 62, 30, null, null, false, null, a.ownerDocument));
       b.appendChild(c);
       c.onclick = function() {
           var d = new E();
           d.setAllMapValues(a);
           window.location.href = d.getURL(true);
           return false
       };
       a.container.appendChild(b);
       this.map = a;
       return b
   };
   za.prototype.remove = function() {
       this.map.container.removeChild(this.div)
   };
   za.prototype.getDefaultPosition = function() {
       return new X(2, 3, 1)
   };

   var Jc = p + "leftbar.png";
   var Kc = p + "topbar.png";
   var Gc = p + "bottombar.png";
   var Hc = p + "horibar400.png";
   var Ic = p + "horibarcap.png";

   function Lc(a, b, c, d) {
       this.fpsLength = a;
       this.metricLength = b;
       this.fpsText = c;
       this.metricText = d
   }

   function ga(a, b) {
       this.maxLength = a || 125;
       this.df = b || Qc
   }
   ga.prototype.initialize = function(a) {
       this.map = a;
       this.div = a.ownerDocument.createElement("div");
       this.fps = document.createElement("div");
       this.metric = document.createElement("div");
       a.applyControlStyles(this.div);
       a.applyControlStyles(this.fps);
       a.applyControlStyles(this.metric);
       this.div.style.height = l(26);
       var b = this.decideScale(a, this.maxLength);
       var c = b.fpsLength;
       var d = b.metricLength;
       var e = Math.max(c, d);
       this.fps.style.left = l(8);
       this.fps.style.width = l(e);
       this.fps.style.bottom = l(15);
       this.metric.style.left = l(8);
       this.metric.style.width = l(e);
       this.metric.style.top = l(16);
       this.setText(this.fps, b.fpsText);
       this.setText(this.metric, b.metricText);
       this.leftBar = o.create(Jc, 4, 26, 0, 1, 0, false);
       this.horizontalBar = o.create(Hc, e, 4, 3, 12, 0, true);
       this.horizontalBarCap = o.create(Ic, 1, 4, e + 3, 12, 1, false);
       this.rightTopBar = o.create(Kc, 4, 12, c, 1, 1, false);
       this.rightBottomBar = o.create(Gc, 4, 12, d, 15, 1, false);
       this.div.appendChild(this.leftBar);
       this.div.appendChild(this.horizontalBar);
       this.div.appendChild(this.rightTopBar);
       this.div.appendChild(this.rightBottomBar);
       this.div.appendChild(this.horizontalBarCap);
       this.div.appendChild(this.fps);
       this.div.appendChild(this.metric);
       this.div.title = _mScale;
       j.bind(a, "moveend", this, this.update);
       j.bind(a, "zoom", this, this.update);
       j.bind(a, "move", this, this.update);
       j.bind(a, "maptypechanged", this, this.updateColor);
       this.updateColor();
       return this.div
   };
   ga.prototype.getDefaultPosition = function() {
       return new X(2, 71, 5)
   };
   ga.prototype.updateColor = function() {
       var a = "black";
       if (this.map.spec.getTextColor) {
           a = this.map.spec.getTextColor()
       }
       this.fps.style.color = a;
       this.metric.style.color = a
   };
   ga.prototype.update = function() {
       var a = this.decideScale(this, this.maxLength);
       var b = Math.max(a.fpsLength, a.metricLength);
       this.setText(this.fps, a.fpsText);
       this.setText(this.metric, a.metricText);
       this.width = b + 4;
       this.rightTopBar.left = a.fpsLength;
       this.rightBottomBar.left = a.metricLength;
       this.horizontalBar.width = b;
       this.horizontalBarCap.left = b + 3;
       this.div.style.width = l(b + 4);
       this.rightTopBar.style.left = l(a.fpsLength);
       this.rightBottomBar.style.left = l(a.metricLength);
       this.horizontalBar.style.width = l(b);
       this.horizontalBarCap.style.left = l(b + 3);
       this.metric.style.width = l(a.metricLength);
       this.fps.style.width = l(a.fpsLength)
   };
   ga.prototype.decideScale = function() {
       var a = this.map.spec.getLatLng(this.map.centerBitmap.x - this.maxLength / 2, this.map.centerBitmap.y, this.map.zoomLevel);
       var b = this.map.spec.getLatLng(this.map.centerBitmap.x + this.maxLength / 2, this.map.centerBitmap.y, this.map.zoomLevel);
       var c = this.df(a, b);
       var d = this.round125(c);
       var e;
       var f;
       if (d >= 1000) {
           var h = this.round125(c / 1000);
           f = Math.round(this.maxLength * h / (c / 1000));
           e = h + " " + _mKilometers
       } else {
           var f = Math.round(this.maxLength * d / c);
           var e = d + " " + _mMeters
       }
       var g = c / 1609.344;
       var i = c * 3.28084;
       var m;
       var n;
       if (g >= 1) {
           var s = this.round125(g);
           m = Math.round(this.maxLength * s / g);
           n = s + " " + _mMiles
       } else {
           var t = this.round125(i);
           m = Math.round(this.maxLength * t / i);
           n = t + " " + _mFeet
       }
       return new Lc(m, f, n, e)
   };
   ga.prototype.round125 = function(a) {
       var b = a;
       if (b > 1) {
           var c = 0;
           while (b >= 10) {
               b = b / 10;
               c = c + 1
           }
           if (b >= 5) {
               b = 5
           } else if (b >= 2) {
               b = 2
           } else {
               b = 1
           }
           while (c > 0) {
               b = b * 10;
               c = c - 1
           }
       }
       return b
   };
   ga.prototype.setText = function(a, b) {
       if (a.innerHTML != b) {
           a.innerHTML = b
       }
   };

   var xc = p + "l1.png";
   var zc = p + "m1.png";
   var Bc = p + "r1.png";
   var yc = p + "l5.png";
   var Ac = p + "m5.png";
   var Cc = p + "r5.png";

   function Dc(a, b, c, d, e, f) {
       this.mapType = a;
       this.div = b;
       this.left = c;
       this.right = e;
       this.middle = d;
       this.text = f
   }

   function fa(a) {
       this.tiny = a;
       if (a) {
           this.buttonWidth = 50
       } else {
           this.buttonWidth = 75
       }
   }
   fa.prototype.initialize = function(a) {
       var b = a.ownerDocument.createElement("div");
       a.applyControlStyles(b);
       b.style.height = l(19);
       b.style.width = l(this.buttonWidth * a.mapTypes.length + 2 * (a.mapTypes.length - 1));
       var c = [];
       for (var d = 0; d < a.mapTypes.length; d++) {
           var e = this.createButton(a, d);
           c.push(e);
           b.appendChild(e.div)
       }
       this.buttons = c;
       this.map = a;
       a.container.appendChild(b);
       this.updateButtons();
       j.bind(a, "maptypechanged", this, this.updateButtons);
       return b
   };
   fa.prototype.getDefaultPosition = function() {
       return new X(1, 7, 7)
   };
   fa.prototype.createButton = function(a, b) {
       var c = a.mapTypes[b];
       var d = a.ownerDocument.createElement("div");
       d.style.height = l(19);
       d.style.width = l(this.buttonWidth);
       d.style.overflow = "hidden";
       d.style.position = "absolute";
       d.style.top = l(0);
       d.style.left = l(b * (this.buttonWidth + 2));
       var e = o.create(ma, 2, 19, 0, 0, 0, false, null, a.ownerDocument);
       d.appendChild(e);
       var f = this.buttonWidth - 4 - 2;
       var h = o.create(ma, f, 19, 2, 0, 0, true, null, a.ownerDocument);
       d.appendChild(h);
       var g = o.create(ma, 4, 19, null, null, 0, false, null, a.ownerDocument);
       g.style.position = "absolute";
       g.style.top = l(0);
       g.style.right = l(0);
       d.appendChild(g);
       var i = a.ownerDocument.createElement("div");
       i.style.position = "absolute";
       i.style.left = l(2);
       i.style.width = l(f);
       i.style.right = l(0);
       i.style.height = l(19);
       i.style.fontSize = l(12);
       i.style.textAlign = "center";
       i.style.paddingTop = l(1);
       i.style.zIndex = 1;
       var m;
       if (this.tiny && c.getShortLinkText) {
           m = c.getShortLinkText()
       } else {
           m = c.getLinkText()
       }
       i.appendChild(a.ownerDocument.createTextNode(m));
       d.appendChild(i);
       F(d, "pointer");
       j.addBuiltInListener(d, "click", function() {
           a.setMapType(c)
       });
       return new Dc(c, d, e, h, g, i)
   };
   fa.prototype.updateButtons = function() {
       var a = this.map.getCurrentMapType();
       for (var b = 0; b < this.buttons.length; b++) {
           var c = this.buttons[b];
           if (c.mapType == a) {
               o.setImage(c.left, yc);
               o.setImage(c.middle, Ac, true);
               o.setImage(c.right, Cc);
               c.text.style.fontWeight = "bold"
           } else {
               o.setImage(c.left, xc);
               o.setImage(c.middle, zc, true);
               o.setImage(c.right, Bc);
               c.text.style.fontWeight = "normal"
           }
       }
   };

   function ta(a) {
       this.anchorLevel = null;
       this.anchor = new q(0, 0);
       this.spec = null;
       this.span = new H(R, R);
       this.points = null;
       this.map = a;
       j.bind(this.map, "moveend", this, this.onMapMoveEnd);
       j.bind(this.map, "resize", this, this.onMapResize)
   }
   ta.prototype.onMapMoveEnd = function() {
       if (this.anchorLevel != this.map.zoomLevel || this.spec != this.map.spec) {
           this.reset();
           this.addPoint(0, 0, true);
           return
       }
       var a = this.map.getCenterLatLng();
       var b = Math.round((a.x - this.anchor.x) / this.span.width);
       var c = Math.round((a.y - this.anchor.y) / this.span.height);
       this.addPoint(b, c, true)
   };
   ta.prototype.onMapResize = function() {
       this.reset();
       this.addPoint(0, 0, false)
   };
   ta.prototype.reset = function() {
       this.map.getCenterLatLng(this.anchor);
       this.map.getSpanLatLng(this.span);
       this.spec = this.map.spec;
       this.anchorLevel = this.map.zoomLevel;
       this.points = new Object()
   };
   ta.prototype.addPoint = function(a, b, c) {
       var d = a + "," + b;
       if (this.points[d]) return;
       this.points[d] = 1;
       if (c) {
           var e = new E();
           e.setAllMapValues(this.map);
           var f = new q(this.anchor.x + a * this.span.width, this.anchor.y + b * this.span.height);
           e.setValue("vp", e.getLatLngArg(f));
           if (window._apiKey) {
               e.setValue("key", window._apiKey)
           }
           var h = e.getURL(true);
           y.writeURL(h);
           if (!this.sender) {
               this.sender = document.createElement("img");
               this.sender.style.position = "absolute";
               this.sender.style.visibility = "hidden";
               this.sender.style.top = l(-10);
               this.sender.style.left = l(-10);
               this.sender.style.width = l(1);
               this.sender.style.height = l(1);
               document.body.appendChild(this.sender)
           }
           this.sender.src = h
       }
   };

   var T = new aa();
   T.image = p + "marker.png";
   T.shadow = p + "shadow50.png";
   T.iconSize = new H(20, 34);
   T.shadowSize = new H(37, 34);
   T.iconAnchor = new q(9, 34);
   T.infoWindowAnchor = new q(9, 2);
   T.infoShadowAnchor = new q(18, 25);
   T.transparent = p + "markerTransparent.png";
   T.imageMap = [9, 0, 6, 1, 4, 2, 2, 4, 0, 8, 0, 12, 1, 14, 2, 16, 5, 19, 7, 23, 8, 26, 9, 30, 9, 34, 11, 34, 11, 30, 12, 26, 13, 24, 14, 21, 16, 18, 18, 16, 20, 12, 20, 8, 18, 4, 16, 2, 15, 1, 13, 0];
   T.printImage = p + "markerie.gif";
   T.mozPrintImage = p + "markerff.gif";
   T.printShadow = p + "dithshadow.gif";

   function la() {}

   function Da(a, b, c) {
       this.markers = a;
       this.panelStyle = b;
       this.xml = c
   }

   function wa(a, b, c) {
       this.polyline = a;
       this.segments = b;
       this.xml = c
   }

   function Ua(a, b, c) {
       this.id = a;
       this.description = b;
       this.pointIndex = c
   }
   la.fromXml = function(a) {
       var b = [];
       var c = a.getElementsByTagName("overlay");
       for (var d = 0; d < c.length; d++) {
           b.push(Da.fromXml(c[d]))
       }
       var e = new la();
       e.query = V(I(a, "query"));
       e.title = V(I(a, "title"));
       e.error = I(a, "error");
       e.spelling = I(a, "spelling");
       e.refinements = I(a, "refinements");
       e.center = q.fromLatLngXml(I(a, "center"));
       e.viewSpan = H.fromLatLngXml(I(a, "span"));
       e.searchCenter = q.fromLatLngXml(I(a, "searchcenter"));
       e.searchSpan = H.fromLatLngXml(I(a, "searchspan"));
       e.overlays = b;
       e.directions = wa.fromXml(I(a, "directions"));
       e.debug = Pc(I(a, "debug"));
       e.xml = a;
       return e
   };
   Da.fromXml = function(a) {
       if (!a) return null;
       var b = [];
       var c = a.getElementsByTagName("location");
       for (var d = 0; d < c.length; d++) {
           b.push(J.fromXml(c[d]))
       }
       return new Da(b, a.getAttribute("panelStyle"), a)
   };
   wa.fromXml = function(a) {
       if (!a) return null;
       var b = [];
       var c = I(a, "segments");
       var d = c.getElementsByTagName("segment");
       for (var e = 0; e < d.length; ++e) {
           b.push(Ua.fromXml(d[e]))
       }
       return new wa(D.fromXml(I(a, "polyline")), b, a)
   };
   Ua.fromXml = function(a) {
       if (!a) return null;
       return new Ua(a.getAttribute("id"), V(a), parseInt(a.getAttribute("pointIndex")))
   };
   D.fromXml = function(a) {
       if (!a) return null;
       return D.fromEncoded(V(I(a, "points")), V(I(a, "levels")), parseInt(a.getAttribute("numLevels")), parseInt(a.getAttribute("zoomFactor")))
   };
   J.fromXml = function(a) {
       if (!a) return null;
       var b = aa.fromXml(I(a, "icon"));
       if (!b) {
           return {
               "xml": a
           }
       }
       var c = new J(q.fromLatLngXml(I(a, "point")), b);
       c.id = a.getAttribute("id");
       c.infoStyle = a.getAttribute("infoStyle");
       c.xml = a;
       return c
   };
   aa.fromXml = function(a) {
       if (!a) {
           return null
       }
       var b = a.getAttribute("class");
       if (b != "local") {
           return null
       }
       var c = new aa(T);
       c.setImage(a.getAttribute("image"));
       return c
   };
   q.fromLatLngXml = function(a) {
       if (!a) return null;
       return new q(parseFloat(a.getAttribute("lng")), parseFloat(a.getAttribute("lat")))
   };
   H.fromLatLngXml = function(a) {
       if (!a) return null;
       return new H(parseFloat(a.getAttribute("lng")), parseFloat(a.getAttribute("lat")))
   };
   Da.prototype.getMarkerById = function(a) {
       for (var b = 0; b < this.markers.length; b++) {
           if (this.markers[b].id == a) return this.markers[b]
       }
       return null
   };
   wa.prototype.getSegmentById = function(a) {
       for (var b = 0; b < this.segments.length; b++) {
           if (this.segments[b].id == a) return this.segments[b]
       }
       return null
   };

   var gc = p + "iws_nw.png";
   var ec = p + "iws_n.png";
   var fc = p + "iws_ne.png";
   var dc = p + "iws_e.png";
   var cc = p + "iws_c.png";
   var kc = p + "iws_w.png";
   var jc = p + "iws_sw.png";
   var gb = p + "iws_s.png";
   var ic = p + "iws_se.png";
   var hc = p + "iws_tap.png";
   var $b = p + "iw_nw.png";
   var Yb = p + "iw_n.png";
   var Zb = p + "iw_ne.png";
   var Xb = p + "iw_e.png";
   var Vb = p + "iw_c.png";
   var mc = p + "iw_w.png";
   var lc = p + "iw_sw.png";
   var fb = p + "iw_s.png";
   var bc = p + "iw_se.png";
   var ac = p + "iw_tap.png";

   function x(a, b, c) {
       this.createWindow(b);
       this.createShadow(c);
       if (u.type != 1) {
           this.createMask()
       } else {
           this.maskPng = null
       }
       this.createContentArea();
       this.createCloseButton();
       a.appendChild(this.windowDiv);
       a.appendChild(this.shadowDiv);
       this.setSize(208, 69);
       this.hide();
       xb(this, this.checkSize, 100)
   }
   x.prototype.setContentSize = function(a, b) {
       this.setSize(a - (this.window.w.width - 15) * 2, b - (this.window.n.height - 15) * 2)
   };
   x.prototype.setSize = function(a, b) {
       if (a < 0) a = 0;
       if (b < 0) b = 0;
       this.width = a;
       this.height = b;
       this.setWindowSize(a, b);
       this.setShadowSize(a, b);
       if (this.hasMask()) {
           this.setMaskSize()
       }
       this.closeButton.style.left = this.getTotalWidth() - this.closeButton.width - 10 - 1 + "px";
       this.closeButton.style.top = "10px"
   };
   x.prototype.getWindowHeight = function() {
       return this.window.c.height + 2 * this.window.n.height
   };
   x.prototype.getTotalHeight = function() {
       return this.height + this.window.pointer.height + this.window.n.height
   };
   x.prototype.getTotalHeightAboveGround = function() {
       var a = this.pixelOffset ? this.pixelOffset.height : 0;
       return this.getTotalHeight() - a
   };
   x.prototype.getTotalShadowHeight = function() {
       return Math.floor(this.height / 4) + this.shadow.pointer.height + this.shadow.nw.height
   };
   x.prototype.getTotalWidth = function() {
       return this.width + this.window.w.width + this.window.e.width
   };
   x.prototype.getOffsetLeft = function() {
       return this.windowDiv.offsetLeft
   };
   x.prototype.getOffsetTop = function() {
       return this.windowDiv.offsetTop
   };
   x.prototype.setWindowSize = function(a, b) {
       this.window.n.style.width = a + "px";
       this.window.e.style.height = b + "px";
       this.window.c.style.width = a + "px";
       this.window.c.style.height = b + "px";
       this.window.w.style.height = b + "px";
       var c = this.calculatePointerOffset(a);
       this.window.s1.style.width = c + "px";
       this.window.pointer.style.left = c + this.window.sw.width + "px";
       this.window.s2.style.left = c + this.window.pointer.width + this.window.sw.width + "px";
       this.window.s2.style.width = a - c - this.window.pointer.width + "px";
       var d = a + this.window.w.width + "px";
       this.window.ne.style.left = d;
       this.window.e.style.left = d;
       this.window.se.style.left = d;
       var e = b + this.window.n.height + "px";
       this.window.sw.style.top = e;
       this.window.s1.style.top = e;
       this.window.pointer.style.top = e;
       this.window.s2.style.top = e;
       this.window.se.style.top = e
   };
   x.prototype.setShadowSize = function(a, b) {
       a -= 15;
       var c = Math.floor(b / 4);
       var d = a + this.shadow.nw.width;
       var e = this.calculatePointerOffset(a) - 41;
       var f = c + this.shadow.n.height + "px";
       var h = c + this.shadow.nw.height;
       this.shadow.s1Div.style.width = Math.max(e, 0) + "px";
       this.shadow.pointer.style.left = e + this.shadow.sw.width + "px";
       this.shadow.s2Div.style.left = e + this.shadow.pointer.width + this.shadow.sw.width + "px";
       this.shadow.s2Div.style.width = a - e - this.shadow.pointer.width + "px";
       this.shadow.sw.style.top = f;
       this.shadow.s1Div.style.top = f;
       this.shadow.pointer.style.top = f;
       this.shadow.s2Div.style.top = f;
       this.shadow.se.style.top = f;
       this.shadow.se.style.left = d + "px";
       var g = this.shadow.nw.height;
       var i = Math.floor(b / 2);
       this.shadow.wDiv.style.height = c + "px";
       this.shadow.wDiv.style.left = g + "px";
       this.shadow.wDiv.style.width = i + "px";
       this.shadow.w.style.left = c - this.shadow.w.width + 80 + "px";
       var m = this.shadow.nw.height + a + 70;
       this.shadow.eDiv.style.height = c + "px";
       this.shadow.eDiv.style.left = m + "px";
       this.shadow.eDiv.style.width = b + "px";
       this.shadow.e.style.left = c - this.shadow.w.width + 80 + "px";
       var n = g + i;
       this.shadow.cDiv.style.width = m - n + "px";
       this.shadow.cDiv.style.height = c + "px";
       this.shadow.cDiv.style.left = n + "px";
       this.shadow.nw.style.left = h + "px";
       this.shadow.nDiv.style.width = a - 30 + "px";
       this.shadow.nDiv.style.left = h + this.shadow.nw.width + "px";
       this.shadow.ne.style.left = d + h - 30 + "px"
   };
   x.prototype.setMaskSize = function() {
       this.maskPng.style.width = this.getTotalWidth() + "px";
       this.maskPng.style.height = this.getTotalHeight() + "px";
       var a = this.getTotalWidth();
       var b = this.getWindowHeight();
       var c = this.getTotalHeight();
       var d = this.window.pointer.offsetLeft;
       var e = d + this.window.pointer.width;
       var f = d + 53;
       var h = d + 4;
       var g = ",";
       var i = this.getMaskMap();
       if (i) {
           var m = i.firstChild;
           m.setAttribute("coords", "0,0,0," + b + g + f + g + b + g + h + g + c + g + e + g + b + g + a + g + b + g + a + ",0")
       }
   };
   x.prototype.hide = function() {
       if (this.windowDiv) {
           this.windowDiv.style.display = "none"
       }
       this.shadowDiv.style.display = "none"
   };
   x.prototype.show = function() {
       this.windowDiv.style.display = "";
       this.shadowDiv.style.display = "";
       this.windowDiv.style.visibility = "visible";
       this.shadowDiv.style.visibility = "visible";
       this.contentArea.style.visibility = "visible"
   };
   x.prototype.isVisible = function() {
       return this.windowDiv && this.windowDiv.style.display != "none"
   };
   x.prototype.positionAt = function(a, b, c) {
       this.position = {
           "x": a,
           "y": b
       };
       this.positionOffset = c;
       var d = this.calculatePointerOffset(this.width) + this.window.w.width + 5;
       var e = this.height + this.window.n.height + this.window.s1.height;
       this.left = a - d;
       this.top = b - e;
       var f = 0;
       var h = this.getTotalHeight() - this.getTotalShadowHeight();
       if (c) {
           this.left += c.width;
           this.top += c.height;
           f -= Math.floor(c.height / 2) - c.width + 4;
           h -= Math.floor(c.height / 2) - 4
       }
       this.windowDiv.style.left = l(this.left);
       this.windowDiv.style.top = l(this.top);
       this.shadowDiv.style.left = l(this.left + f);
       this.shadowDiv.style.top = l(this.top + h)
   };
   x.prototype.calculatePointerOffset = function(a) {
       return Math.floor(a / 4)
   };
   x.prototype.createCroppingDiv = function(a) {
       var b = window.document.createElement("div");
       b.style.overflow = "hidden";
       b.style.position = "absolute";
       b.style.width = a.width + "px";
       b.style.height = a.height + "px";
       b.style.left = a.style.left;
       b.style.top = a.style.top;
       b.style.zIndex = a.style.zIndex;
       a.style.left = "0px";
       a.style.top = "0px";
       b.appendChild(a);
       return b
   };
   x.prototype.createWindow = function(a) {
       this.window = new Object();
       this.window.nw = o.create($b, 25, 25, 0, 0, 0, false);
       this.window.n = o.create(Yb, 640, 25, this.window.nw.width, 0, 0, true);
       this.window.ne = o.create(Zb, 25, 25, 0, 0, 0, false);
       this.window.w = o.create(mc, 25, 640, 0, this.window.nw.height, 0, true);
       this.window.c = o.create(Vb, 640, 640, this.window.w.width, this.window.n.height, 0, true);
       this.window.e = o.create(Xb, 25, 640, 0, this.window.ne.height, 0, true);
       this.window.sw = o.create(lc, 25, 96, 0, 0, 0, false);
       this.window.s1 = o.create(fb, 640, 96, this.window.sw.width, 0, 0, true);
       this.window.pointer = o.create(ac, 98, 96, 0, 0, 0, false);
       this.window.s2 = o.create(fb, 640, 96, 0, 0, 0, true);
       this.window.se = o.create(bc, 25, 96, 0, 0, 0, false);
       this.windowDiv = window.document.createElement("div");
       this.windowDiv.style.position = "absolute";
       this.windowDiv.style.left = "0px";
       this.windowDiv.style.top = "0px";
       this.windowDiv.style.zIndex = a;
       Ia(this.windowDiv, "noprint");
       j.bindDom(this.windowDiv, "mousedown", this, this.filterMouse);
       j.bindDom(this.windowDiv, "dblclick", this, this.filterMouse);
       this.windowDiv.appendChild(this.window.nw);
       this.windowDiv.appendChild(this.window.n);
       this.windowDiv.appendChild(this.window.ne);
       this.windowDiv.appendChild(this.window.w);
       this.windowDiv.appendChild(this.window.c);
       this.windowDiv.appendChild(this.window.e);
       this.windowDiv.appendChild(this.window.sw);
       this.windowDiv.appendChild(this.window.s1);
       this.windowDiv.appendChild(this.window.pointer);
       this.windowDiv.appendChild(this.window.s2);
       this.windowDiv.appendChild(this.window.se)
   };
   x.prototype.createShadow = function(a) {
       this.shadow = new Object();
       this.shadow.nw = o.create(gc, 70, 30, 0, 0, 0, false);
       this.shadow.n = o.create(ec, 640, 30, this.shadow.nw.width, 0, 0, false);
       this.shadow.ne = o.create(fc, 70, 30, 0, 0, 0, false);
       this.shadow.w = o.create(kc, 360, 280, 0, this.shadow.nw.height, 0, false);
       this.shadow.c = o.create(cc, 640, 640, this.shadow.w.width, this.shadow.n.height, 0, false);
       this.shadow.e = o.create(dc, 360, 280, 0, this.shadow.ne.height, 0, false);
       this.shadow.sw = o.create(jc, 70, 60, 0, 0, 0, false);
       this.shadow.s1 = o.create(gb, 320, 60, this.shadow.sw.width, 0, 0, false);
       this.shadow.pointer = o.create(hc, 140, 60, 0, 0, 0, false);
       this.shadow.s2 = o.create(gb, 320, 60, 0, 0, 0, false);
       this.shadow.se = o.create(ic, 70, 60, 0, 0, 0, false);
       this.shadow.nDiv = this.createCroppingDiv(this.shadow.n);
       this.shadow.wDiv = this.createCroppingDiv(this.shadow.w);
       this.shadow.eDiv = this.createCroppingDiv(this.shadow.e);
       this.shadow.s1Div = this.createCroppingDiv(this.shadow.s1);
       this.shadow.s2Div = this.createCroppingDiv(this.shadow.s2);
       this.shadow.cDiv = this.createCroppingDiv(this.shadow.c);
       this.shadowDiv = window.document.createElement("div");
       this.shadowDiv.style.position = "absolute";
       this.shadowDiv.style.left = "0px";
       this.shadowDiv.style.top = "0px";
       this.shadowDiv.style.zIndex = 0;
       this.shadowDiv.style.zIndex = a;
       Ia(this.shadowDiv, "noprint");
       this.shadowDiv.appendChild(this.shadow.nw);
       this.shadowDiv.appendChild(this.shadow.nDiv);
       this.shadowDiv.appendChild(this.shadow.ne);
       this.shadowDiv.appendChild(this.shadow.wDiv);
       this.shadowDiv.appendChild(this.shadow.cDiv);
       this.shadowDiv.appendChild(this.shadow.eDiv);
       this.shadowDiv.appendChild(this.shadow.sw);
       this.shadowDiv.appendChild(this.shadow.s1Div);
       this.shadowDiv.appendChild(this.shadow.pointer);
       this.shadowDiv.appendChild(this.shadow.s2Div);
       this.shadowDiv.appendChild(this.shadow.se)
   };
   x.prototype.hasMask = function() {
       return this.maskPng != null
   };
   x.prototype.getMaskMap = function() {
       return document.getElementById(this.maskMapId)
   };
   var Mc = p + "transparent.gif";
   var tb = 0;
   x.prototype.createMask = function() {
       var a = document.createElement("map");
       this.maskMapId = "iwMap" + tb;
       a.setAttribute("id", this.maskMapId);
       a.setAttribute("name", this.maskMapId);
       tb++;
       this.windowDiv.appendChild(a);
       var b = document.createElement("area");
       b.setAttribute("shape", "poly");
       b.setAttribute("coords", "");
       b.setAttribute("href", "javascript:void(0)");
       a.appendChild(b);
       for (var c = 0; c < 10; c++) {
           var b = document.createElement("area");
           b.setAttribute("shape", "poly");
           b.setAttribute("coords", "");
           b.setAttribute("href", "javascript:void(0)");
           a.appendChild(b)
       }
       this.maskPng = o.create(Mc, 0, 0, 0, 0, 0, false);
       this.windowDiv.appendChild(this.maskPng);
       this.maskPng.setAttribute("usemap", "#" + this.maskMapId);
       this.nextMaskArea = 1
   };
   x.prototype.addAreaToMaskMap = function(a, b) {
       if (this.hasMask()) {
           var c = this.getMaskMap();
           if (this.nextMaskArea < c.childNodes.length) {
               var d = c.childNodes[this.nextMaskArea];
               d.setAttribute("coords", a.join(","));
               j.addBuiltInListener(d, "mousedown", b);
               this.nextMaskArea++
           }
       }
   };
   x.prototype.clearMaskMap = function() {
       if (this.hasMask()) {
           var a = this.getMaskMap();
           for (var b = 1; b < a.childNodes.length; b++) {
               var c = a.childNodes[b];
               c.setAttribute("coords", "");
               c.onmousedown = null
           }
           this.nextMaskArea = 1
       }
   };
   x.prototype.getMaskLeft = function() {
       return this.windowDiv.offsetLeft
   };
   x.prototype.getMaskTop = function() {
       return this.windowDiv.offsetTop
   };
   x.prototype.createContentArea = function() {
       var a = window.document.createElement("DIV");
       a.style.position = "absolute";
       a.style.left = l(15);
       a.style.top = l(15);
       a.style.zIndex = 3;
       F(a, "auto");
       j.bindDom(a, "mousedown", this, Ya);
       this.windowDiv.appendChild(a);
       this.contentArea = a;
       a = window.document.createElement("DIV");
       a.style.position = "absolute";
       a.style.left = l(-screen.width);
       a.style.top = l(-screen.height);
       a.style.width = l(screen.width);
       a.style.height = l(screen.height);
       a.style.visibility = "hidden";
       this.offscreenContainer = a;
       window.document.body.appendChild(a);
       a = window.document.createElement("DIV");
       a.style.position = "absolute";
       a.style.left = l(15);
       a.style.top = l(15);
       a.style.zIndex = 3;
       F(a, "auto");
       this.offscreenArea = a;
       j.bindDom(a, "mousedown", this, Ya);
       this.offscreenContainer.appendChild(this.offscreenArea)
   };
   x.prototype.prepareOffscreen = function(a) {
       if (this.windowDiv.style.display == "none") {
           this.windowDiv.style.display = "";
           this.shadowDiv.style.display = "";
           this.windowDiv.style.visibility = "hidden";
           this.shadowDiv.style.visibility = "hidden";
           this.contentArea.style.visibility = "hidden";
           this.offscreenArea.style.visibility = "hidden"
       }
       if (a) {
           this.offscreenContainer.style.width = l(a)
       }
   };
   x.prototype.clearOffscreenArea = function() {
       Yc(this.offscreenArea)
   };
   x.prototype.flipOffscreenAndSize = function() {
       var a = this.offscreenArea;
       var b = Math.max(a.offsetWidth, 183);
       var c = Math.max(a.offsetHeight, 50);
       this.size = {
           "w": b,
           "h": c
       };
       this.flipOffscreenArea(b, c);
       this.setContentSize(b, c)
   };
   x.prototype.sizeToContent = function() {
       var a = this.contentArea.offsetHeight;
       var b = this.contentArea.offsetWidth;
       if (u.type == 2 && (b < 10 && this.size)) {
           b = this.size.w
       }
       this.setContentSize(Math.max(b, 183), a)
   };
   x.prototype.flipOffscreenArea = function(a, b) {
       this.windowDiv.removeChild(this.contentArea);
       this.windowDiv.appendChild(this.offscreenArea);
       this.offscreenContainer.appendChild(this.contentArea);
       var c = this.offscreenArea;
       this.offscreenArea = this.contentArea;
       this.contentArea = c;
       if (u.type == 1 && (a && b)) {
           this.contentArea.style.width = l(a);
           this.contentArea.style.height = l(b)
       }
       this.offscreenArea.style.width = "auto";
       this.offscreenArea.style.height = "auto";
       this.contentArea.style.visibility = "visible";
       this.clearOffscreenArea()
   };
   x.prototype.filterMouse = function(a) {
       if (u.type == 1) {
           A(a)
       } else {
           var b = va(a, this.windowDiv);
           if (b.y <= this.getWindowHeight()) {
               A(a)
           }
       }
   };
   var Wb = p + "close.gif";
   x.prototype.createCloseButton = function() {
       this.closeButton = ja.create(Wb, 14, 13, null, null, 4, null, null);
       this.closeButton.style.position = "absolute";
       F(this.closeButton, "pointer");
       j.bindDom(this.closeButton, "click", this, this.onCloseClick);
       this.windowDiv.appendChild(this.closeButton)
   };
   x.prototype.onCloseClick = function(a) {
       A(a);
       j.trigger(this, "closeclick")
   };
   x.prototype.checkSize = function() {
       if (!this.isVisible()) {
           if (this.lastSize) {
               this.lastSize = false
           }
           return
       }
       var a = this.contentArea.offsetWidth;
       var b = this.contentArea.offsetHeight;
       if (!this.lastSize || (this.lastWidth != a || this.lastHeight != b)) {
           if (this.lastSize) {
               this.sizeToContent();
               this.positionAt(this.position.x, this.position.y, this.positionOffset)
           }
           this.lastWidth = a;
           this.lastHeight = b;
           this.lastSize = true
       }
   };

   function ia(a, b, c) {
       this.maxZoomLevel = a;
       this.bounds = b;
       this.text = c
   }

   function ca(a, b) {
       this.spec = a;
       this.zoomLevels = [];
       for (var c = 0; c < this.spec.numZoomLevels; c++) {
           this.zoomLevels.push([])
       }
       if (b) {
           for (var c = 0; c < b.length; c++) {
               this.zoomLevels[b[c].maxZoomLevel].push(b[c])
           }
           this.sort()
       }
   }
   ca.fromCompact = function(a, b) {
       var c = [];
       for (var d = 0; d < b.length; d++) {
           var e = b[d];
           var f = new z(e[1], e[2], e[3], e[4]);
           c.push(new ia(e[0], f, e[5]))
       }
       return new ca(a, c)
   };
   ca.prototype.addCopyright = function(a) {
       this.zoomLevels[a.maxZoomLevel].push(a);
       this.sort(a.maxZoomLevel)
   };
   ca.prototype.sort = function(a) {
       var b = function(d, e) {
           return d.bounds.minX - e.bounds.minX
       };
       if (a || a == 0) {
           this.zoomLevels[a].sort(b);
           return
       }
       for (var c = 0; c < this.zoomLevels.length; c++) {
           this.zoomLevels[c].sort(b)
       }
   };
   ca.prototype.getCopyrights = function(a, b) {
       var c = {};
       for (var d = b; d < this.zoomLevels.length; d++) {
           var e = this.zoomLevels[d];
           var f = false;
           for (var h = 0; h < e.length; h++) {
               var g = e[h];
               if (g.bounds.minX > a.maxX) {
                   break
               }
               if (g.bounds.intersectsLatLng(a)) {
                   if (g.text) {
                       c[g.text] = 1
                   }
                   if (g.bounds.containsBounds(a)) {
                       f = true
                   }
               }
           }
           if (f) {
               break
           }
       }
       var i = [];
       for (var d in c) {
           i.push(d)
       }
       return i
   };

   var Ca = _mNavteq;
   var pc = _mTeleAtlas;
   var qc = _mZenrin;
   var Sa = [new ia(14, new z(-125.241, 22.031, -62.71, 49.093), Ca), new ia(14, new z(-141.157, 41.468, -50.844, 83.656), Ca), new ia(14, new z(-67.277, 17.88, -65.175, 18.523), Ca), new ia(14, new z(-180, 51.078, -129.756, 71.484), Ca), new ia(14, new z(-10.649, 49.781, 2.593, 59.687), pc), new ia(14, new z(123.748627, 23.8833326, 143.789063, 46.072278), qc)];

   var ya = new q(-98.35, 39.5);
   var Tb = ma;
   var Ub = p + "water.gif";
   var Oa = [131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8];

   function Q(a, b) {
       this.tileSize = 128;
       this.backgroundColor = "#f2efe9";
       this.emptyTileUrl = Tb;
       this.waterTileUrl = Ub;
       this.baseUrl = E.getTileBaseUrl(a, "http://mt.google.com/mt", b);
       this.numZoomLevels = Oa.length;
       this.pixelsPerDegree = [];
       for (var c = 0; c < this.numZoomLevels; c++) {
           var d = Oa[c];
           this.pixelsPerDegree.push(new q(d * 0.77162458338772, d))
       }
       this.mapBounds = [];
       for (var c = 0; c < 9; c++) {
           this.mapBounds.push(new z(-R, -R, R, R))
       }
       for (var c = 9; c < this.pixelsPerDegree.length; c++) {
           var e = this.getTileCoordinate(85, -179.5, c);
           var f = this.getTileCoordinate(12, -50, c);
           this.mapBounds.push(new z(e.x, e.y, f.x, f.y))
       }
       this.ukBounds = [];
       for (var c = 0; c < this.pixelsPerDegree.length; c++) {
           var e = this.getTileCoordinate(61.04, -10.71, c);
           var f = this.getTileCoordinate(49.77, 1.84, c);
           this.ukBounds.push(new z(e.x, e.y, f.x, f.y))
       }
       this.earthBounds = [];
       for (var c = 0; c < this.pixelsPerDegree.length; c++) {
           var e = this.getTileCoordinate(90, -180, c);
           var f = this.getTileCoordinate(-90, 180, c);
           this.earthBounds.push(new z(e.x, e.y, f.x, f.y))
       }
   }
   Q.prototype.adjustBitmapX = function(a, b) {
       var c = Math.floor(360 * this.pixelsPerDegree[b].x);
       var d = -(c >> 1);
       var e = d + c;
       while (a < d) {
           a += c
       }
       while (a >= e) {
           a -= c
       }
       return a
   };
   Q.prototype.getBitmapCoordinate = function(a, b, c, d) {
       if (!d) d = new q(0, 0);
       var e = b - ya.x;
       e -= Math.floor((e + 180) / 360) * 360;
       var f = ya.y - a;
       d.x = Math.floor(e * this.pixelsPerDegree[c].x);
       d.y = Math.floor(f * this.pixelsPerDegree[c].y);
       return d
   };
   Q.prototype.getLatLng = function(a, b, c, d) {
       if (!d) d = new q(0, 0);
       d.x = a / this.pixelsPerDegree[c].x + ya.x;
       d.y = ya.y - b / this.pixelsPerDegree[c].y;
       while (d.x < -180) d.x += 360;
       while (d.x > 180) d.x -= 360;
       return d
   };
   Q.prototype.getTileCoordinate = function(a, b, c) {
       var d = this.getBitmapCoordinate(a, b, c);
       d.x = Math.floor(d.x / this.tileSize);
       d.y = Math.floor(d.y / this.tileSize);
       return d
   };
   Q.prototype.getTileURL = function(a, b, c) {
       var d = this.earthBounds[c];
       if (b <= d.minY || b >= d.maxY) {
           return this.emptyTileUrl
       }
       var e = this.mapBounds[c];
       var f = this.ukBounds[c];
       if ((a < e.minX || (a > e.maxX || (b < e.minY || b > e.maxY))) && (a < f.minX || (a > f.maxX || (b < f.minY || b > f.maxY)))) {
           return this.waterTileUrl
       }
       return this.baseUrl + "x=" + a + "&y=" + b + "&zoom=" + c
   };
   Q.prototype.hasOverlay = function() {
       return false
   };
   Q.prototype.getLowestZoomLevel = function(a, b, c) {
       var d = c.width;
       var e = c.height;
       for (var f = 0; f < this.pixelsPerDegree.length; f++) {
           if (this.pixelsPerDegree[f].x * b.width <= d && this.pixelsPerDegree[f].y * b.height <= e) {
               return f
           }
       }
       return this.pixelsPerDegree.length - 1
   };
   Q.prototype.getPixelsPerDegree = function(a) {
       return this.pixelsPerDegree[a]
   };
   Q.prototype.getLinkText = function() {
       return _mNormalMap
   };
   Q.prototype.getShortLinkText = function() {
       return _mNormalMapShort
   };
   Q.prototype.getURLArg = function() {
       return null
   };
   Q.prototype.getCopyright = function(a) {
       if (!this.copyrights) {
           this.copyrights = new ca(this, Sa)
       }
       if (a.isLoaded()) {
           var b = this.copyrights.getCopyrights(a.getBoundsLatLng(), a.zoomLevel);
           if (b.length == 0) {
               return ""
           } else if (b.length == 1 && b[0] == _mZenrin) {
               return _mZenrinCopy + b[0]
           } else {
               return _mDataCopy + b.join(", ")
           }
       } else {
           return ""
       }
   };
   Q.prototype.zoomBitmapCoord = function(a, b, c) {
       var d = new q();
       var e = Math.pow(2, b - a);
       d.x = Math.round(c.x * e);
       d.y = Math.round(c.y * e);
       return d
   };

   var ib = "http://mt.google.com/mt";
   var vc = ma;
   var wc = p + "water.gif";

   function B(a, b, c) {
       this.tileSize = 256;
       this.backgroundColor = "#e5e3df";
       this.emptyTileUrl = vc;
       this.waterTileUrl = wc;
       this.numZoomLevels = 20;
       this.baseUrl = E.getTileBaseUrl(a, ib, b, c);
       this.initMercator()
   }
   B.prototype.initMercator = function() {
       this.pixelsPerLonDegree = [];
       this.pixelsPerLonRadian = [];
       this.bitmapOrigo = [];
       this.numTiles = [];
       var a = 256;
       for (var b = this.numZoomLevels - 1; b >= 0; --b) {
           this.pixelsPerLonDegree[b] = a / 360;
           this.pixelsPerLonRadian[b] = a / Fc;
           var c = a / 2;
           this.bitmapOrigo[b] = new q(c, c);
           this.numTiles[b] = a / 256;
           a *= 2
       }
   };
   B.prototype.adjustBitmapX = function(a, b) {
       var c = Math.floor(360 * this.pixelsPerLonDegree[b]);
       var d = 0;
       var e = d + c;
       while (a < d) {
           a += c
       }
       while (a >= e) {
           a -= c
       }
       return a
   };
   B.prototype.getBitmapCoordinate = function(a, b, c, d) {
       if (!d) {
           d = new q(0, 0)
       }
       d.x = Math.floor(this.bitmapOrigo[c].x + b * this.pixelsPerLonDegree[c]);
       var e = Math.sin(Na(a));
       if (e > 0.9999) {
           e = 0.9999
       }
       if (e < -0.9999) {
           e = -0.9999
       }
       d.y = Math.floor(this.bitmapOrigo[c].y + 0.5 * Math.log((1 + e) / (1 - e)) * -this.pixelsPerLonRadian[c]);
       return d
   };
   B.prototype.getLatLng = function(a, b, c, d) {
       if (!d) {
           d = new q(0, 0)
       }
       d.x = (a - this.bitmapOrigo[c].x) / this.pixelsPerLonDegree[c];
       var e = (b - this.bitmapOrigo[c].y) / -this.pixelsPerLonRadian[c];
       d.y = (2 * Math.atan(Math.exp(e)) - Math.PI / 2) / mb;
       return d
   };
   B.prototype.getTileCoordinate = function(a, b, c) {
       var d = this.getBitmapCoordinate(a, b, c);
       d.x = Math.floor(d.x / this.tileSize);
       d.y = Math.floor(d.y / this.tileSize);
       return d
   };
   B.prototype.isInTileBoundsY = function(a, b) {
       return 0 <= a && a < this.numTiles[b]
   };
   B.prototype.getTileURL = function(a, b, c) {
       if (!this.isInTileBoundsY(b, c)) {
           return this.emptyTileUrl
       }
       var d = a;
       if (a < 0 || this.numTiles[c] <= a) {
           d = a % this.numTiles[c];
           if (d < 0) {
               d += this.numTiles[c]
           }
       }
       return this.baseUrl + "x=" + d + "&y=" + b + "&zoom=" + (c - 2)
   };
   B.prototype.hasOverlay = function() {
       return false
   };
   B.prototype.getLowestZoomLevel = function(a, b, c) {
       var d = c.width / 2;
       var e = c.height / 2;
       for (var f = 0; f < this.numZoomLevels; f++) {
           var h = this.getBitmapCoordinate(a.y, a.x, f);
           var g = this.getLatLng(h.x - d, h.y - e, f);
           var i = this.getLatLng(h.x + d, h.y + e, f);
           var m = i.x - g.x;
           var n = g.y - i.y;
           if (b.width <= m && b.height <= n) {
               return f
           }
       }
       return this.numZoomLevels - 1
   };
   B.prototype.getPixelsPerDegree = function(a) {
       return new q(this.pixelsPerLonDegree[a], this.pixelsPerLonDegree[a] * 2)
   };
   B.prototype.getLinkText = function() {
       return _mNormalMap
   };
   B.prototype.getShortLinkText = function() {
       return _mNormalMapShort
   };
   B.prototype.getURLArg = function() {
       return null
   };
   B.prototype.getCopyright = function(a) {
       if (!this.copyrights) {
           this.copyrights = new ca(this, Sa)
       }
       if (a.isLoaded()) {
           var b = this.copyrights.getCopyrights(a.getBoundsLatLng(), a.zoomLevel);
           if (b.length == 0) {
               return ""
           } else if (b.length == 1 && b[0] == _mZenrin) {
               return _mZenrinCopy + b[0]
           } else {
               return _mDataCopy + b.join(", ")
           }
       } else {
           return ""
       }
   };
   B.prototype.zoomBitmapCoord = function(a, b, c) {
       var d = new q();
       var e = Math.pow(2, b - a);
       d.x = Math.round(c.x * e);
       d.y = Math.round(c.y * e);
       return d
   };

   var S = "State of New Jersey";
   var Y = "MassGIS, Commonwealth of Massachusetts EOEA";
   var r = "New York GIS";
   var Ra = "The GeoInformation Group";
   var hb = [
       [5, 139.55, 35.53, 139.93, 35.82, Ra],
       [5, 4.87, 52.37, 4.9, 52.39, Ra],
       [5, 28.05, -26.27, 28.07, -26.25, Ra],
       [5, -157.9, 21.25, -157.78, 21.33, "City & County of Honolulu, Hawaii"],
       [5, -79.14, 35.86, -79.06, 35.98, "City Of Carborro"],
       [5, -122.26, 37.33, -122.18, 37.4, "Town of Portola Valley"],
       [5, -75.15, 41, -74.56, 41.37, S],
       [5, -74.58, 41, -73.87, 41.32, S],
       [5, -75.21, 40.71, -73.87, 41.02, S],
       [5, -75.23, 40.53, -74.56, 40.73, S],
       [5, -74.58, 40.53, -74, 40.73, S],
       [5, -75.08, 40.25, -74.56, 40.55, S],
       [5, -74.58, 40.25, -73.97, 40.55, S],
       [5, -75.15, 39.9, -73.99, 40.26, S],
       [5, -75.49, 39.72, -74.63, 39.92, S],
       [5, -74.65, 39.72, -74.06, 39.92, S],
       [5, -75.57, 39.51, -74.79, 39.74, S],
       [5, -74.81, 39.52, -74.12, 39.74, S],
       [5, -75.55, 39.28, -74.79, 39.53, S],
       [5, -74.81, 39.29, -74.24, 39.53, S],
       [5, -75.25, 39.13, -74.54, 39.3, S],
       [5, -74.98, 38.91, -74.7, 39.15, S],
       [5, -74, 42.56, -73.67, 42.83, r],
       [5, -77.97, 42.11, -77.91, 42.14, r],
       [5, -76.12, 42.01, -75.77, 42.22, r],
       [5, -78.78, 42.02, -78.33, 42.2, r],
       [5, -76.98, 42.01, -76.76, 42.21, r],
       [5, -75.56, 42.49, -75.46, 42.59, r],
       [5, -73.59, 44.62, -73.37, 44.75, r],
       [5, -73.81, 42.23, -73.75, 42.29, r],
       [5, -76.24, 42.56, -76.12, 42.66, r],
       [5, -79.12, 42.61, -78.57, 43.09, r],
       [5, -74.13, 44.28, -74.08, 44.35, r],
       [5, -74.42, 42.98, -74.3, 43.08, r],
       [5, -78.22, 42.98, -78.13, 43.03, r],
       [5, -73.81, 42.25, -73.78, 42.29, r],
       [5, -75.23, 42.99, -75.03, 43.13, r],
       [5, -75.04, 42.99, -74.83, 43.07, r],
       [5, -76.06, 43.93, -75.72, 44.1, r],
       [5, -77.83, 42.54, -77.67, 42.82, r],
       [5, -77.98, 43, -77.36, 43.34, r],
       [5, -74.28, 42.79, -74.07, 42.98, r],
       [5, -73.78, 40.57, -73.4, 40.93, r],
       [5, -79.09, 43.01, -78.6, 43.28, r],
       [5, -75.89, 42.86, -75.06, 43.63, r],
       [5, -76.39, 42.96, -75.92, 43.25, r],
       [5, -77.32, 42.83, -76.96, 43.02, r],
       [5, -74.27, 41.41, -74.11, 41.58, r],
       [5, -74.13, 41.4, -73.95, 41.61, r],
       [5, -74.25, 41.29, -74.12, 41.36, r],
       [5, -74.38, 41.23, -74.33, 41.28, r],
       [5, -74.36, 41.38, -74.3, 41.42, r],
       [5, -74.46, 41.4, -74.39, 41.49, r],
       [5, -74.4, 41.42, -74.34, 41.5, r],
       [5, -74.73, 41.35, -74.66, 41.4, r],
       [5, -78.43, 43.2, -78.16, 43.26, r],
       [5, -74.1, 42.77, -73.58, 43.31, r],
       [5, -74.31, 42.71, -73.79, 42.96, r],
       [5, -74.59, 42.62, -74.17, 42.8, r],
       [5, -76.99, 42.84, -76.77, 42.93, r],
       [5, -77.16, 42.1, -77.02, 42.18, r],
       [5, -77.35, 42.32, -77.29, 42.36, r],
       [5, -77.69, 42.31, -77.64, 42.36, r],
       [5, -73.5, 40.6, -73.27, 40.96, r],
       [5, -73.29, 40.62, -73.09, 40.98, r],
       [5, -73.11, 40.65, -72.89, 40.98, r],
       [5, -72.91, 40.71, -72.65, 40.98, r],
       [5, -72.68, 40.79, -72.41, 41.1, r],
       [5, -72.43, 40.85, -72.15, 41.17, r],
       [5, -72.17, 40.94, -71.84, 41.13, r],
       [5, -72.05, 41.25, -71.9, 41.31, r],
       [5, -74.75, 41.6, -74.56, 41.72, r],
       [5, -76.29, 42.02, -76.1, 42.16, r],
       [5, -73.73, 43.39, -73.62, 43.58, r],
       [5, -73.73, 43.26, -73.59, 43.4, r],
       [5, -73.64, 43.25, -73.53, 43.51, r],
       [6, -71.16, 42.35, -71.06, 42.41, Y],
       [6, -70.96, 41.28, -70.43, 41.54, Y],
       [6, -72.07, 42.01, -71.34, 42.73, Y],
       [6, -71.39, 42.37, -70.56, 42.91, Y],
       [6, -71.39, 42.13, -70.66, 42.39, Y],
       [6, -71.39, 41.77, -70.49, 42.15, Y],
       [6, -71.36, 41.46, -70.56, 41.81, Y],
       [6, -70.58, 41.51, -69.89, 41.8, Y],
       [6, -70.27, 41.74, -69.9, 42.11, Y],
       [6, -70.65, 41.53, -70.5, 41.86, Y],
       [6, -73.54, 41.95, -72.02, 42.76, Y],
       [6, -70.34, 41.2, -69.91, 41.43, Y],
       [5, -102.03, 34.99, -101.6, 35.39, null],
       [5, -150.13, 60.98, -149.39, 61.39, null],
       [5, -77.1, 38.81, -76.17, 39.65, null],
       [5, -87.13, 33.24, -86.62, 33.63, null],
       [5, -119.89, 38.99, -119.6, 39.26, null],
       [5, -85.53, 34.85, -85.24, 35.27, null],
       [5, -88.25, 42.22, -88.02, 42.63, null],
       [5, -88.51, 41.84, -88.02, 42.24, null],
       [5, -88.51, 41.63, -88.01, 41.86, null],
       [5, -88.52, 41.24, -88.01, 41.65, null],
       [5, -88.52, 42.22, -88.22, 42.63, null],
       [5, -87.89, 42.62, -87.76, 42.76, null],
       [5, -88.05, 42.23, -87.77, 42.63, null],
       [5, -88.04, 41.85, -87.76, 42.24, null],
       [5, -87.79, 41.85, -87.58, 42.18, null],
       [5, -88.04, 41.63, -87.76, 41.86, null],
       [5, -87.78, 41.63, -87.55, 41.87, null],
       [5, -87.57, 41.64, -87.38, 41.77, null],
       [5, -88.03, 41.43, -87.71, 41.65, null],
       [5, -87.73, 41.43, -87.42, 41.65, null],
       [5, -87.42, 41.43, -87.11, 41.66, null],
       [5, -88.03, 41.24, -87.69, 41.46, null],
       [5, -87.71, 41.24, -87.38, 41.46, null],
       [5, -87.4, 41.24, -87.11, 41.46, null],
       [5, -87.44, 41.43, -87.4, 41.66, null],
       [5, -84.94, 38.84, -84.07, 39.56, null],
       [5, -82.19, 40.85, -80.96, 41.86, null],
       [5, -105.04, 38.68, -104.55, 39.14, null],
       [5, -83.32, 39.67, -82.54, 40.33, null],
       [5, -97.41, 33.06, -96.35, 33.26, null],
       [5, -97.45, 32.94, -96.35, 33.12, null],
       [5, -97.62, 32.41, -97.42, 33, null],
       [5, -97.45, 32.82, -96.36, 33.01, null],
       [5, -97.45, 32.67, -96.36, 32.87, null],
       [5, -97.46, 32.51, -96.37, 32.72, null],
       [5, -97.46, 32.39, -96.37, 32.55, null],
       [5, -106.64, 31.62, -106.24, 32.02, null],
       [5, -120.02, 36.61, -119.61, 37.01, null],
       [5, -95.91, 29.47, -95.62, 30.02, null],
       [5, -95.67, 29.75, -95.27, 30.15, null],
       [5, -95.66, 29.45, -95.26, 29.77, null],
       [5, -95.3, 29.89, -94.98, 30.28, null],
       [5, -95.29, 29.42, -94.86, 29.91, null],
       [5, -81.92, 29.82, -81.32, 30.7, null],
       [5, -96.9, 40.61, -96.47, 41.01, null],
       [5, -118.93, 33.44, -117.46, 34.41, null],
       [5, -102.15, 33.36, -101.73, 33.77, null],
       [5, -80.58, 25.37, -80.02, 27.04, null],
       [5, -93.82, 44.59, -92.81, 45.42, null],
       [5, -121.14, 37.48, -120.74, 37.89, null],
       [5, -75.94, 39.52, -74.54, 40.44, null],
       [5, -71.65, 41.61, -71.22, 42.02, null],
       [5, -79.14, 35.86, -78.74, 36.13, null],
       [5, -79.03, 35.61, -78.75, 35.88, null],
       [5, -78.77, 35.61, -78.48, 36.01, null],
       [5, -120.02, 39.57, -119.64, 39.73, null],
       [5, -120.01, 39.44, -119.66, 39.59, null],
       [5, -119.88, 39.32, -119.67, 39.46, null],
       [5, -119.88, 39.2, -119.73, 39.33, null],
       [5, -121.77, 38.61, -120.98, 39.01, null],
       [5, -121.63, 38.24, -121.11, 38.63, null],
       [5, -117.68, 33.72, -116.84, 34.28, null],
       [5, -117.67, 32.6, -116.79, 33.5, null],
       [5, -122.63, 46.99, -122.35, 47.86, null],
       [5, -122.4, 46.99, -121.99, 47.43, null],
       [5, -122.63, 46.99, -122.35, 47.86, null],
       [5, -122.63, 46.99, -121.98, 48.01, null],
       [5, -122.63, 37.77, -121.61, 38.25, null],
       [5, -122.55, 37.12, -121.61, 37.78, null],
       [5, -93.88, 32.24, -93.48, 32.63, null],
       [5, -121.52, 37.86, -121.11, 38.14, null],
       [5, -72.18, 41.99, -71.56, 42.52, null],
       [5, -122.53, 37.76, -121.86, 37.79, null],
       [5, -105.64, 40, -104.92, 40.27, null],
       [5, -104.95, 39.18, -104.48, 40.08, null],
       [5, -104.5, 39.72, -104.23, 39.83, null],
       [5, -105.52, 39.37, -104.94, 40.02, null],
       [5, -105.44, 39.15, -105.13, 39.38, null],
       [5, -83.65, 42.3, -83.1, 42.77, null],
       [5, -83.65, 42.11, -83.11, 42.33, null],
       [5, -83.19, 42.25, -82.84, 42.76, null],
       [5, -82.89, 42.5, -82.61, 42.76, null],
       [5, -85.39, 40.86, -84.96, 41.26, null],
       [5, -97.77, 35.23, -97.23, 35.76, null],
       [5, -90.77, 38.36, -90.1, 38.9, null],
       [5, -106.89, 34.86, -106.37, 35.26, null],
       [5, -84.77, 33.92, -83.87, 34.15, null],
       [5, -84.77, 33.72, -83.86, 33.98, null],
       [5, -84.76, 33.5, -83.86, 33.78, null],
       [5, -84.76, 33.35, -83.86, 33.56, null],
       [5, -97.88, 30.12, -97.61, 30.5, null],
       [5, -91.26, 30.23, -90.86, 30.77, null],
       [5, -81.07, 34.99, -80.53, 35.51, null],
       [5, -99.21, 32.08, -99.1, 32.17, null],
       [5, -86.76, 34.5, -86.5, 34.63, null],
       [5, -86.87, 34.62, -86.38, 34.88, null],
       [5, -90.4, 32.11, -89.97, 32.51, null],
       [5, -84.27, 35.73, -83.74, 36.14, null],
       [5, -86.01, 37.99, -85.35, 38.51, null],
       [5, -86.5, 32.24, -86.13, 32.51, null],
       [5, -81.64, 28.37, -81.11, 28.88, null],
       [5, -123.13, 45.24, -122.36, 45.76, null],
       [5, -93.88, 32.24, -93.48, 32.63, null],
       [5, -111.13, 32, -110.62, 32.51, null],
       [5, -77.07, 38.62, -76.73, 39.14, null],
       [5, -77.4, 38.61, -77.04, 39.13, null],
       [5, -77.64, 38.74, -77.37, 39.14, null],
       [6, -117.07, 46.99, -116.14, 47.44, null],
       [6, -114.13, 42.52, -112.83, 43.82, null],
       [6, -115.09, 43.05, -113.81, 44.07, null],
       [6, -117.07, 47.79, -115.98, 48.88, null],
       [6, -117.07, 48.37, -115.97, 49.01, null],
       [6, -117.07, 43.22, -116.32, 43.94, null],
       [6, -116.32, 42.82, -115.44, 43.82, null],
       [6, -116.76, 43.66, -116, 44.57, null],
       [6, -115.15, 42.53, -114.51, 43.26, null],
       [6, -114.65, 42.41, -113.77, 42.88, null],
       [6, -117.07, 47.28, -116.26, 48, null],
       [6, -117.07, 46.47, -116.28, 47.19, null],
       [6, -116.76, 45.87, -115.97, 46.5, null],
       [6, -117.07, 45.79, -116.28, 46.69, null],
       [6, -116.58, 41.87, -115.7, 43.32, null],
       [6, -115.9, 41.91, -114.9, 43.01, null],
       [6, -117.07, 41.89, -116.32, 43.69, null],
       [6, -117.07, 43.74, -116.32, 44.19, null],
       [6, -116.03, 46.82, -114.8, 48, null],
       [6, -116.39, 46.87, -115.84, 48.13, null],
       [6, -115.1, 41.84, -113.96, 42.94, null],
       [6, -115.66, 44.08, -114.61, 45.27, null],
       [6, -116.26, 44.08, -115.36, 45.26, null],
       [6, -117.26, 44.06, -116.12, 44.88, null],
       [6, -98.64, 29.59, -96.48, 30.48, null],
       [6, -99.01, 30.33, -96.72, 31.14, null],
       [6, -114.03, 41.11, -111.65, 42.03, null],
       [6, -112.26, 41.25, -111.24, 42.01, null],
       [6, -111.07, 39.37, -109.92, 39.88, null],
       [6, -112.26, 40.69, -111.58, 41.2, null],
       [6, -112.52, 37.43, -111.23, 38.2, null],
       [6, -112.89, 36.93, -111.93, 37.57, null],
       [6, -111.94, 40.62, -111.27, 41.26, null],
       [6, -111.51, 40.99, -110.83, 42, null],
       [6, -112.32, 40.24, -111.48, 41.01, null],
       [6, -111.63, 40.43, -110.96, 41.19, null],
       [6, -112.83, 39.86, -111.99, 40.76, null],
       [6, -112.2, 39.74, -111.2, 40.63, null],
       [6, -111.57, 40.25, -111.24, 40.75, null],
       [6, -112.26, 41, -111.59, 41.51, null],
       [6, -91.04, 47.4, -89.5, 48.26, null],
       [6, -88.15, 37.68, -87.57, 38.95, null],
       [6, -87.67, 38.94, -86.78, 40, null],
       [6, -87.69, 38.06, -86.8, 39.01, null],
       [6, -86.95, 38.81, -86.23, 39.88, null],
       [6, -86.92, 37.75, -86.24, 38.88, null],
       [6, -86.45, 38.87, -85.7, 40.01, null],
       [6, -86.44, 37.87, -85.71, 38.95, null],
       [6, -85.9, 38.93, -85.24, 39.83, null],
       [6, -85.9, 38.06, -85.26, 39.03, null],
       [6, -85.42, 39.24, -84.68, 40.02, null],
       [6, -87.58, 40.73, -86.86, 41.75, null],
       [6, -87.57, 39.5, -86.9, 40.82, null],
       [6, -87.09, 40.43, -86.16, 41.82, null],
       [6, -87.07, 39.43, -86.17, 40.51, null],
       [6, -86.4, 40.42, -85.59, 41.83, null],
       [6, -86.39, 39.25, -85.54, 40.51, null],
       [6, -85.73, 40.67, -85.1, 41.82, null],
       [6, -85.75, 39.32, -85.1, 40.76, null],
       [6, -85.28, 40.67, -84.66, 41.82, null],
       [6, -85.28, 39.48, -84.67, 40.76, null],
       [6, -95.76, 39.75, -94.68, 40.65, null],
       [6, -93.43, 37.91, -91.87, 39.16, null],
       [6, -92.13, 37.85, -90.58, 39.13, null],
       [6, -90.84, 37.79, -89.72, 39.12, null],
       [6, -94.66, 37.16, -93.28, 38.31, null],
       [6, -93.5, 37.07, -91.98, 38.13, null],
       [6, -92.22, 37.08, -90.82, 38.07, null],
       [6, -91.05, 36.97, -89.63, 38.06, null],
       [6, -89.97, 36.85, -88.98, 37.95, null],
       [6, -94.65, 36.35, -93.28, 37.34, null],
       [6, -93.42, 36.33, -91.78, 37.4, null],
       [6, -94.88, 39.69, -93.67, 40.65, null],
       [6, -90.51, 36.27, -89.02, 37.24, null],
       [6, -90.54, 36.27, -89.01, 37.39, null],
       [6, -90.39, 35.81, -89.14, 36.53, null],
       [6, -93.99, 39.64, -92.37, 40.64, null],
       [6, -92.66, 39.53, -91.01, 40.64, null],
       [6, -95.19, 38.93, -93.78, 39.92, null],
       [6, -94.08, 38.88, -92.44, 39.91, null],
       [6, -92.71, 38.88, -91.02, 39.95, null],
       [6, -91.27, 38.84, -90.37, 39.69, null],
       [6, -94.7, 38.01, -93.15, 39.11, null],
       [6, -103.02, 36.34, -101.89, 37.09, null],
       [6, -102.15, 36.33, -99.96, 37.1, null],
       [6, -95.28, 33.51, -94.28, 33.88, null],
       [7, -180, -90, 180, 90, "DigitalGlobe"],
       [12, -180, -90, 180, 90, "EarthSat"]
   ];

   var Aa = new q(-180, 180);
   var Qa = ma;
   var Pa = "http://kh.google.com/kh?";

   function C(a, b, c, d, e, f) {
       this.japanDatumHack = f;
       this.tileSize = 256;
       this.backgroundColor = d ? "#e5e3df" : "#f2efe9";
       this.emptyTileUrl = Qa;
       this.numZoomLevels = d ? 18 : 15;
       this.pixelsPerDegree = [];
       for (var h = 0; h < this.numZoomLevels; h++) {
           var g = Math.pow(2, 26 - h - 1) / 360;
           this.pixelsPerDegree.push(new q(g, g))
       }
       this.earthBounds = [];
       for (var h = 0; h < this.pixelsPerDegree.length; ++h) {
           var i = this.getTileCoordinate(90, -180, h);
           var m = this.getTileCoordinate(-90, 180, h);
           if (h >= 16) {
               m.y += 1
           }
           this.earthBounds.push(new z(i.x, i.y, m.x, m.y))
       }
       var n;
       if (b) {
           n = "http://kh." + b + "/kh"
       } else {
           n = Pa
       }
       this.baseUrl = E.getTileBaseUrl(a, n, c);
       if (e) {
           if (b && this.testCookie(b)) {
               document.cookie = "khcookie=" + e + "; domain=." + b + "; path=/kh;"
           } else {
               this.baseUrl += "cookie=" + e + "&"
           }
       }
       this.isNew = true
   }
   C.prototype.testCookie = function(a) {
       try {
           document.cookie = "testcookie=1; domain=." + a;
           var b = document.cookie.indexOf("testcookie") != -1;
           if (b) {
               document.cookie = "testcookie=; domain=." + a + "; expires=Thu, 01-Jan-70 00:00:01 GMT"
           }
           return b
       } catch (c) {
           y.dump(c)
       }
       return false
   };
   C.prototype.adjustBitmapX = function(a, b) {
       var c = 180 * this.pixelsPerDegree[b].x;
       while (a < -c) {
           a += 2 * c
       }
       while (a >= c) {
           a -= 2 * c
       }
       return a
   };
   C.prototype.getBitmapCoordinate = function(a, b, c, d) {
       if (this.japanDatumHack && (a > 30 && (a < 50 && (b > 115 && b < 152)))) {
           a += 0.003236111111111111;
           b += -0.0032027777777777775
       }
       return this.getBitmapCoordinateWGS84(a, b, c, d)
   };
   C.prototype.getBitmapCoordinateWGS84 = function(a, b, c, d) {
       if (!d) {
           d = new q(0, 0)
       }
       var e = b - Aa.x;
       e -= Math.floor((e + 180) / 360) * 360;
       var f = Aa.y - a;
       d.x = Math.floor(e * this.pixelsPerDegree[c].x);
       d.y = Math.floor(f * this.pixelsPerDegree[c].y);
       return d
   };
   C.prototype.getLatLngWGS84 = function(a, b, c, d) {
       if (!d) {
           d = new q(0, 0)
       }
       d.x = a / this.pixelsPerDegree[c].x + Aa.x;
       d.y = Aa.y - b / this.pixelsPerDegree[c].y;
       while (d.x < -180) d.x += 360;
       while (d.x > 180) d.x -= 360;
       return d
   };
   C.prototype.getLatLng = function(a, b, c, d) {
       if (!d) {
           d = new q(0, 0)
       }
       d = this.getLatLngWGS84(a, b, c, d);
       if (this.japanDatumHack && (d.y > 30 && (d.y < 50 && (d.x > 115 && d.x < 152)))) {
           d.y -= 0.003236111111111111;
           d.x -= -0.0032027777777777775
       }
       return d
   };
   C.prototype.isInTileBoundsY = function(a, b) {
       var c = this.earthBounds[b];
       return a >= c.minY && a < c.maxY
   };
   C.prototype.getTileURL = function(a, b, c) {
       if (!this.isInTileBoundsY(b, c)) {
           return this.emptyTileUrl
       }
       var d = Math.pow(2, this.numZoomLevels - c - 1);
       if (b < 0 || d - 1 < b) {
           return this.emptyTileUrl
       }
       if (a < 0 || d - 1 < a) {
           a = a % d;
           if (a < 0) a += d
       }
       var e = "t";
       for (var f = this.numZoomLevels - 2; f >= c; f--) {
           d = d / 2;
           if (b < d) {
               if (a < d) {
                   e += "q"
               } else {
                   e += "r";
                   a -= d
               }
           } else {
               if (a < d) {
                   e += "t";
                   b -= d
               } else {
                   e += "s";
                   a -= d;
                   b -= d
               }
           }
       }
       return this.baseUrl + "t=" + e
   };
   C.prototype.hasOverlay = function() {
       return false
   };
   C.prototype.getTileCoordinate = function(a, b, c) {
       var d = this.getBitmapCoordinateWGS84(a, b, c);
       d.x = Math.floor(d.x / this.tileSize);
       d.y = Math.floor(d.y / this.tileSize);
       return d
   };
   C.prototype.getLowestZoomLevel = function(a, b, c) {
       var d = c.width;
       var e = c.height;
       for (var f = 0; f < this.numZoomLevels; f++) {
           if (this.pixelsPerDegree[f].x * b.width < d && this.pixelsPerDegree[f].y * b.height < e) {
               return f
           }
       }
       return this.numZoomLevels - 1
   };
   C.prototype.getPixelsPerDegree = function(a) {
       return this.pixelsPerDegree[a]
   };
   C.prototype.getLinkText = function() {
       return _mKeyholeMap
   };
   C.prototype.getShortLinkText = function() {
       return _mKeyholeMapShort
   };
   C.prototype.getURLArg = function() {
       return "k"
   };
   C.prototype.getCopyright = function(a) {
       if (!this.copyrights) {
           this.copyrights = ca.fromCompact(this, hb)
       }
       if (a.isLoaded()) {
           var b = this.copyrights.getCopyrights(a.getBoundsLatLng(), a.zoomLevel);
           if (b.length == 0) {
               return ""
           } else {
               return _mKeyholeCopy + b.join(", ")
           }
       } else {
           return ""
       }
   };
   C.prototype.getTextColor = function() {
       return "white"
   };
   C.prototype.getLinkColor = function() {
       return "white"
   };
   C.prototype.zoomBitmapCoord = function(a, b, c) {
       var d = new q();
       var e = Math.pow(2, b - a);
       d.x = Math.round(c.x * e);
       d.y = Math.round(c.y * e);
       return d
   };

   function G(a, b, c, d, e) {
       this.japanDatumHack = e;
       this.tileSize = 256;
       this.backgroundColor = "#e5e3df";
       this.emptyTileUrl = Qa;
       this.numZoomLevels = 22;
       var f;
       if (b) {
           f = "http://kh." + b + "/kh"
       } else {
           f = Pa
       }
       this.baseUrl = E.getTileBaseUrl(a, f, c);
       if (d) {
           if (b && this.testCookie(b)) {
               document.cookie = "khcookie=" + d + "; domain=." + b + "; path=/kh;"
           } else {
               this.baseUrl += "cookie=" + d + "&"
           }
       }
       this.isNew = true;
       this.initMercator()
   }
   G.prototype.initMercator = B.prototype.initMercator;
   G.prototype.testCookie = C.prototype.testCookie;
   G.prototype.adjustBitmapX = B.prototype.adjustBitmapX;
   G.prototype.getBitmapCoordinate = C.prototype.getBitmapCoordinate;
   G.prototype.getBitmapCoordinateWGS84 = B.prototype.getBitmapCoordinate;
   G.prototype.getLatLngWGS84 = B.prototype.getLatLng;
   G.prototype.getLatLng = C.prototype.getLatLng;
   G.prototype.hasOverlay = B.prototype.hasOverlay;
   G.prototype.isInTileBoundsY = B.prototype.isInTileBoundsY;
   G.prototype.getTileURL = C.prototype.getTileURL;
   G.prototype.getTileCoordinate = C.prototype.getTileCoordinate;
   G.prototype.getLowestZoomLevel = B.prototype.getLowestZoomLevel;
   G.prototype.getPixelsPerDegree = B.prototype.getPixelsPerDegree;
   G.prototype.getLinkText = C.prototype.getLinkText;
   G.prototype.getShortLinkText = C.prototype.getShortLinkText;
   G.prototype.getURLArg = C.prototype.getURLArg;
   G.prototype.getCopyright = C.prototype.getCopyright;
   G.prototype.getTextColor = C.prototype.getTextColor;
   G.prototype.getLinkColor = C.prototype.getLinkColor;
   G.prototype.zoomBitmapCoord = B.prototype.zoomBitmapCoord;

   function K(a, b, c, d, e, f, h, i) {
       this.japanDatumHack = e;
       this.tileSize = 256;
       this.backgroundColor = "#e5e3df";
       this.emptyTileUrl = Qa;
       this.numZoomLevels = 20;
       var g;
       if (b) {
           g = "http://kh." + b + "/kh"
       } else {
           g = Pa
       }
       this.baseUrl = E.getTileBaseUrl(a, g, c);
       this.overlayBaseUrl = E.getTileBaseUrl(f, ib, h, i);
       if (d) {
           if (b && this.testCookie(b)) {
               document.cookie = "khcookie=" + d + "; domain=." + b + "; path=/kh;"
           } else {
               this.baseUrl += "cookie=" + d + "&"
           }
       }
       this.isNew = true;
       this.initMercator()
   }
   K.prototype.initMercator = B.prototype.initMercator;
   K.prototype.testCookie = G.prototype.testCookie;
   K.prototype.adjustBitmapX = B.prototype.adjustBitmapX;
   K.prototype.getBitmapCoordinate = G.prototype.getBitmapCoordinate;
   K.prototype.getBitmapCoordinateWGS84 = B.prototype.getBitmapCoordinate;
   K.prototype.getLatLngWGS84 = B.prototype.getLatLng;
   K.prototype.getLatLng = G.prototype.getLatLng;
   K.prototype.isInTileBoundsY = B.prototype.isInTileBoundsY;
   K.prototype.hasOverlay = function() {
       return true
   };
   K.prototype.getOverlayURL = function(a, b, c) {
       if (!this.isInTileBoundsY(b, c)) {
           return this.emptyTileUrl
       }
       var d = a;
       if (a < 0 || this.numTiles[c] <= a) {
           d = a % this.numTiles[c];
           if (d < 0) {
               d += this.numTiles[c]
           }
       }
       return this.overlayBaseUrl + "x=" + d + "&y=" + b + "&zoom=" + (c - 2)
   };
   K.prototype.getTileURL = G.prototype.getTileURL;
   K.prototype.getTileCoordinate = G.prototype.getTileCoordinate;
   K.prototype.getLowestZoomLevel = B.prototype.getLowestZoomLevel;
   K.prototype.getPixelsPerDegree = B.prototype.getPixelsPerDegree;
   K.prototype.getLinkText = function() {
       return _mHybridMap
   };
   K.prototype.getShortLinkText = function() {
       return _mHybridMapShort
   };
   K.prototype.getURLArg = function() {
       return "h"
   };
   K.prototype.getCopyright = function(a) {
       if (!this.mapCopyrights) {
           this.mapCopyrights = new ca(this, Sa);
           this.satCopyrights = ca.fromCompact(this, hb)
       }
       var b = "";
       if (a.isLoaded()) {
           var c = this.mapCopyrights.getCopyrights(a.getBoundsLatLng(), a.zoomLevel);
           var d = this.satCopyrights.getCopyrights(a.getBoundsLatLng(), a.zoomLevel);
           if (c.length > 0) {
               if (!(c.length == 1 && c[0] == _mZenrin)) {
                   b += _mDataCopy + c.join(", ")
               }
           }
           if (d.length > 0) {
               if (b != "") b += " - ";
               b += _mKeyholeCopy + d.join(", ")
           }
       }
       return b
   };
   K.prototype.getTextColor = C.prototype.getTextColor;
   K.prototype.getLinkColor = C.prototype.getLinkColor;
   K.prototype.zoomBitmapCoord = B.prototype.zoomBitmapCoord;

   function wb(a) {
       if (window.clipboardData) {
           j.addBuiltInListener(a, "paste", Uc);
           j.addBuiltInListener(a, "drop", Tc)
       } else {
           j.addBuiltInListener(a, "focus", Wc);
           j.addBuiltInListener(a, "blur", Vc)
       }
       return true
   }

   function Uc(a) {
       var b = document.selection;
       if (b) {
           var c = b.createRange();
           if (c) {
               var d = window.clipboardData.getData("Text");
               if (d) {
                   c.text = Va(d, null);
                   return false
               }
           }
       }
       return true
   }
   var Ea = null;

   function Tc(a) {
       if (!a) a = window.event;
       if (a.dataTransfer) {
           Ea = Va(a.dataTransfer.getData("Text"), null);
           setTimeout("_finishDrop()", 1)
       }
       return true
   }

   function _finishDrop() {
       if (!Ea) return;
       var a = document.selection;
       if (a) {
           var b = a.createRange();
           if (b) {
               b.text = Ea;
               b.select()
           }
       }
       Ea = null
   }

   function Wc() {
       var a = this;
       var b = function() {
           if (a.value != a.oldvalue) {
               if (Math.abs(a.value.length - a.oldvalue.length) != 1) {
                   a.value = Va(a.value)
               }
               a.oldvalue = a.value
           }
       };
       a.oldvalue = a.value;
       a.interval = setInterval(b, 50)
   }

   function Vc() {
       var a = this;
       if (a.interval) {
           clearInterval(a.interval);
           a.interval = null
       }
   }

   function Va(a, b) {
       var c = b || ", ";
       var d = a.replace(/^[ \r\n\t\v]+/g, "");
       d = d.replace(/[ \r\n\t\v]+$/g, "");
       d = d.replace(/[ \t\v]*\r?\n[\r\n]*[ \t\v]*/g, c);
       return d
   };

   function Zc(a) {
       var b = [1518500249, 1859775393, 2400959708, 3395469782];
       a += String.fromCharCode(128);
       var c = Math.ceil(a.length / 4) + 2;
       var d = Math.ceil(c / 16);
       var e = new Array(d);
       for (var f = 0; f < d; f++) {
           e[f] = new Array(16);
           for (var h = 0; h < 16; h++) {
               e[f][h] = a.charCodeAt(f * 64 + h * 4) << 24 | a.charCodeAt(f * 64 + h * 4 + 1) << 16 | a.charCodeAt(f * 64 + h * 4 + 2) << 8 | a.charCodeAt(f * 64 + h * 4 + 3)
           }
       }
       e[d - 1][14] = (a.length - 1 >>> 30) * 8;
       e[d - 1][15] = (a.length - 1) * 8 & 4294967295;
       var g = 1732584193;
       var i = 4023233417;
       var m = 2562383102;
       var n = 271733878;
       var s = 3285377520;
       var t = new Array(80);
       var v, N, O, Z, da;
       for (var f = 0; f < d; f++) {
           for (var L = 0; L < 16; L++) t[L] = e[f][L];
           for (var L = 16; L < 80; L++) t[L] = Ta(t[L - 3] ^ t[L - 8] ^ t[L - 14] ^ t[L - 16], 1);
           v = g;
           N = i;
           O = m;
           Z = n;
           da = s;
           for (var L = 0; L < 80; L++) {
               var Ba = Math.floor(L / 20);
               var nc = Ta(v, 5) + Nc(Ba, N, O, Z) + da + b[Ba] + t[L] & 4294967295;
               da = Z;
               Z = O;
               O = Ta(N, 30);
               N = v;
               v = nc
           }
           g = g + v & 4294967295;
           i = i + N & 4294967295;
           m = m + O & 4294967295;
           n = n + Z & 4294967295;
           s = s + da & 4294967295
       }
       return g.toHexStr() + i.toHexStr() + m.toHexStr() + n.toHexStr() + s.toHexStr()
   }

   function Nc(a, b, c, d) {
       switch (a) {
           case 0:
               return b & c ^ ~b & d;
           case 1:
               return b ^ c ^ d;
           case 2:
               return b & c ^ b & d ^ c & d;
           case 3:
               return b ^ c ^ d
       }
   }

   function Ta(a, b) {
       return a << b | a >>> 32 - b
   }
   Number.prototype.toHexStr = function() {
       var a = "";
       var b;
       for (var c = 7; c >= 0; c--) {
           b = this >>> c * 4 & 15;
           a += b.toString(16)
       }
       return a
   };

   k.prototype.loadLocal = function(a, b) {
       this.addControl(new ra());
       this.addControl(new fa(b));
       var c = la.fromXml(ua.parse(a));
       var d = b ? c.overlays[0].markers[0].point : c.center;
       var e = this.spec.getLowestZoomLevel(d, c.viewSpan, this.viewSize);
       this.centerAndZoom(d, e);
       var f = c.overlays[0].markers;
       var h = this;
       for (var g = 0; g < f.length; g++) {
           var i = f[g];
           if (!b) {
               j.bind(i, "click", i, function() {
                   h.openMarker = this;
                   h.infoWindowNavigate(null, "")
               })
           }
           this.addOverlay(i)
       }
       j.bind(this, "infowindowopen", this, function() {
           if (this.infoLoadFn) {
               this.infoLoadFn();
               this.infoLoadFn = null
           }
       });
       var m = document.getElementById("largerlink");
       if (m) {
           var n = m.href;
           j.bind(this, "moveend", this, function() {
               var s = this.getCenterLatLng();
               var t = this.getSpanLatLng();
               var v = this.spec.getURLArg();
               m.href = n + "&ll=" + s.y + "," + s.x + "&spn=" + t.height + "," + t.width + (v ? "&t=" + v : "")
           })
       }
   };
   k.prototype.infoWindowNavigate = function(a, b) {
       if (this.openMarker) {
           this.infoLoadFn = a;
           this.openMarker.xml.setAttribute("arg0", b);
           this.openMarker.openInfoWindowXslt(this.openMarker.xml, this.openMarker.infoStyle)
       }
   };

   ;

   function y() {}
   y.write = function(a, b) {};
   y.writeRaw = function(a) {};
   y.writeXML = function(a) {};
   y.writeURL = function(a) {};
   y.dump = function(a) {};
   y.incompatible = function() {};
   y.clear = function() {};

   function P() {}
   P.start = function() {};
   P.end = function() {};
   P.addTime = function(a) {};

   function Fa() {}
   Fa.monitor = function(a, b, c, d) {};
   Fa.dump = function() {};
   Fa.reset = function() {};
   Fa.clear = function() {};
   var Oc = false;

   var ab = "mapselectedlocation";

   function w(a, b, c, d, e, f) {
       this.map = null;
       this.mapContainer = a;
       this.panel = b;
       this.metaPanel = c;
       this.debugPanel = document.createElement("div");
       this.debugPanel.style.display = "none";
       this.debugPanel.style.fontSize = "small";
       document.body.appendChild(this.debugPanel);
       this.suggestionPanel = document.createElement("div");
       this.suggestionPanel.style.display = "none";
       this.metaPanel.appendChild(this.suggestionPanel);
       this.permalink = d;
       this.printHeadArea = e;
       this.printSetup();
       this.mapTypes = f;
       this.mapTypesByArg = {};
       for (var h = 0; h < this.mapTypes.length; ++h) {
           var g = this.mapTypes[h].getURLArg();
           if (g) {
               this.mapTypesByArg[g] = this.mapTypes[h]
           }
       }
       this.inputElements = [];
       j.bindDom(window, "resize", this, this.resizeMapView);
       if (u.type == 4) {
           document.body.style.overflow = "hidden";
           Za(this.panel, "autoscroll")
       }
       this.resizeMapView()
   }
   w.prototype.printSetup = function() {
       if (u.type == 1) {
           j.bindDom(window, "beforeprint", this, this.beforePrint);
           j.bindDom(window, "afterprint", this, this.afterPrint);
           this.printMessage = null;
           this.printImageContainer = null
       } else if (u.type == 4 && u.version == 7) {
           this.printMessage = null;
           this.printImageContainer = null
       } else {
           var a = document.createElement("div");
           a.id = "printmessage";
           a.className = "noscreen";
           a.innerHTML = _mUsePrintLink;
           document.body.appendChild(a);
           this.printMessage = a;
           var b = document.createElement("div");
           b.className = "noscreen";
           this.mapContainer.parentNode.insertBefore(b, this.mapContainer);
           this.printImageContainer = b
       }
   };
   w.prototype.printWaitStart = function() {
       F(window.document.body, "wait")
   };
   w.prototype.printWaitEnd = function() {
       F(window.document.body, "")
   };
   w.prototype.printPrepare = function() {
       this.printMessage.style.visibility = "hidden";
       Za(this.mapContainer, "noprint");
       this.printMessageNeedsReset = true
   };
   w.prototype.printError = function() {
       this.printMessage.style.visibility = "hidden";
       this.printMessageNeedsReset = true
   };
   w.prototype.printReset = function() {
       if (this.printing) {
           return
       }
       if (this.printImage) {
           this.printImage.parentNode.removeChild(this.printImage);
           this.printImage = null
       }
       if (this.printMessage && this.printMessageNeedsReset) {
           this.printMessage.style.visibility = "visible";
           this.printMessage.innerHTML = _mUsePrintLink;
           this.printMessageNeedsReset = false
       }
       if (this.mapContainer.className.indexOf("noprint") != -1) {
           Ab(this.mapContainer, "noprint")
       }
   };
   w.prototype.beforePrint = function() {
       var a = this.mapContainer.offsetWidth / window.screen.logicalXDPI;
       var b = 7;
       var c = this.mapContainer.offsetHeight / window.screen.logicalYDPI;
       var d = 8;
       if (this.vpage) {
           d = 7;
           if (this.vpage.directions) {
               d = 3.5
           } else if (this.vpage.overlays.length > 0 && this.vpage.overlays[0].markers.length > 1) {
               d = 4.5
           }
       }
       var e = b / a;
       if (c * e > d) {
           e = d / c
       }
       var f = a * e;
       if (f < b) {
           var h = Math.floor(f / b * 100);
           this.mapContainer.style.width = h + "%"
       } else {
           this.mapContainer.style.width = "100%"
       }
       this.mapContainer.style.zoom = e;
       this.panel.style.zoom = 0.8
   };
   w.prototype.afterPrint = function() {
       this.mapContainer.style.zoom = 1;
       this.mapContainer.style.width = "auto";
       this.panel.style.zoom = 1;
       this.resizeMapView()
   };
   w.prototype.loadMap = function() {
       this.map = new k(this.mapContainer, this.mapTypes, null, null, true);
       this.map.registerKeyHandlers(window.document);
       this.map.addControl(new U());
       this.map.addControl(new ka(true, true));
       this.map.addControl(new fa());
       this.map.addControl(new ga(), new X(2, 4, 4));
       this.map.mapBlowupZoomLevel = 1;
       j.bind(this.map, "moveend", this, this.updateSoftState);
       j.bind(this.map, "click", this, this.onMapClick);
       j.bind(this.map, "mousedown", this, this.onMapMouseDown)
   };
   w.prototype.manageFocus = function(a) {
       this.inputElements.push(a)
   };
   w.prototype.onMapMouseDown = function() {
       for (var a = 0; a < this.inputElements.length; ++a) {
           this.inputElements[a].blur()
       }
   };
   w.prototype.updateSoftState = function() {
       if (this.vpageDoc) {
           this.vpageDoc.getElementById("state").value = this.getStateText()
       }
       this.permalink.href = this.getPageURL();
       this.printReset()
   };
   w.prototype.resizeMapView = function() {
       var a = this.getWindowSize();
       var b = La(this.mapContainer);
       var c = a.height - b.y - 10;
       var d = La(this.panel);
       var e = c - (d.y - b.y);
       this.mapContainer.style.height = l(c);
       if (document.body.style.overflow == "hidden") {
           this.panel.style.height = l(e);
           this.panel.scrollTop = 0
       }
       if (this.map) {
           this.map.onResize()
       }
   };
   w.prototype.getWindowSize = function(a) {
       if (!a) a = new H(0, 0);
       if (window.self && self.innerWidth) {
           a.width = self.innerWidth;
           a.height = self.innerHeight;
           return a
       }
       if (document.documentElement && document.documentElement.clientHeight) {
           a.width = document.documentElement.clientWidth;
           a.height = document.documentElement.clientHeight;
           return a
       }
       a.width = document.body.clientWidth;
       a.height = document.body.clientHeight;
       return a
   };
   w.prototype.getStateFromUrl = function(a) {
       return a.replace(/^.*\?/, "")
   };
   w.prototype.parseState = function(a, b) {
       if (typeof b == "undefined" || b == null) {
           var c = {}
       } else {
           var c = b
       }
       try {
           var d = new Array();
           d = a.split("&");
           var e = {};
           for (var f = 0; f < d.length; ++f) {
               var h = d[f].split("=");
               if (h.length == 2) {
                   e[decodeURIComponent(h[0])] = decodeURIComponent(h[1])
               }
           }
           if (e["ll"]) {
               var g = e["ll"].split(",");
               if (g.length == 2) {
                   var i = parseFloat(g[0]);
                   var m = parseFloat(g[1]);
                   if (!isNaN(i) && !isNaN(m)) {
                       c.center = new q(m, i)
                   }
               }
           }
           if (e["spn"]) {
               var n = e["spn"].split(",");
               if (n.length == 2) {
                   var s = parseFloat(n[0]);
                   var t = parseFloat(n[1]);
                   if (!isNaN(s) && !isNaN(t)) {
                       c.span = new H(t, s)
                   }
               }
           }
           if (e["z"]) {
               c.zoom = parseInt(e["z"])
           }
           if (e["t"]) {
               c.spec = this.mapTypesByArg[e["t"]]
           }
           return c
       } catch (v) {
           y.dump(v);
           return c
       }
   };
   w.prototype.getStateText = function() {
       var a = [];
       var b = new E();
       a.push("ll=" + b.getLatLngArg(this.map.getCenterLatLng()));
       a.push("z=" + this.map.zoomLevel);
       a.push("t=" + (this.map.spec.getURLArg() || "0"));
       return a.join("&")
   };
   w.prototype.loadXML = function(a, b, c) {
       ea.invalidateAll();
       this.clearSearchState();
       try {
           this.vpageDoc = b;
           var d = Wa(a);
           var e = c ? this.parseState(this.getStateFromUrl(c.href)) : {};
           this.loadVPage(d, e)
       } catch (f) {
           y.dump(f)
       }
       if (u.type == 1) {
           window.document.currentvpage = a
       }
   };
   w.prototype.loadVPage = function(a, b) {
       var c = la.fromXml(a, null, null);
       this.vpage = c;
       this.vpagedom = $a(I(a, "page"));
       if (c.title) {
           window.document.title = _mSiteName + " - " + c.title
       } else {
           window.document.title = _mSiteName
       }
       if (c.error || (c.spelling || c.refinements)) {
           var d = E.getFileURL("mp");
           this.suggestionPanel.style.display = "";
           M.asynchronousTransform(c.xml, this.suggestionPanel, d, null, "suggestionPanel")
       }
       if (c.overlays && c.overlays.length > 0) {
           var e = c.overlays[0];
           if (e.panelStyle && e.markers) {
               this.showOverlayPanel(e)
           }
       } else if (c.directions) {
           this.showDirectionsPanel(c.directions)
       }
       if (c.debug) {
           y.writeRaw(c.debug);
           this.debugPanel.style.display = "";
           this.debugPanel.innerHTML = c.debug
       } else {
           this.debugPanel.style.display = "none";
           this.debugPanel.innerHTML = ""
       }
       if (b == null) {
           b = {}
       }
       if (this.vpageDoc) {
           this.parseState(this.vpageDoc.getElementById("state").value, b)
       }
       this.vpageSpan = typeof b.zoom != "undefined" || b.span ? null : c.viewSpan;
       this.lastSearchSpan = null;
       this.updateSoftState();
       this.setPrintHeader();
       this.loadMapWithState(c, b);
       this.map.saveMapState()
   };
   w.prototype.loadMapWithState = function(a, b) {
       this.map.clearOverlays();
       var c = b.center || (a.center || this.map.getCenterLatLng());
       var d = b.zoom;
       if (d == null) {
           var e = b.span || a.viewSpan;
           if (e) {
               var f = b.spec || this.map.spec;
               d = f.getLowestZoomLevel(c, e, this.map.viewSize)
           } else if (typeof this.map.zoomLevel != "undefined") {
               d = this.map.zoomLevel
           } else {
               d = 4
           }
       }
       if (b.spec) {
           this.map.switchSpecification(b.spec, c, d)
       }
       if (c) {
           if (!this.map.isLoaded() || d != this.map.zoomLevel) {
               this.map.centerAndZoom(c, d)
           } else {
               this.map.recenterOrPanToLatLng(c)
           }
       }
       var h = 0;
       for (var g = 0; g < a.overlays.length; g++) {
           for (var i = 0; i < a.overlays[g].markers.length; i++) {
               var m = a.overlays[g].markers[i];
               if (m.icon) {
                   j.bind(m, "infowindowopen", this, this.onInfoWindowOpen);
                   j.bind(m, "infowindowclose", this, this.onInfoWindowClose);
                   this.map.addOverlay(m);
                   h++
               }
           }
       }
       if (a.directions) {
           this.map.addOverlay(a.directions.polyline);
           this.createDirectionsMarkers(a.directions.polyline)
       }
       if (h == 1) {
           this.openMarkerInfoWindow(a.overlays[0].markers[0])
       }
   };
   w.prototype.showOverlayPanel = function(a) {
       var b = this;
       window.showLocationInfo = function(c) {
           var d = a.getMarkerById(c);
           if (d) {
               b.openMarkerInfoWindow(d)
           }
       };
       M.asynchronousTransform(a.xml, this.panel, a.panelStyle, null, "panel")
   };
   w.prototype.clearInfoWindowArgs = function(a) {
       a.xml.setAttribute("arg0", "");
       a.xml.setAttribute("arg1", "");
       a.xml.setAttribute("arg2", "")
   };
   w.prototype.infoWindowNavigate = function(a, b, c, d) {
       if (!this.openMarker) {
           return
       }
       if (b) this.openMarker.xml.setAttribute("arg0", b);
       if (c) this.openMarker.xml.setAttribute("arg1", c);
       if (d) this.openMarker.xml.setAttribute("arg2", d);
       this.infoWindowOpenHandler = a;
       this.openMarker.openInfoWindowXslt(this.openMarker.xml, this.openMarker.infoStyle)
   };
   w.prototype.showDirectionsPanel = function(a) {
       var b = this;
       window.showDirectionsSegment = function(d) {
           var e = a.getSegmentById(d);
           if (e) {
               var f = a.polyline.getPoint(e.pointIndex);

               function h() {
                   b.highlight(d)
               };

               function g() {
                   b.unhighlight(d)
               };
               var i = b.map.showMapBlowup(f, null, null, null, h, g);
               if (e.pointIndex >= 2) {
                   i.addOverlay(W.fromPolylinePoint(a.polyline, e.pointIndex))
               }
           }
       };
       window.showDirectionsStart = function() {
           b.directionsStart.showMapBlowup()
       };
       window.showDirectionsEnd = function() {
           b.directionsEnd.showMapBlowup()
       };
       var c = E.getFileURL("dp");
       M.asynchronousTransform(a.xml, this.panel, c, null, "panel")
   };
   var sc = p + "dd-start.png";
   var rc = p + "dd-end.png";
   w.prototype.createDirectionsMarkers = function(a) {
       var b = a.getPoint(0);
       var c = (a.points.length >> 1) - 1;
       var d = a.getPoint(c);
       var e = new aa(T);
       e.setImage(sc);
       var f = new aa(T);
       f.setImage(rc);
       var h = new J(b, e);
       var g = new J(d, f);
       j.addListener(h, "click", function() {
           h.showMapBlowup()
       });
       j.addListener(g, "click", function() {
           g.showMapBlowup()
       });
       this.map.addOverlay(h);
       this.map.addOverlay(g);
       this.directionsStart = h;
       this.directionsEnd = g
   };
   w.prototype.highlight = function(a) {
       if (a) {
           var b = qb("panel_" + a);
           if (b) {
               Za(b, ab)
           }
       }
   };
   w.prototype.unhighlight = function(a) {
       if (a) {
           var b = qb("panel_" + a);
           if (b) {
               Ab(b, ab)
           }
       }
   };
   w.prototype.onInfoWindowOpen = function(a) {
       this.openMarker = a;
       this.highlight(a.id);
       if (this.infoWindowOpenHandler) {
           this.infoWindowOpenHandler();
           this.infoWindowOpenHandler = null
       }
   };
   w.prototype.onInfoWindowClose = function(a) {
       this.openMarker = null;
       this.unhighlight(a.id)
   };
   w.prototype.onMapClick = function(a) {
       if (a) {
           this.openMarkerInfoWindow(a)
       }
   };
   w.prototype.openMarkerInfoWindow = function(a) {
       if (a.xml && a.infoStyle) {
           this.clearInfoWindowArgs(a);
           a.openInfoWindowXslt(a.xml, a.infoStyle)
       }
   };
   w.prototype.prepareSearchForm = function(a, b) {
       ea.invalidateAll();
       this.panel.innerHTML = _mSearching;
       var c = new E();
       this.setFormField(a, "sll", c.getLatLngArg(this.map.getCenterLatLng()));
       this.setFormField(a, "sspn", c.getSpanArg(this.map.getSpanLatLng()));
       this.setFormField(a, "z", this.map.zoomLevel);
       this.setFormField(a, "t", this.map.spec.getURLArg());
       this.setFormField(a, "f", b);
       this.setFormField(a, "output", "js");
       if (window._sf) {
           var d = window._sf.split(/&/);
           for (var e = 0; e < d.length; ++e) {
               var f = d[e].split(/=/);
               this.setFormField(a, f[0], decodeURIComponent(f[1]))
           }
       }
       this.clearSearchState()
   };
   w.prototype.setFormField = function(a, b, c) {
       for (var d = 0; d < a.elements.length; ++d) {
           if (a.elements[d].name == b) {
               a.elements[d].value = c;
               return
           }
       }
       var e = document.createElement("input");
       e.type = "hidden";
       e.name = b;
       e.value = c;
       a.appendChild(e)
   };
   w.prototype.clearSearchState = function() {
       this.map.clearOverlays();
       this.suggestionPanel.style.display = "none";
       this.suggestionPanel.innerHTML = "";
       this.debugPanel.style.display = "none";
       this.debugPanel.innerHTML = "";
       this.panel.innerHTML = "";
       this.vpage = null;
       this.vpageDoc = null;
       this.updateSoftState()
   };
   w.prototype.getPageURL = function(a, b) {
       if (this.vpageSpan && !this.lastSearchSpan) {
           this.vpageSpan = null;
           this.lastSearchSpan = this.map.getSpanLatLng()
       }
       var c = new E();
       if (this.vpage && this.vpageDoc) {
           var d = this.vpage.query;
           var e = I(this.vpage.xml, "request");
           var f = I(e, "query");
           var h = I(e, "near");
           var g = I(e, "sourceAddress");
           var i = I(e, "destinationAddress");
           var m = I(e, "num");
           var n = I(e, "start");
           var s = I(e, "cid");
           if (g && i) {
               c.setQueryValue("saddr", V(g));
               c.setQueryValue("daddr", V(i))
           } else if (f && h) {
               c.setQueryValue("q", V(f));
               c.setQueryValue("near", V(h))
           } else {
               c.setQueryValue("q", d)
           }
           if (m) {
               c.setQueryValue("num", V(m))
           }
           if (n) {
               c.setQueryValue("start", V(n))
           }
           if (s) {
               c.setQueryValue("cid", V(s))
           }
           var t = this.map.getCenterLatLng();
           var v = this.vpage.center;
           if (this.vpage.searchCenter) {
               c.setValue("sll", c.getLatLngArg(this.vpage.searchCenter))
           }
           var N = false;
           if (!t.approxEquals(v)) {
               N = true;
               c.setValue("ll", c.getLatLngArg(t))
           }
           var O = this.map.getSpanLatLng();
           var Z = this.lastSearchSpan;
           if (this.vpage.searchSpan) {
               c.setValue("sspn", c.getSpanArg(this.vpage.searchSpan))
           }
           if (N || (!Z || !O.approxEquals(Z))) {
               var da = new H(O.width * 0.95, O.height * 0.95);
               c.setValue("spn", c.getSpanArg(da))
           }
       } else {
           c.setAllMapValues(this.map)
       }
       c.setValue("t", this.map.spec.getURLArg());
       return c.getURL(a, b)
   };
   w.prototype.email = function() {
       var a = "mailto:?subject=" + encodeURIComponent(_mEmailSubject) + "&body=" + encodeURIComponent(this.getPageURL(true, true));
       window.location.href = a
   };
   w.prototype.print = function() {
       if (!this.printMessage || this.printImage) {
           window.print()
       } else if (!this.printing) {
           this.printing = true;
           var a = E.getPrintImageUrl(this);
           var b = document.createElement("img");
           b.className = "noscreen printimage";
           var c = this;
           b.onload = function() {
               c.printWaitEnd();
               c.printPrepare();
               window.print();
               c.printing = false
           };
           b.onerror = function() {
               y.write("PRINT error");
               c.printWaitEnd();
               c.printError();
               window.print();
               c.printing = false
           };
           b.src = a;
           this.printWaitStart();
           this.printImageContainer.appendChild(b);
           this.printImage = b
       }
   };
   w.prototype.setPrintHeader = function() {
       var a = "";
       var b = this.vpagedom;
       if (b && b.request.sourceAddress) {
           a += this.printTitle(_mDirections);
           a += this.printSubTitle(_mStartAddress, b.request.sourceAddress);
           a += this.printSubTitle(_mEndAddress, b.request.destinationAddress)
       } else if (b && b.request.near) {
           a += this.printTitle(_mLocalSearch);
           a += this.printSubTitle(_mWhat, b.request.query);
           a += this.printSubTitle(_mWhere, b.request.near)
       } else if (b && b.request.query) {
           a += this.printTitle(_mSiteName);
           a += this.printSubTitle(null, b.request.query)
       }
       this.printHeadArea.innerHTML = a
   };
   w.prototype.printTitle = function(a) {
       return '<div class="title">' + oa(a) + "</div>"
   };
   w.prototype.printSubTitle = function(a, b) {
       var c = '<div class="subtitle">';
       if (a) {
           c += '<span class="label">' + oa(a) + "</span>&nbsp;&nbsp;"
       }
       if (b) {
           c += '<span class="value">' + oa(b) + "</span>"
       }
       c += "</div>";
       return c
   };
   w.prototype.reportStats = function(a) {
       var b = [];
       for (var c in a) {
           b.push(c + ":" + a[c])
       }
       var d = this.getPageURL();
       d += "&stat_m=" + b.join(",");
       y.writeURL(d);
       if (!this.statsSender) {
           this.statsSender = document.createElement("img");
           this.statsSender.style.position = "absolute";
           this.statsSender.style.visibility = "hidden";
           this.statsSender.style.top = l(-10);
           this.statsSender.style.left = l(-10);
           this.statsSender.style.width = l(1);
           this.statsSender.style.height = l(1);
           document.body.appendChild(this.statsSender)
       }
       this.statsSender.src = d
   };

   function zb(a) {
       return null
   };

   ;

   function vb(a) {
       var b = a || window;
       b._MapsApplication = w;
       b._VPage = la;
       b._Point = q;
       b._Size = H;
       b._Bounds = z;
       b._Map = k;
       b._Icon = aa;
       b._Marker = J;
       b._Polyline = D;
       b._LargeMapControl = U;
       b._SmallMapControl = ra;
       b._SmallZoomControl = sa;
       b._MapTypeControl = fa;
       b._GoogleMapSpec = Q;
       b._GoogleMapMercSpec = B;
       b._KeyholeMapSpec = C;
       b._KeyholeMapMercSpec = G;
       b._HybridMapSpec = K;
       b._GOOGLE_MAP_TYPE = null;
       b._SATELLITE_TYPE = null;
       b._HYBRID_TYPE = null;
       b._DocumentTransport = xa;
       b._XmlHttp = Ha;
       b._Xml = ua;
       b._Xslt = M;
       b._Event = j;
       b._Timer = P;
       b._Log = y;
       b._makePasteBox = wb;
       b.GMapsApplication = w;
       b.GVPage = la;
       b.GPoint = q;
       b.GSize = H;
       b.GBounds = z;
       b.GMap = k;
       b.GIcon = aa;
       b.GMarker = J;
       b.GPolyline = D;
       b.GControlPosition = X;
       b.G_ANCHOR_TOP_LEFT = 0;
       b.G_ANCHOR_TOP_RIGHT = 1;
       b.G_ANCHOR_BOTTOM_LEFT = 2;
       b.G_ANCHOR_BOTTOM_RIGHT = 3;
       b.GLargeMapControl = U;
       b.GSmallMapControl = ra;
       b.GSmallZoomControl = sa;
       b.GMapTypeControl = fa;
       b.GScaleControl = ga;
       b.GGoogleMapSpec = Q;
       b.GGoogleMapMercSpec = B;
       b.GKeyholeMapSpec = C;
       b.GKeyholeMapMercSpec = G;
       b.GHybridMapSpec = K;
       if (window.createMapSpecs) {
           var c = window.createMapSpecs();
           b.G_MAP_TYPE = c[0];
           b.G_SATELLITE_TYPE = c[2];
           b.G_HYBRID_TYPE = c[1]
       } else {
           b.G_MAP_TYPE = null;
           b.G_SATELLITE_TYPE = null;
           b.G_HYBRID_TYPE = null
       }
       b.GDocumentTransport = xa;
       b.GXmlHttp = Ha;
       b.GXml = ua;
       b.GXslt = M;
       b.GEvent = j;
       b.GTimer = P;
       b.GLog = y;
       b.GMakePasteBox = wb
   }
   if (typeof _apiHash != "undefined") {
       var Sc = _apiHash;
       var Ma = window.location.protocol + "//" + window.location.host + window.location.pathname;
       var yb = Ma.lastIndexOf("/");
       if (yb >= 0) {
           Ma = Ma.substring(0, yb + 1)
       }
       var $c = Zc(Ma);
       if (Sc == $c) {
           vb()
       } else {
           _c = false;
           alert(_mApiBadKey)
       }
   } else {
       vb()
   };



   GMap.prototype.publicized = new Object();

   GMap.prototype.publicize = function(v) {
       this.publicized[v] = eval(v);
   }

}
MITMapsNamespace();
