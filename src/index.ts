import IAssetMetadata from './interface/asset-metadata.interface';
import assetsMetadata from './assets.metadata.json';
import assetsTestMetadata from './assets.test.metadata.json';
import assetMetadataObject from './assets.metadata.constant.json';
import assetTestMetadataObject from './assets.test.metadata.constant.json';
import defaultAssets from './default.asssets.json';

function getAssetMetadata(env: 'production' | 'development' = 'production'): IAssetMetadata[] {
  if (env === 'development') {
    return assetsTestMetadata;
  } else {
    return assetsMetadata;
  }
}

function getAssetMetadataObject(env: 'production' | 'development' = 'production'):  { [network: string]: { [identifier: string]: IAssetMetadata } } {
  if (env === 'development') {
    return assetTestMetadataObject;
  } else {
    return assetMetadataObject;
  }
}

export {
  getAssetMetadata,
  getAssetMetadataObject,
  defaultAssets,
  IAssetMetadata,
};
