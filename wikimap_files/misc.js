function spanCanvas(rows, cols, body) {

   // Each row increment adds 16 pixels to the canvas height.
   // Each column increment adds 4 pixels to the canvas width.

   var html = "";

   for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++)
         html += "&nbsp;";
      html += "<br>";
   }

   html += body ? body : "";
   return html;

}
