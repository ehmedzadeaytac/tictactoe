import TicTacToe from "@/components/TicTacToe";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <TicTacToe />
    </View>
  );
}