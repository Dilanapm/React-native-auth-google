import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter, Stack } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/home')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={styles.container}>
      {/* Personalizar el encabezado */}
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Bienvenido de nuevo</Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Correo electrónico"
        placeholderTextColor="#B0B0B0"
        onChangeText={(email) => setEmailAddress(email)}
        style={styles.input}
      />

      <TextInput
        value={password}
        placeholder="Contraseña"
        placeholderTextColor="#B0B0B0"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Enlace para registrarse */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
        <Link href="/auth/sign-up" asChild>
          <TouchableOpacity>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#B0B0B0",
    fontSize: 16,
  },
  registerLink: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});