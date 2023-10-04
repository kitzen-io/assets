import IAssetMetadata from './interface/asset-metadata.interface';
import assetsMetadata from './assets.metadata.json';
import assetsTestMetadata from './assets.test.metadata.json';
import assetMetadataObject from './assets.metadata.constant.json';
import assetTestMetadataObject from './assets.test.metadata.constant.json';
import defaultAssets from './default.asssets.json';
import { IAssetMetadataObject } from './interface/asset-metadata-object.interface';
import { Countries } from './countries';

function getAssetMetadata(env: 'production' | 'development' = 'production'): IAssetMetadata[] {
  if (env === 'development') {
    return assetsTestMetadata;
  } else {
    return assetsMetadata;
  }
}

function getAssetMetadataObject(env: 'production' | 'development' = 'production'): IAssetMetadataObject {
  if (env === 'development') {
    return assetTestMetadataObject;
  } else {
    return assetMetadataObject;
  }
}

function getLanguageIconName(country: string): string {
  return `${Countries[country]}.svg`;
}

export {
  getAssetMetadata,
  getAssetMetadataObject,
  getLanguageIconName,
  defaultAssets,
  IAssetMetadata,
  IAssetMetadataObject,
};
