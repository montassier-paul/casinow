import { View, Text, TouchableOpacity, Image, ImageProps } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

export const Button = () => {
  return (
    <View>
      <Text>Button</Text>
    </View>
  )
}

export const CircleButton = ({handlePress, img} : { handlePress : () => void, img : ImageProps}) => {
    return (
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          backgroundColor: COLORS.BackgroundTwo,
          position: "absolute",
          left : 10, 
          bottom: 10, 
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handlePress}
      >
        <Image
        source={img}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
      </TouchableOpacity>
    );
  };



export const DirectButton = ({handlePress, input} : { handlePress : () => void, input : string}) => {
    return (
      <TouchableOpacity
        style={{
          width: 100,
          height: 60,
          backgroundColor: "#00bfff",
          position: "absolute",
          alignSelf:"center", 
          bottom: 10, 
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handlePress}
      >
        <Text style={{
          fontFamily:"Barlow_700Bold",  
          fontSize:18
        }}>{input}</Text>
      </TouchableOpacity>
    );
  };