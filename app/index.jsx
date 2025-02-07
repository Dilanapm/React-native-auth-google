import { Text, Pressable, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View>
      <Link asChild href={'/login'}>
        <Pressable>
          <Text>Ir a la pantalla de Login</Text>
        </Pressable>
      </Link>
    </View>
  );
}
