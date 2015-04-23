function checkUndisplayed() {
	var gpointArray = String(map.getSpanLatLng()).split(",");
	var itemXSpan = Number(gpointArray[0].substr(1)) / 70;
	var itemYSpan = Number(gpointArray[1].substr(0,gpointArray[1].length-1)) / 50;
	var i;
	var j;

	for (i=0;i<nonceArray.length;i++) {
		nonceInfoArray[nonceArray[i]]['parentIcon'] = '';
	}
	
	for (i=0;i<nonceArray.length;i++) {
		for (j=i+1;j<nonceArray.length;j++) {
			if (nonceInfoArray[nonceArray[j]]['category'] == nonceInfoArray[nonceArray[i]]['category']) {
				if ((Math.abs(nonceInfoArray[nonceArray[j]]['gpointx'] - nonceInfoArray[nonceArray[i]]['gpointx']) <= itemXSpan) && (Math.abs(nonceInfoArray[nonceArray[j]]['gpointy'] - nonceInfoArray[nonceArray[i]]['gpointy']) <= itemYSpan)) {
					if (nonceInfoArray[nonceArray[i]]['parentIcon'] != 'no') {
						nonceInfoArray[nonceArray[i]]['parentIcon'] = 'yes';
						nonceInfoArray[nonceArray[j]]['parentIcon'] = 'no';
						if (!nonceInfoArray[nonceArray[i]]['displayIcon']) {
							nonceInfoArray[nonceArray[i]]['displayIcon'] = true;
							map.addOverlay(nonceInfoArray[nonceArray[i]]['target']);
							addNewPoint(nonceInfoArray[nonceArray[i]]['target']);
							setZIndex(nonceInfoArray[nonceArray[i]]['target']);
						}
						
						if (nonceInfoArray[nonceArray[j]]['displayIcon']) {
							nonceInfoArray[nonceArray[j]]['displayIcon'] = false;
							map.removeOverlay(nonceInfoArray[nonceArray[j]]['target']);
							if (nonceArray[j] == activeNonce) {
								map.closeInfoWindow();
							}
						}
					}
					else {
						nonceInfoArray[nonceArray[j]]['parentIcon'] = 'no';
						if (nonceInfoArray[nonceArray[j]]['displayIcon']) {
							nonceInfoArray[nonceArray[j]]['displayIcon'] = false;
							map.removeOverlay(nonceInfoArray[nonceArray[j]]['target']);
							if (nonceArray[j] == activeNonce) {
								map.closeInfoWindow();
							}
						}
					}
				}
				else {
					if (nonceInfoArray[nonceArray[i]]['parentIcon'] != 'no') {
						nonceInfoArray[nonceArray[i]]['parentIcon'] = 'yes';
						
						if (!nonceInfoArray[nonceArray[i]]['displayIcon']) {
							nonceInfoArray[nonceArray[i]]['displayIcon'] = true;
							map.addOverlay(nonceInfoArray[nonceArray[i]]['target']);
							addNewPoint(nonceInfoArray[nonceArray[i]]['target']);
							setZIndex(nonceInfoArray[nonceArray[i]]['target']);
						}
						
						if (nonceInfoArray[nonceArray[j]]['parentIcon'] != 'no') {
							nonceInfoArray[nonceArray[j]]['parentIcon'] = 'yes';
	
							if (!nonceInfoArray[nonceArray[j]]['displayIcon']) {
								nonceInfoArray[nonceArray[j]]['displayIcon'] = true;
								map.addOverlay(nonceInfoArray[nonceArray[j]]['target']);
								addNewPoint(nonceInfoArray[nonceArray[j]]['target']);
								setZIndex(nonceInfoArray[nonceArray[j]]['target']);
							}
						}
					}
					else {
						if (nonceInfoArray[nonceArray[j]]['parentIcon'] != 'no') {
							nonceInfoArray[nonceArray[j]]['parentIcon'] = 'yes';
	
							if (!nonceInfoArray[nonceArray[j]]['displayIcon']) {
								nonceInfoArray[nonceArray[j]]['displayIcon'] = true;
								map.addOverlay(nonceInfoArray[nonceArray[j]]['target']);
								addNewPoint(nonceInfoArray[nonceArray[j]]['target']);
								setZIndex(nonceInfoArray[nonceArray[j]]['target']);
							}
						}
					}				
				}
			}
		}
	}
}