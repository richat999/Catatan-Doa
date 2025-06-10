import { View } from "react-native";
import PrayerList from "./components/PrayerList";
import AdBanner from "./components/AdBanner";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <PrayerList />
      </View>
      <AdBanner />
    </View>
  );
}
