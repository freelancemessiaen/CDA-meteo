import { Home } from "./pages/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { s } from "./App.style";
import { ImageBackground } from "react-native";
import fond from "./assets/fond.jpg";
import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import { useFonts } from "expo-font";
export default function App() {
  const [isFontLoaded] = useFonts({
    "Alatar-Regular": AlataRegular,
  });
  console.log(isFontLoaded);
  return (
    <ImageBackground source={fond} style={s.img_background} imageStyle={s.img}>
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          {isFontLoaded ? <Home /> : null}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
