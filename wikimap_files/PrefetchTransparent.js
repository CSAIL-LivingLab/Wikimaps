prefetch = document.createElement("img");
prefetch.src = "mapfiles/transparent.gif";

map.publicize('ja');
map.publicize('u');
map.publicize('Ia');
map.publicize('Xa');

map.publicized.ja.create = function (a,b,c,d,e,f,h,g,i,m) {

     var n;

     i = i || document;

     if(!m) {

          n = i.createElement("img");
          if (a) { n.src = a; }

     } else { n = m(a,h,i); }

     n.src = "mapfiles/transparent.gif";
     n.src = a;

     if(b && c) {
          n.style.width = map.publicized.l(b);
          n.style.height = map.publicized.l(c);
          n.width = b;
          n.height = c;
     }

     if(e || (d || (e==0 || d==0))) {
          n.style.position = "absolute";
          n.style.left = map.publicized.l(d);
          n.style.top = map.publicized.l(e);
     }

     if(f || f == 0) { n.style.zIndex = f; }

     if(map.publicized.u.type == 1) {

          n.unselectable = "on";
          n.onselectstart = map.publicized.Xa;

     } else { n.style.MozUserSelect="none"; }

     if(map.publicized.u.type == 1) { n.galleryImg = "no"; }

     n.style.border = "0";
     n.style.padding = "0";
     n.style.margin = "0";
     n.oncontextmenu = map.publicized.Xa;

     if (g) { map.publicized.Ia(n,g); }

     return n;
}