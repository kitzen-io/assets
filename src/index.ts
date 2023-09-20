import IAssetMetadata from './interface/asset-metadata.interface';
import assetsMetadata from './assets.metadata.json';
import assetsTestMetadata from './assets.test.metadata.json';
import assetMetadataObject from './assets.metadata.constant.json';
import assetTestMetadataObject from './assets.test.metadata.constant.json';
import defaultAssets from './default.asssets.json';

const AssetsMetadataObject: = assetMetadataObject;

function getAssetMetadata(env: 'prod' | 'test' = 'prod'): IAssetMetadata[] {
  if (env === 'prod') {
    return assetsMetadata;
  } else {
    return assetsTestMetadata;
  }
}

function getAssetMetadataObject(env: 'prod' | 'test' = 'prod'):  { [network: string]: { [identifier: string]: IAssetMetadata } } {
  if (env === 'prod') {
    return assetMetadataObject;
  } else {
    return assetsTestMetadata;
  }
}



export {
  getAssetMetadata,
  getAssetMetadataObject,
  defaultAssets,
  IAssetMetadata,
};
