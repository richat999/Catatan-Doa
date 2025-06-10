const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle platform-specific files
config.resolver.platforms = ["ios", "android", "native", "web"];
config.resolver.resolverMainFields = ["react-native", "browser", "main"];

// Exclude native modules from web builds
config.resolver.blockList = [
  /node_modules\/react-native-google-mobile-ads\/.*/,
];

// Platform-specific resolver
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "react-native-google-mobile-ads") {
    return {
      filePath: require.resolve("./app/components/AdBanner.web.tsx"),
      type: "sourceFile",
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
