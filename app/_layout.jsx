import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Stack, Redirect } from "expo-router";
import { useFonts } from "expo-font";
import { tokenCache } from "@/cache";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  useFonts({
    "notosans-regular": require("./../assets/fonts/NotoSans_Condensed-Regular.ttf"),
    "notosans-bold": require("./../assets/fonts/NotoSans_Condensed-Bold.ttf"),
    "notosans-semibold": require("./../assets/fonts/NotoSans_Condensed-SemiBold.ttf"),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      {/* Si el usuario está autenticado, lo mandamos a /home */}
      <SignedIn>
        <Redirect href="/home" />
      </SignedIn>

      {/* Si el usuario no está autenticado, lo mandamos a /login */}
      <SignedOut>
        <Redirect href="/login" />
      </SignedOut>

      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
