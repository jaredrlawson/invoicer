//FIRST GENERATE THE PDF DOCUMENT
console.log("generating pdf...");
var doc = new jsPDF();
 
doc.text(20, 20, 'HELLO!');
 
doc.setFont("courier");
doc.setFontType("normal");
doc.text(20, 30, 'This is a PDF document generated using JSPDF.');
doc.text(20, 50, 'YES, Inside of PhoneGap!');
 
var pdfOutput = doc.output();
console.log( pdfOutput );
 
//NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
console.log("file system...");
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
 
   console.log(fileSystem.name);
   console.log(fileSystem.root.name);
   console.log(fileSystem.root.fullPath);
 
   fileSystem.root.getFile("test.pdf", {create: true}, function(entry) {
      var fileEntry = entry;
      console.log(entry);
 
      entry.createWriter(function(writer) {
         writer.onwrite = function(evt) {
         console.log("write success");
      };
 
      console.log("writing to file");
         writer.write( pdfOutput );
      }, function(error) {
         console.log(error);
      });
 
   }, function(error){
      console.log(error);
   });
},
function(event){
 console.log( evt.target.error.code );
});
