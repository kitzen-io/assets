export default interface IAssetMetadata {
  identifier: string;
  name: string;
  website: string;
  description: string;
  explorer: string;
  network: string;
  symbol: string;
  decimals: number;
  links: { name: string; url: string }[];
}
