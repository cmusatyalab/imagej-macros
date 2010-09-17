IJ.run("Colour Deconvolution", "vectors=H&E");
IJ.getImage().close();
IJ.getImage().close();

var img = IJ.getImage();
IJ.run(img, "8-bit", "");
IJ.setAutoThreshold(img, "Default");
IJ.run(img, "Convert to Mask", "");
IJ.run(img, "Despeckle", "");
IJ.run(img, "Fill Holes", "");
IJ.run(img, "Erode", "");
IJ.run(img, "Analyze Particles...", "size=150-Infinity circularity=0.50-1.00 show=Nothing clear include summarize record");

// compute area fraction
var w = img.getWidth();
var h = img.getHeight();

var area = w * h;

var tArea = 0;
var i;
var rt = ResultsTable.getResultsTable();
for (i = 0; i < rt.getCounter(); i++) {
  tArea += rt.getValue("Area", i);
}

//print("tArea: " + tArea);
//print("area: " + area);
var areaFrac = (tArea / area * 100.0);   // area fraction in percent
print("areaFrac: " + areaFrac);

IJ.run("Diamond Filter", "expr=" + (areaFrac * 100));
