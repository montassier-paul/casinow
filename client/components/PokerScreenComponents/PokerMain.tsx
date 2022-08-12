import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../../constants'
import TournamentView from './TournamentView'


const PokerMain = () => {


  enum Status {
    Regular = "regular",
    Exceptionnel = "exptionnel",
    Menu = "menu",
  }
  const [pokerState, setPokerState] = useState<Status>(Status.Menu)


  const RegularOnPress = () => {
    setPokerState(Status.Regular); 

  }

  const EventsOnPress = () => {
    setPokerState(Status.Exceptionnel);  

  }

  const handleQuitClick = () => {
    setPokerState(Status.Menu); 
  }
  
  return (
    <View>
      <View style={{height:70}}/>

      {pokerState === Status.Menu

      ?<View style={{
        width:"100%",
        height:"100%",
        alignItems:"center"}}>
        <Text style={{
            marginTop: 10, 
            fontFamily:"Barlow_700Bold", 
            fontSize:18, 
            letterSpacing:3
            
        }}>Tournois de Poker</Text>
        <TouchableOpacity 
        onPress={RegularOnPress}
        style={
            {marginTop: 20, 
            width:"80%", 
            height: 200, 
            borderRadius: 20,  
            backgroundColor:COLORS.BackgroundTwo,
            justifyContent:"center"}}>
                <Text style={{
                    width:"100%", 
                    textAlign:"center", 
                    fontFamily:"Barlow_700Bold", 
                    fontSize:18, 
                    letterSpacing:3
                }}>Tournois Regulier</Text>

        </TouchableOpacity>

        <TouchableOpacity 
        onPress={EventsOnPress}
        style={
            {marginTop: 20, 
            width:"80%", 
            height: 200, 
            borderRadius: 20,  
            backgroundColor:COLORS.BackgroundTwo, 
            justifyContent:"center"}}>
                <Text style={{
                    width:"100%", 
                    textAlign:"center", 
                    fontFamily:"Barlow_700Bold", 
                    fontSize:18, 
                    letterSpacing:3
                }}>Tournois exceptionnel</Text>
            
        </TouchableOpacity>


      </View>

      :<TournamentView handleQuitClick={handleQuitClick} state={pokerState}/>}
    </View>
  )
}

export default PokerMain