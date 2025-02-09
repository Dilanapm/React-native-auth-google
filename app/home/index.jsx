import { useAuth, useUser } from "@clerk/clerk-expo";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const { user, isLoaded } = useUser(); // `isLoaded` verifica si la info del usuario está lista
  const { signOut } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user && isLoaded) {
      // Si `user` es null y `isLoaded` es true, la sesión se cerró
      router.replace("/login");
    }
  }, [user, isLoaded]); // Se ejecuta cuando cambia el usuario o cuando se carga la info

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(); // Espera a que Clerk cierre la sesión
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
    setLoading(false);
  };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Hello {user?.emailAddresses[0].emailAddress}
          </Text>
          {/* Botón para cerrar sesión */}
          <Button
            title={loading ? "Cerrando sesión..." : "Cerrar Sesión"}
            onPress={handleSignOut}
            color="red"
            disabled={loading} // Desactiva el botón mientras cierra sesión
          />
        </>
      ) : (
        <Text style={{ fontSize: 18, color: "gray" }}>No hay usuario autenticado</Text>
      )}
    </View>
  );
}
