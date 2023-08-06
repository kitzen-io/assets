const fs = require('fs');
const path = require("path");

const libDir = 'lib';
const directoryPath = 'src/assets';  // root directory
const outputDirectory = `./${libDir}/logo`;  // folder where all logos will be saved

class BuilderTool {
  static mergeAssetsMetadata() {
    const allInfoData = BuilderTool.gatherInfoFromDirectory(directoryPath);
    fs.writeFileSync(`${libDir}/metadata.json`, JSON.stringify(allInfoData, null, 2));
    console.log('Merged all metadata.json files into metadata.json');
  }

  static generateAssets() {
    if (!fs.existsSync(libDir)) fs.mkdirSync(libDir);
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory);
    BuilderTool.processLogosFromDirectory(directoryPath);
    console.log('All logos have been processed and saved in', outputDirectory);
  }

  static generateExportImageFile() {
    const imageExports = [];

    const images = fs.readdirSync(outputDirectory);
    images.forEach((imageName) => {
      const imageBaseName = path.basename(imageName, '.png');
      imageExports.push(`export const ${imageBaseName} = require('./${imageName}');`);
    });

    const exportsContent = `
      ${imageExports.join('\n')}
    `;

    fs.writeFileSync(`${libDir}/logo/index.js`, exportsContent);
    console.log('Generated index.js with explicit exports for each logo');
  }

  static generateMainIndexFile() {
    const exportsContent = `
      export * from './logo/index.js';
      export const metadata = require('./metadata.json');
    `;

    fs.writeFileSync(`${libDir}/index.js`, exportsContent);
    console.log('Generated main index.js with exports from logo/index.js and metadata.json');
  }

  static gatherInfoFromDirectory(dir) {
    const results = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const fileStat = fs.statSync(fullPath);

      if (fileStat.isDirectory()) {
        results.push(...BuilderTool.gatherInfoFromDirectory(fullPath));
      } else if (file === 'metadata.json') {
        const data = fs.readFileSync(fullPath, 'utf8');
        // @ts-ignore
        results.push(JSON.parse(data));
      }
    });

    return results;
  }

  static processLogosFromDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const fileStat = fs.statSync(fullPath);

      if (fileStat.isDirectory()) {
        BuilderTool.processLogosFromDirectory(fullPath);
      } else if (file === 'logo.png') {
        const assetName = dir.replace(directoryPath, '').split(path.sep).filter(Boolean).join('_');
        const newLogoName = `${assetName}.png`;
        const destination = path.join(outputDirectory, newLogoName);
        fs.copyFileSync(fullPath, destination);
      }
    });
  }
}

module.exports = BuilderTool;
