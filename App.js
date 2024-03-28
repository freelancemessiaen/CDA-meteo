import { Home } from "./pages/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { s } from "./App.style";
import { ImageBackground } from "react-native";
import fond from "./assets/fond.jpg";
import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Forecast } from "./pages/Forecast/Forecast.jsx";

export default function App() {
  const [isFontLoaded] = useFonts({
    "Alatar-Regular": AlataRegular,
  });
  const Stack = createNativeStackNavigator();
  const navTheme = {
    colors: {
      background: "transparent",
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        source={fond}
        style={s.img_background}
        imageStyle={s.img}
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded ? (
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Forecast" component={Forecast} />
              </Stack.Navigator>
            ) : null}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
