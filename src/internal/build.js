const BuilderTool = require("./builder.tool");

BuilderTool.generateAssets();
BuilderTool.mergeAssetsMetadata();
BuilderTool.generateExportImageFile();
BuilderTool.generateMainIndexFile();
