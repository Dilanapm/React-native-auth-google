import { Stack } from "expo-router";
import { useFonts } from "expo-font";
export default function RootLayout() {
  useFonts({
    'notosans-regular': require('./../assets/fonts/NotoSans_Condensed-Regular.ttf'),
    'notosans-bold': require('./../assets/fonts/NotoSans_Condensed-Bold.ttf'),
    'notosans-semibold': require('./../assets/fonts/NotoSans_Condensed-SemiBold.ttf'),
  });
  return ( <Stack>

    <Stack.Screen name="index" />
    <Stack.Screen name="login/index"
    options={{
      headerShown: false
    }} />
    
  </Stack>);
}
