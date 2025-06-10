import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";

interface Prayer {
  id: string;
  name: string;
}

interface PrayerListProps {
  prayers?: Prayer[];
  onSearch?: (text: string) => void;
}

const PrayerList = ({
  prayers = [
    { id: "1", name: "Doa Sebelum Makan" },
    { id: "2", name: "Doa Setelah Makan" },
    { id: "3", name: "Doa Sebelum Tidur" },
    { id: "4", name: "Doa Bangun Tidur" },
    { id: "5", name: "Doa Masuk Kamar Mandi" },
    { id: "6", name: "Doa Keluar Kamar Mandi" },
    { id: "7", name: "Doa Masuk Masjid" },
    { id: "8", name: "Doa Keluar Masjid" },
    { id: "9", name: "Doa Bepergian" },
    { id: "10", name: "Doa Untuk Orang Tua" },
  ],
  onSearch = () => {},
}: PrayerListProps) => {
  const router = useRouter();

  const handlePrayerPress = (id: string) => {
    router.push(`/prayer/${id}`);
  };

  const renderItem = ({ item }: { item: Prayer }) => (
    <TouchableOpacity
      onPress={() => handlePrayerPress(item.id)}
      className="p-4 border-b border-[#90D1CA] flex-row items-center justify-between"
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-[#129990] items-center justify-center mr-3">
          <Text className="text-white font-bold">{item.id}</Text>
        </View>
        <Text className="text-lg text-[#096B68]">{item.name}</Text>
      </View>
      <Text className="text-[#129990]">›</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="p-4 bg-[#096B68] flex-row items-center">
        <View className="flex-1 flex-row items-center bg-white rounded-lg px-3 py-2">
          <Search size={20} color="#129990" />
          <Text className="ml-2 text-[#90D1CA]">Cari Doa...</Text>
        </View>
      </View>

      {/* Prayer List */}
      <FlatList
        data={prayers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 70 }}
        ListEmptyComponent={
          <View className="p-4 items-center justify-center">
            <Text className="text-[#096B68] text-lg">
              Tidak ada doa yang ditemukan
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View className="p-4 bg-[#90D1CA]">
            <Text className="text-[#096B68] text-xl font-bold">Daftar Doa</Text>
            <Text className="text-[#096B68] mt-1">
              Pilih doa untuk melihat detail
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default PrayerList;
