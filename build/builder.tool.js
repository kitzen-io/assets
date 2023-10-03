const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const SRC_DIR = 'src';
const LIB_DIR = 'lib';
const outputDirectory = `./${LIB_DIR}/logo`;  // folder where all logos will be saved


class BuilderTool {
  static mergeAssetsMetadata(directoryPath, mergedJsonName, mergedObjectFileName) {
    const allInfoData = BuilderTool.gatherInfoFromDirectory(directoryPath);
    fs.writeFileSync(`${SRC_DIR}/${mergedJsonName}.json`, JSON.stringify(allInfoData, null, 2));
    console.log(`Merged all metadata.json files into ${mergedJsonName}.json`);
    BuilderTool.generateAssetsMetadataEnum(allInfoData, mergedObjectFileName);
  }

  static generateAssetsMetadataEnum(data, filename) {
    const AssetsMetadataObject = {};

    for (let asset of data) {
      const { network, identifier } = asset;
      if (!AssetsMetadataObject[network]) AssetsMetadataObject[network] = {};
      AssetsMetadataObject[network][identifier] = asset;
    }

    let objectContent = JSON.stringify(AssetsMetadataObject);
    const objectFilePath = `${SRC_DIR}/${filename}.json`;

    fs.writeFileSync(objectFilePath, objectContent);
    console.log(`Generated object in ${objectFilePath}`);
  }

  static generateAssets(directoryPath) {
    if (!fs.existsSync(LIB_DIR)) fs.mkdirSync(LIB_DIR);
    if (!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory);
    BuilderTool.processLogosFromDirectory(directoryPath);
    console.log('All logos have been processed and saved in', outputDirectory);
  }

  static copyFlags() {
    fsExtra.copySync(`${SRC_DIR}/flags`, `${LIB_DIR}/flags`);
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
