const fs = require('fs');
const path = require("path");

const libDir = 'lib';
const directoryPath = 'src/assets';  // root directory
const outputDirectory = `./${libDir}/logo`;  // folder where all logos will be saved

const mergedFileName = `assetsMetadata.json`;
class BuilderTool {
  static mergeAssetsMetadata() {
    const allInfoData = BuilderTool.gatherInfoFromDirectory(directoryPath);
    fs.writeFileSync(`${libDir}/assetsMetadata.json`, JSON.stringify(allInfoData, null, 2));
    console.log('Merged all assetsMetadata.json files into assetsMetadata.json');
  }

  static generateAssets() {
    if (!fs.existsSync(libDir)) fs.mkdirSync(libDir);
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory);
    BuilderTool.processLogosFromDirectory(directoryPath);
    console.log('All logos have been processed and saved in', outputDirectory);
  }

  static generateMainIndexFile() {
    const exportsContent = `export const AssetsMetadata = require('./${mergedFileName}');`;

    fs.writeFileSync(`${libDir}/index.js`, exportsContent);
    console.log(`Generated main index.js with exports ${mergedFileName}`);
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
        const metadata = require(`${process.cwd()}/${dir}/metadata.json`);
        console.log(metadata);

        const assetName = `${metadata.network}_${metadata.identifier}.png`;
        const destination = path.join(outputDirectory, assetName);
        fs.copyFileSync(fullPath, destination);
      }
    });
  }
}

module.exports = BuilderTool;
