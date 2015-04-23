function Agent(url, callback, args) {

    var request = null;

    // callback for XMLHttpRequests. Parses the XML data.
    var _agentCallback = function() {
        if (request.readyState == 4) {
            //alert(request.status);
            if (request.status == 200) {
                args.unshift(request);
                console.log(args)
                callback.apply(this, args);
            } else alert("There was a problem retrieving the XML data:\n\n" + request.statusText);
        }
    }

    // create a request for the xml data
    request = new XMLHttpRequest();
    try {
        request.onreadystatechange = _agentCallback;
        request.open('GET', url, true);
        request.send(null);
    } catch (e) {
        alert("Unable to send request for data:\n\n" + e.toString());
        request = null;
    }

}
