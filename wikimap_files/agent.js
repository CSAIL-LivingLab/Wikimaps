
function Agent(url, callback, args) {

    var request = null;
    var _agentCallback = function () {
        
        if (request.readyState == 4) {
			//alert(request.status);
            if (request.status == 200) {
                args.unshift(request);
                callback.apply(this,args);
            } else alert("There was a problem retrieving the XML data:\n\n" + request.statusText);
        }
    }
    
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        if (request) {
            try {
            	request.onreadystatechange = _agentCallback;
                request.open('GET', url, true);
                request.send(null);
            } catch(e) {
                alert("Unable to send request for data:\n\n" + e.toString());
                request = null;
            }
        } else alert("Unable to create new XMLHTTPRequest object.");
    } else alert("Unable to send request for data. Your browser is not supported.");
    
}
