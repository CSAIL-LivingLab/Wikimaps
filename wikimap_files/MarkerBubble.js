function openMarkerInfo(curNonce) {
	var type = nonceInfoArray[curNonce]['type'];

	if (type == 'wiki')
		WikiObj.openMarkerInfo(curNonce);
	else if (type == 'schedule')
		SchedObj.openMarkerInfo(curNonce);
	else if (type == 'equipment')
		EquipObj.openMarkerInfo(curNonce);
	else if (type == 'people')
		PeopleObj.openMarkerInfo(curNonce);		
	else {
		if (nonceInfoArray[curNonce]['isTack'])
			openMarkerInfo2(curNonce);
		else	
			WikiObj.openMarkerInfo(curNonce);	
	}
}

function openMarkerInfo4(curNonce,d_Array_Row,e_Array_Row) {
	var divOutput = '';
	var curNonceInfo = nonceInfoArray[curNonce];

	activeNonce = curNonce;

	divOutput += "<div id='defaultPopup"+curNonce+"' name='defaultPopup"+curNonce+"' class='popup' style='position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
					"<table style='width:190px;font-size:8pt;' class='popup' border='0'>";
	
	divOutput += returnDivOutput(d_Array_Row,curNonce,curNonceInfo);
	divOutput += "</table><\/div>";

	divOutput += "<div onKeyUp='updateEdit(\""+curNonce+"\")' onMouseUp='updateEdit(\""+curNonce+"\")' id='editPopup"+curNonce+"' name='editPopup"+curNonce+"' class='popup' style='display:none;position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
		"<table style='width:190px;font-size:8pt;' class='popup' border='0'>";

	divOutput += returnDivOutput(e_Array_Row,curNonce,curNonceInfo);
	divOutput += "</table><\/div>";

	divOutput += "<div id='initPopup"+curNonce+"' name='initPopup"+curNonce+"' class='popup' style='display:none;position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
					"<\/div>";
					
	curNonceInfo['target'].openInfoWindowHtml(spanCanvas(10 + ieCor,40,divOutput));
}

function openMarkerInfo3(curNonce) {
	var curNonceInfo = nonceInfoArray[curNonce];

	activeNonce = curNonce;

	curNonceInfo['target'].openInfoWindowHtml(spanCanvas(10 + ieCor,40,
		"<div id='defaultPopup"+curNonce+"' name='defaultPopup"+curNonce+"' class='popup' style='position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
		"<table style='width:190px;font-size:8pt;' class='popup' border='0'><tr><td align='center' colspan='2'><b><div id='itemName"+curNonce+"'>"+curNonceInfo['subject']+"<\/div><\/b><\/td><\/tr>" +
		"<tr><td align='center' colspan='2'><div id='itemLocation"+curNonce+"'>"+curNonceInfo['location']+"<\/div><\/td><\/tr>" +
		"<tr><td align='center' colspan='2'><div id='itemCategory"+curNonce+"'>"+curNonceInfo['starttime']+" to "+curNonceInfo['endtime']+"<\/div><\/td><\/tr>" +
		//"<tr><td width='60px' colspan='2'><div id='itemImages"+curNonce+"'><\/div><\/td><\/tr>" +
		"<tr><td colspan='2'>&nbsp;<\/td><\/tr>" +
		//"<tr><td colspan='2'>Description:<\/td><\/tr>" +
		"<tr><td colspan='2' align='left' valign='top' style='width:184px;height:110px;font-size:8pt'><div id='itemDescription"+curNonce+"'>"+curNonceInfo['description']+"<\/div><\/td><\/tr><\/table>" +
		"<\/div>"));
}

