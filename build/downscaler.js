const fs = require('fs/promises');
const path = require('path');
const SVGTranslator = require('svg-scaler/lib/SVGTranslator');

async function scaleSVGsInDirectory(directoryPath, outputDirectoryPath, targetWidth) {
  // Read the list of files in the directory
  const files = await fs.readdir(directoryPath);

  // Create a new SVGTranslator instance with the target width
  const svgTranslator = new SVGTranslator({ width: targetWidth });

  // Process each file
  for (const file of files) {
    // Get the full file path
    const filePath = path.join(directoryPath, file);

    // Check if the file is a directory
    const isDirectory = (await fs.stat(filePath)).isDirectory();

    if (isDirectory) {
      // If it's a directory, recursively process it
      const subOutputDirectory = path.join(outputDirectoryPath, file);
      await fs.mkdir(subOutputDirectory, { recursive: true });
      await scaleSVGsInDirectory(filePath, subOutputDirectory, targetWidth);
    } else if (path.extname(file) === '.svg') {
      // If it's an SVG file, read, scale, and save it
      const svgData = await fs.readFile(filePath, 'utf-8');
      const scaledSVG = await svgTranslator.parser(svgData);
      if (scaledSVG.includes('NaN')) { // Bug ignore these files ;( no better solution
        console.log(`cant convert ${filePath}`);
        continue;
      }
      // Write the scaled SVG to the output directory
      const outputFilePath = path.join(outputDirectoryPath, file);
      await fs.writeFile(outputFilePath, scaledSVG);

      console.log(`Scaled and saved: ${outputFilePath}`);
    }
  }

}

scaleSVGsInDirectory('./src', './src', 36);
