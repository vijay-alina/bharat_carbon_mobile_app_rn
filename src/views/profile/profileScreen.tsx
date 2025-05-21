import { View } from "react-native";
import LeaderboardScreen from "./components/leaderboardScreen";
import { Header } from "../../common/header";

export const ProfileScreen = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Header title="Leaderboard" />
      <LeaderboardScreen />
    </View>
  );
};
