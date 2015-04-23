
////////////////////////////////
//// GOOGLE MAPS API EXPORT ////
////////////////////////////////

tCode = "\n\n" +
        "     GMap.prototype.publicized = new Object();" +
        "\n\n" + 
        "     GMap.prototype.publicize = function(v) {" +
        "           this.publicized[v] = eval(v);" +
        "     }" +
        "\n\n" +
        "} MITMapsNamespace();";

tString = GMapsNamespace.toString();
tString = tString.replace("GMapsNamespace","MITMapsNamespace");
tString = tString.substring(0,tString.lastIndexOf("}")) + tCode;

document.write("<script>"+tString+"</script>");                           // could also use eval() ?


////////////////////////////////
////////////////////////////////
////////////////////////////////


function MITMap(element) {

var mapSpecs = [];

_MIT_MAP_TYPE = new IMSMapSpec("MIT_SVG","MIT Map","Map");
mapSpecs.push(_MIT_MAP_TYPE);

_MIT_AERIAL_TYPE = new IMSMapSpec("MIT_Aerial","MIT Aerial","Sat");
mapSpecs.push(_MIT_AERIAL_TYPE);

_MIT_HYBRID_TYPE = new IMSMapSpec("MIT_Hybrid","Hybrid","Hyb");
mapSpecs.push(_MIT_HYBRID_TYPE);

var map = new GMap(element, mapSpecs);

modifyAPI(map);                                                         // Must modify any GMap methods here because we already created the map object.
                                                                        // Also, we can't access hidden elements until we have a map object to expose them.
return map;

}