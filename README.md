# @kitzen/assets
[![npm version](https://img.shields.io/npm/v/@kitzen/assets?color=green)](https://www.npmjs.com/package/@kitzen/assets)
[![from kitzen with Love](https://img.shields.io/badge/from%20kitzen%20with-%F0%9F%A4%8D-red)](https://kitzen.io/)

The Kitzen token repository offers an extensive and current database encompassing thousands of cryptocurrency tokens. 

Projects, including Kitzen, utilize the token logos sourced from here. 

Each token comes with a logo and the possibility of supplementary details, which are not accessible on-chain. 

Maintaining this vast compilation is a communal endeavor, so contributions by adding your token are welcome.

## Getting started

````
yarn add @kitzen/assets
````

## Usage
You can access list of all metadata object just

````
import { AssetsMetadata, IAssetMetadata } from '@kitzen/assets';
const network = 'bitcoin';
const identifier = 'coin';

const asset: IAssetMetadata = AssetsMetadata.find((metadata: IAssetMetadata) => metadata.network === network && metadata.identifier === identifier); 

````

Or you can access metadata of asset without iteration O(1) just by key:
````
import { AssetsMetadataObject, IAssetMetadata } from '@kitzen/assets';

const network = 'bitcoin';
const identifier = 'coin;

const asset: IAssetMetadata = AssetsMetadataObject[network][identifier]; 
````



## Versioning

This lib use [semantic-release](https://github.com/semantic-release/semantic-release#how-does-it-work) library.

Please, set valid commit message, to increment the right version
### To increase path (x.y.Z) version
`````fix: your commit message...`````

### To increase minor (x.Y.z) version
`````feat: your commit message...`````

### To increase version (X.y.z) version
`````perf: your commit message...`````

# Logos
 - All logos must be in SVG format to avoid the need for mobile apps to support multiple image assets, which would significantly increase app size and frontend complexity
 - All logos should have a fixed size of 36x36

# Contributing
We deeply appreciate the valuable contributions made by our community. 
To provide feedback or report bugs, [kindly open a GitHub issue](https://github.com/kitzen-io/api-dto/issues/new).
For code contributions, explore our "Contributing" guidelines and become part of our open-source community. 

Thank you to all the dedicated individuals who contribute; your passion drives our success. Together, we shape the future of web3 industry.


<a href="https://github.com/kitzen-io/assets/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kitzen-io/assets&max=400&columns=20" />
  <img src="https://us-central1-tooljet-hub.cloudfunctions.net/github" width="0" height="0" />
</a>
