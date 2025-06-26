/* eslint-disable camelcase */
import { Loading } from "@components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";
import { DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from "@expo-google-fonts/poppins";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Routes } from "@routes/index";
import { StatusBar } from "react-native";
import { config } from "./config/gluestack-ui.config";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
