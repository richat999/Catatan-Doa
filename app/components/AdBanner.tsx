import React from "react";
import { View, Platform } from "react-native";

interface AdBannerProps {
  adUnitId?: string;
  size?: any;
}

// Native implementation with platform check
const AdBanner: React.FC<AdBannerProps> = ({
  adUnitId = "ca-app-pub-3940256099942544/9214589741",
  size,
}) => {
  // Return null on web to prevent any native module loading
  if (Platform.OS === "web") {
    return null;
  }

  const [AdComponent, setAdComponent] =
    React.useState<React.ComponentType<any> | null>(null);
  const [adSize, setAdSize] = React.useState<any>(null);
  const [testIds, setTestIds] = React.useState<any>(null);

  React.useEffect(() => {
    // Only load ads on native platforms
    if (Platform.OS !== "web") {
      const loadAds = async () => {
        try {
          const ads = await import("react-native-google-mobile-ads");
          const { BannerAd, BannerAdSize, TestIds } = ads;
          setAdComponent(() => BannerAd);
          setAdSize(size || BannerAdSize.BANNER);
          setTestIds(TestIds);
        } catch (error) {
          console.log("Failed to load ads:", error);
        }
      };

      loadAds();
    }
  }, [size]);

  // Don't render anything until the ad component is loaded or on web
  if (!AdComponent || !adSize || !testIds) {
    return null;
  }

  const bannerAdUnitId = __DEV__ ? testIds.BANNER : adUnitId;

  return (
    <View className="bg-white border-t border-gray-200">
      <View className="items-center justify-center" style={{ height: 50 }}>
        <AdComponent
          unitId={bannerAdUnitId}
          size={adSize}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={() => {
            console.log("Ad loaded successfully");
          }}
          onAdFailedToLoad={(error: any) => {
            console.log("Ad failed to load:", error);
          }}
        />
      </View>
    </View>
  );
};

export default AdBanner;
