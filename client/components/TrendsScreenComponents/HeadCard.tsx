import { View, Text, Image } from 'react-native'
import React from 'react'

const HeadCard = ({context} : {context : boolean}) => {


  return (

    <View 
    style={{
        margin : 10,
        borderBottomWidth:1,
        borderRadius: 20, 
        borderColor: "#9C07D0",
    }}>
        <View
        style={{
            alignItems:"center", 

        }}>
        {context
        ?<Text
        style={{
            fontSize:24,
            fontFamily: 'Barlow_800ExtraBold',
            letterSpacing:5
        }}>YOUR FEED</Text>
        :<Text
        style={{
            fontSize:24,
            fontFamily: 'Barlow_800ExtraBold',
            letterSpacing:5

        }}>TRENDS</Text>}
        </View>
        <Text/>
        <View
        style={{
            width:"100%", 
            height:100
        }}>
        <Image
                source={require("../../assets/InfoCardCover.png")}
                resizeMode="center"
                style={{ width: "100%", height: "100%", borderRadius: 30}}
            />
        </View>
        <Text/>
        <View
        style={{
            alignItems:"center", 

        }}>
        {context 
            ?<Text
            style={{  
                fontSize:15,
                fontFamily: 'Barlow_300Light_Italic',
                textAlign:"justify", 
                width: "90%"
            }}>Un feed adapté à vous. Vous n'y retrouverez que les informations concernant 
            les salles et les jeux qui vous intéressent</Text> 
            :<Text
            style={{  
                fontSize:15,
                fontFamily: 'Barlow_300Light_Italic',
                textAlign:"justify", 
                width:"90%"
            }}>Rester informé des dernières news des Casinos. Vous trouverez sur ce feed 
                les jackpots les plus intéressants, les tournois à venir, les événements exceptionnels
                et plus encore </Text>}
        <Text/>
        </View>

    </View>
  )
}

export default HeadCard