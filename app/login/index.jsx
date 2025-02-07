import { View, Image, Text, Pressable } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors'
export default function LoginScreen() {
  return (
    <View>
      <Image source={require('./../../assets/images/login.png')} 
      style={{width: '100%', 
      height: 500}} />
      <View>
        <Text style={{
          textAlign: 'center',
          fontSize: 30,
          fontFamily: 'notosans-semibold',
          margin: 5
        }}>Listo para hacer un nuevo amigo</Text>

        <Text style={{
          textAlign: 'center',
          fontSize: 18,
          fontFamily: 'notosans-regular',
          margin: 5,
          color: Colors.gray
        }}>Adopta la mascota ideal para ti</Text>

        <Pressable 
        
        style={{
          backgroundColor: Colors.primary,
          padding: 10,
          margin: 10,
          borderRadius: 5
          
          }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'notosans-semibold',
            margin: 5,
            color: "white"
          }}>Iniciar sesión</Text>
        </Pressable>
      </View>
      
    </View> 
  )
}