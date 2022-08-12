import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { DirectData } from '../../constants'
import { COLORS } from '../../constants';

interface props {
    data : {
        name : string, 
        place : string,
        id: number, 
        game: string,
        jackpot: number, 
    }
}
const DirectCard = ({data} : props) => {
    return (

        <View 
        style={{
        marginHorizontal: 20, 
        height : 70, 
        backgroundColor : COLORS.BackgroundOne, 
        marginBottom:10, 
        borderRadius: 20,  
    }}>
         <View style={{
            height: "100%", 
            width:"100%", 
            flexDirection:"row", 
            justifyContent:"flex-start", 
            alignItems:"center", 

        }}>
            <Image
            source={require("../../assets/icons8-european-roulette-48.png")}
            resizeMode="contain"
            style={{height:"60%", width:"15%"}}
            />
            <View>
                <View style={{
                    height: "70%", 
                    width:"100%", 
                    flexDirection:"row", 
                    justifyContent:"flex-start", 
                    alignItems:"center",
                    paddingLeft: 10,  
                }}>
                
                <Text style={{}}>{data.game}</Text>
                <Text style={{marginLeft:10}}>{data.jackpot} €</Text>

                </View>

                <View style={{
                    height: "30%", 
                    width:"100%", 
                    flexDirection:"row", 
                    justifyContent:"flex-start", 
                    alignItems:"center",
                    paddingLeft: 10,  
                }}>

                    <Text style={{fontSize:10}}>{data.name},</Text>
                    <Text style={{marginLeft:10, 
                    fontSize:10}}>{data.place}</Text>


                </View>

            </View>
        </View>
        </View>

    );
}

const DirectMain = () => {
  return (
    <View style={{
        width:"100%", 
        height:"100%", 
        alignSelf:"center", 
        alignItems:"center", 
        paddingTop:30,
    }}>
        
  
        <FlatList
        data={DirectData}
        style={{marginTop:"10%", width:"100%"}}
        renderItem={({ item }) => <DirectCard data={item}/>}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text 
        style={{
            fontFamily:"Barlow_800ExtraBold", 
            letterSpacing:6, 
            fontSize:20, 
            textAlign:"center", 
            marginBottom:15, 
            marginTop:10
        }}>LIVE</Text>}
        ListFooterComponent={<View style={{height:50}}/>}
      />
    </View>
  )
}

export default DirectMain