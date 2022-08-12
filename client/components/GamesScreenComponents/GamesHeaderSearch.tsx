import { View,TextInput, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'



interface props  {
    handleCasinoSearch : (input : string) => void, 
    handleGameSearch : (input : string) => void,


}
const GamesHeaderSearch = ({handleCasinoSearch, handleGameSearch} : props) => {



  return (
    <View     
    style={{
        marginHorizontal:10, 
        marginTop: 30, 
        marginBottom:30,
    }}>
        <View
          style={{
            width: "80%",
            height:50, 
            borderRadius: 20,
            backgroundColor:COLORS.BackgroundTwo, 
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center", 
            paddingHorizontal: 10, 
            paddingVertical: 5, 
          }}
        >
            <Image
            source={require("../../assets/icons8-search-60.png")}
            style={{ width: 20, height: 20}}
            />
            <View style={{width:10}}/>

            <TextInput
            placeholder="Search a city or a casino"
            onChangeText={handleCasinoSearch}
            style={{ flex: 1, fontSize: 20, fontFamily:"Barlow_300Light_Italic" }}
            />

        </View>



        <View
          style={{
            width: "80%",
            height:50, 
            borderRadius: 20,
            backgroundColor:COLORS.BackgroundTwo, 
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center", 
            paddingHorizontal: 10, 
            paddingVertical: 5, 
            marginTop: 20, 
          }}
        >
            <Image
            source={require("../../assets/icons8-search-60.png")}
            style={{ width: 20, height: 20}}
            />
            <View style={{width:10}}/>

            <TextInput
            placeholder="Search a game"
            onChangeText={handleGameSearch}
            style={{ flex: 1, fontSize: 20, fontFamily:"Barlow_300Light_Italic" }}
            />

        </View>


    </View>
  )
}

export default GamesHeaderSearch