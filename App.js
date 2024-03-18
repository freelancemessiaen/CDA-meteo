import { Home } from "./pages/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { s } from "./App.style";
import { ImageBackground } from "react-native";
import fond from "./assets/fond.jpg";

export default function App() {
  return (
    <ImageBackground source={fond} style={s.img_background} imageStyle={s.img}>
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          <Home />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
