import IAssetMetadata from './interface/asset-metadata.interface';
import assetsMetadata from './assets.metadata.json';
import assetMetadataObject from './assets.metadata.constant.json';

const AssetsMetadata: IAssetMetadata[] = assetsMetadata;
const AssetsMetadataObject: { [key: string]: IAssetMetadata } = assetMetadataObject

export {
  AssetsMetadata,
  AssetsMetadataObject,
  IAssetMetadata,
}
