import IAssetMetadata from './asset-metadata.interface';

export type IAssetMetadataObject = { [network: string]: { [identifier: string]: IAssetMetadata } };
