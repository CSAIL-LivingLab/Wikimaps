//
//
// GoogleMaps Hash Class
//
// SYNOPSIS
//   This code generates a GoogleMaps hash-code based on the
//   location URL of the browser window and returns it to the
//   calling function.
//
//   This library has no dependencies.
//
//   Original algorithm written by: Google Inc., 2005
//
//   Adapted for MITMaps by: Yoni Battat <yonib@mit.edu>
//   Integration Date: August 12, 2005
//
//   Last Modified by: Yoni Battat <yonib@mit.edu>
//   Last Modified: February 14, 2006
//
//

function GoogleHash() {

    function Zc(a) {
        var b=[1518500249,1859775393,2400959708,3395469782];
        a+=String.fromCharCode(128);
        var c=Math.ceil(a.length/4)+2;
        var d=Math.ceil(c/16);
        var e=new Array(d);
        for(var f=0;f<d;f++) {
            e[f]=new Array(16);
            for(var h=0;h<16;h++) {
                e[f][h]=a.charCodeAt(f*64+h*4)<<24|a.charCodeAt(f*64+h*4+1)<<16|a.charCodeAt(f*64+h*4+2)<<8|a.charCodeAt(f*64+h*4+3)
            }
        }
        e[d-1][14]=(a.length-1>>>30)*8;
        e[d-1][15]=(a.length-1)*8&4294967295;
        var g=1732584193;
        var i=4023233417;
        var m=2562383102;
        var n=271733878;
        var s=3285377520;
        var t=new Array(80);
        var v,N,O,Z,da;
        for(var f=0;f<d;f++) {
            for(var L=0;L<16;L++)t[L]=e[f][L];
            for(var L=16;L<80;L++)t[L]=Ta(t[L-3]^t[L-8]^t[L-14]^t[L-16],1);
            v=g;
            N=i;
            O=m;
            Z=n;
            da=s;
            for(var L=0;L<80;L++) {
                var Ba=Math.floor(L/20);
                var nc=Ta(v,5)+Nc(Ba,N,O,Z)+da+b[Ba]+t[L]&4294967295;
                da=Z;
                Z=O;
                O=Ta(N,30);
                N=v;
                v=nc
            }
            g=g+v&4294967295;
            i=i+N&4294967295;
            m=m+O&4294967295;
            n=n+Z&4294967295;
            s=s+da&4294967295
        }
        return g.toHexStr()+i.toHexStr()+m.toHexStr()+n.toHexStr()+s.toHexStr()
    }

    function Nc(a,b,c,d) {
        switch(a){
            case 0:return b&c^~b&d;
            case 1:return b^c^d;
            case 2:return b&c^b&d^c&d;
            case 3:return b^c^d
        }
    }

    function Ta(a,b) {
        return a<<b|a>>>32-b
    }

    Number.prototype.toHexStr=function() {
        var a="";
        var b;
        for(var c=7;c>=0;c--) {
            b=this>>>c*4&15;
            a+=b.toString(16)
        }
        return a
    }

    this.generate = function() {
        var Ma = window.location.href;
        var yb=Ma.lastIndexOf("/");
        if(yb>=0) {
            Ma=Ma.substring(0,yb+1)
        }
        var $c=Zc(Ma);
        return $c
    }

} window.GoogleHash = new GoogleHash();