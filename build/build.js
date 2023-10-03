const BuilderTool = require('./builder.tool');

BuilderTool.generateAssets('src/assets');
BuilderTool.generateAssets('src/test_assets');
BuilderTool.mergeAssetsMetadata('src/assets', 'assets.metadata', 'assets.metadata.constant');
BuilderTool.mergeAssetsMetadata('src/test_assets', 'assets.test.metadata', 'assets.test.metadata.constant');
BuilderTool.copyFlags();

