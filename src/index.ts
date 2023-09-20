import IAssetMetadata from './interface/asset-metadata.interface';
import assetsMetadata from './assets.metadata.json';
import assetMetadataObject from './assets.metadata.constant.json';
import defaultAssets from './default.asssets.json';

const AssetsMetadata: IAssetMetadata[] = assetsMetadata;
const AssetsMetadataObject: { [network: string]: { [identifier: string]: IAssetMetadata } } = assetMetadataObject;

export {
  AssetsMetadata,
  AssetsMetadataObject,
  defaultAssets,
  IAssetMetadata,
};
