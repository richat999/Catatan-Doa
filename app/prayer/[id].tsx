import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import AdBanner from "../components/AdBanner";

// Mock data for prayers
const mockPrayers = [
  {
    id: "1",
    name: "Doa Sebelum Makan",
    arabic:
      "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    translation:
      "Ya Allah, berkahilah rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
  },
  {
    id: "2",
    name: "Doa Sesudah Makan",
    arabic:
      "اَلْحَمْدُ ِللهِ الَّذِىْ اَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِيْنَ",
    translation:
      "Segala puji bagi Allah yang telah memberi makan kami dan minuman kami, serta menjadikan kami sebagai orang-orang islam.",
  },
  {
    id: "3",
    name: "Doa Sebelum Tidur",
    arabic: "بِسْمِكَ اللّٰهُمَّ اَحْيَا وَاَمُوْتُ",
    translation: "Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati.",
  },
];

export default function PrayerDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the current prayer based on id
  const currentPrayerIndex = mockPrayers.findIndex(
    (prayer) => prayer.id === id,
  );
  const currentPrayer = mockPrayers[currentPrayerIndex] || mockPrayers[0];

  // Handle navigation to previous or next prayer
  const navigateToPrayer = (direction: "prev" | "next") => {
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentPrayerIndex > 0
          ? currentPrayerIndex - 1
          : mockPrayers.length - 1;
    } else {
      newIndex =
        currentPrayerIndex < mockPrayers.length - 1
          ? currentPrayerIndex + 1
          : 0;
    }

    router.replace(`/prayer/${mockPrayers[newIndex].id}`);
  };

  return (
    <View className="flex-1 bg-[#90D1CA]">
      {/* Header */}
      <View className="bg-[#096B68] p-4 rounded-b-lg shadow-md">
        <TouchableOpacity onPress={() => router.back()} className="mb-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white text-center">
          {currentPrayer.name}
        </Text>
      </View>

      {/* Prayer Content */}
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="bg-white rounded-lg p-6 shadow-md mb-4">
          <Text className="text-lg font-bold text-[#096B68] mb-2">
            Lafadz Doa
          </Text>
          <Text
            className="text-2xl text-right leading-10 mb-6"
            style={{ fontFamily: "System" }}
          >
            {currentPrayer.arabic}
          </Text>

          <Text className="text-lg font-bold text-[#096B68] mb-2">Arti</Text>
          <Text className="text-base text-gray-700 mb-4">
            {currentPrayer.translation}
          </Text>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between bg-[#129990] p-4">
        <TouchableOpacity
          onPress={() => navigateToPrayer("prev")}
          className="flex-row items-center bg-[#096B68] px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={20} color="#fff" />
          <Text className="text-white ml-2">Sebelumnya</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToPrayer("next")}
          className="flex-row items-center bg-[#096B68] px-4 py-2 rounded-lg"
        >
          <Text className="text-white mr-2">Selanjutnya</Text>
          <ArrowRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Ad Banner */}
      <AdBanner />
    </View>
  );
}
