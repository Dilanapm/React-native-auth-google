import * as React from 'react'
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Stack } from "expo-router";


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/home')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    )
  }

  return (
    <View style={styles.container}>
      {/* Personalizar el encabezado */}
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Crea tu cuenta</Text>

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

      <TouchableOpacity style={styles.button} onPress={onSignUpPress} >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  });