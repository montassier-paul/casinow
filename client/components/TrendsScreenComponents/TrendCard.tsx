import { View, Text, Image } from 'react-native'
import React from 'react'
import TrendInfo from './TrendInfo'

const TrendCard = ({data} : { data : {salle:String, localisation:String, 
  description:String, jeu:String, blind:Number, jackpot:Number, date:String, machine:String
  }}) => {

  let imagePath = {
    Tournoi : require("../../assets/TournoiTrendCover.jpg"),
    Machine : require("../../assets/MachineTrendCover.jpg"),
    Table : require("../../assets/TableTrendCover.jpg"),
    Event : require("../../assets/EventTrendCover.jpg"),
  }
  return (
    <View
    style={{
      margin: 20,

    }}>
      
      <View
      style={{
        width: "100%",
        height: 200,
        justifyContent:"center", 
      }}>
        <Image
              source={imagePath[data.type]}
              resizeMode="contain"
              style={{ width: "100%", height: "100%", borderTopLeftRadius: 30, 
              borderTopRightRadius: 30}}
            />
      </View>
      <TrendInfo data={data}/>
    </View>
  )
}

export default TrendCard