function openMarkerInfo2(curNonce) {
	var curNonceInfo = nonceInfoArray[curNonce];

	activeNonce = curNonce;

	curNonceInfo['target'].openInfoWindowHtml(spanCanvas(10 + ieCor,40,
		"<div onKeyUp='updateEdit(\""+curNonce+"\")' onMouseUp='updateEdit(\""+curNonce+"\")' id='editPopup"+curNonce+"' name='editPopup"+curNonce+"' class='popup' style='display:none;position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
		"<table style='width:190px;font-size:8pt;' class='popup' border='0'><tr><td width='65px'>Item Name:<\/td><td><input type='text' maxlength='40' style='font-size:8pt;width:125px' id='itemNameE"+curNonce+"' value=\""+curNonceInfo['nameE']+"\" /><\/td><\/tr>" +
		"<tr><td width='65px'>Location:<\/td><td><div id='itemLocationE"+curNonce+"'>"+curNonceInfo['locationE']+"<\/div><\/td><\/tr>" +
		"<tr><td>&nbsp;<\/td><td><i>Drag icon to change.<\/i><\/td><\/tr>" +
		"<tr><td width='65px'>Category:<\/td><td><select style='width:125px;font-size:8pt' id='itemCategoryE"+curNonce+"' /><option value='Bike Racks' \>Bike Racks <option value='Interesting Architecture' \>Interesting Architecture<option value='Paintings' \>Paintings<option value='Quick Food' \>Quick Food<option value='Sculptures' \>Sculptures<option value='Other' \>--Other--<\/select><\/td><\/tr>" +
		//"<tr><td colspan='2'>Image:<\/td><\/tr>" +
		//"<tr><td colspan='2'>" +
		//"<form name='uploadfile' enctype='multipart/form-data' action='mitwikimap.php' method='post' />" +
		//"<input type=hidden name='MAX_FILE_SIZE' value='204800' />" +
		//"<input id='itemImagesE"+curNonce+"' class='popup' type=file name='fupload' /><\/form><\/td><\/tr>" +
		"<tr><td colspan='2'>Description:<\/td><\/tr>" +
		"<tr><td colspan='2'><textarea id='itemDescriptionE"+curNonce+"' wrap='hard' style='width:184px;height:60px;font-size:8pt;font-family: Arial, Helvetica, sans-serif;'>"+curNonceInfo['descriptionE']+"<\/textarea><\/td><\/tr>" +
		"<tr><td width='65px' rowspan='2'><a href='#' onClick='javascript:showInitPopup(\""+curNonce+"\")'>Back to location matches<\/a><\/td><td rowspan='2' align='right'><input type='button' class='box3' onclick='javascript:addData(\""+curNonce+"\",\""+curNonceInfo['target'].point+"\");' value='Save' /><br /><input id='cancelEdit"+curNonce+"' type='button' class='box3' onclick='javascript:cancelEdit(\""+curNonce+"\")' value='Cancel' /><\/td><\/tr>" +
		"<\/table>" +
		"<\/div>" +
		"<div id='defaultPopup"+curNonce+"' name='defaultPopup"+curNonce+"' class='popup' style='position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
		"<table style='width:190px;font-size:8pt;' class='popup' border='0'><tr><td align='center' colspan='2'><b><div id='itemName"+curNonce+"'>"+curNonceInfo['name']+"<\/div><\/b><\/td><\/tr>" +
		"<tr><td align='center' colspan='2'><div id='itemLocation"+curNonce+"'>"+curNonceInfo['location']+"<\/div><\/td><\/tr>" +
		"<tr><td align='center' colspan='2'><div id='itemCategory"+curNonce+"'>"+curNonceInfo['category']+"<\/div><\/td><\/tr>" +
		//"<tr><td width='60px' colspan='2'><div id='itemImages"+curNonce+"'><\/div><\/td><\/tr>" +
		"<tr><td colspan='2'>&nbsp;<\/td><\/tr>" +
		//"<tr><td colspan='2'>Description:<\/td><\/tr>" +
		"<tr><td colspan='2' align='left' valign='top' style='width:184px;height:110px;font-size:8pt'><div id='itemDescription"+curNonce+"'>"+curNonceInfo['description']+"<\/div><\/td><\/tr>" +
		"<tr><td width='110px'><a href='#' onClick='javascript:requestDeletion(\""+curNonce+"\")'>Suggest as incorrect or inappropriate<\/a><\/td><td align='right'><input type='button' class='box3' onclick='javascript:editData(\""+curNonce+"\")' value='Edit' /><\/td><\/tr><\/table>" +
		"<\/div>" +
		"<div id='initPopup"+curNonce+"' name='initPopup"+curNonce+"' class='popup' style='display:none;position:absolute;top:0px;left:0px;width:"+50*4+"px;height:"+10*16+"px;'>" +
		"<\/div>"));
}