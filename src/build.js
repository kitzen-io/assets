const BuilderTool = require("./tool/builder.tool");

BuilderTool.generateAssets();
BuilderTool.mergeAssetsMetadata();
BuilderTool.generateExportImageFile();
BuilderTool.generateMainIndexFile();
