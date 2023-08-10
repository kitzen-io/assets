const fs = require('fs');
const path = require('path');

const SRC_DIR = 'src';
const LIB_DIR = 'lib';
const directoryPath = 'src/assets';  // root directory
const outputDirectory = `./${LIB_DIR}/logo`;  // folder where all logos will be saved

const mergedJsonName = 'assets.metadata';
const mergedObjectFileName = 'assets.metadata.constant';

class BuilderTool {
  static mergeAssetsMetadata() {
    const allInfoData = BuilderTool.gatherInfoFromDirectory(directoryPath);
    fs.writeFileSync(`${SRC_DIR}/${mergedJsonName}.json`, JSON.stringify(allInfoData, null, 2));
    console.log(`Merged all metadata.json files into ${mergedJsonName}.json`);
    BuilderTool.generateAssetsMetadataEnum(allInfoData);
  }

  static generateAssetsMetadataEnum(data) {
    const AssetsMetadataObject = {};

    for (let asset of data) {
      AssetsMetadataObject[`${asset.network}_${asset.identifier}`] = asset;
    }

    let objectContent = JSON.stringify(AssetsMetadataObject);
    const objectFilePath = `${SRC_DIR}/${mergedObjectFileName}.json`;

    fs.writeFileSync(objectFilePath, objectContent);
    console.log(`Generated object in ${objectFilePath}`);
  }

  static generateAssets() {
    if (!fs.existsSync(LIB_DIR)) fs.mkdirSync(LIB_DIR);
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory);
    BuilderTool.processLogosFromDirectory(directoryPath);
    console.log('All logos have been processed and saved in', outputDirectory);
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
      } else if (file === 'logo.svg') {
        const metadata = require(`${process.cwd()}/${dir}/metadata.json`);
        console.log(metadata);

        const assetName = `${metadata.network}_${metadata.identifier}.svg`;
        const destination = path.join(outputDirectory, assetName);
        fs.copyFileSync(fullPath, destination);
      }
    });
  }
}

module.exports = BuilderTool;
