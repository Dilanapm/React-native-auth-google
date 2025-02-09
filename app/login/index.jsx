import { View, Image, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import { SignedIn, SignedOut, useUser, useAuth } from "@clerk/clerk-expo";
import { Link ,useRouter } from "expo-router";

export default function LoginScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Text style={styles.title}>¡Bienvenido!</Text>

     

      {/* Si el usuario no está autenticado */}
      <SignedOut>
        <View style={styles.authButtons}>
          <Link href="/auth/sign-in" asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.authButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/auth/sign-up" asChild>
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.authButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

// 🎨 Estilos con StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Fondo oscuro
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  userEmail: {
    fontSize: 18,
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#D32F2F", // Rojo oscuro
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  authButtons: {
    marginTop: 20,
    width: "100%",
  },
  signInButton: {
    backgroundColor: "#1976D2", // Azul
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#388E3C", // Verde
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  authButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
