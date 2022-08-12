import { View, FlatList, Text, Image } from 'react-native'
import React, {useState} from 'react'
import { GamesData2 } from '../../constants'
import GamesHeaderSearch from './GamesHeaderSearch'
import { COLORS } from '../../constants';

interface props {
    data : {
        game : string,
        name: string, 
        region :string,
        blind?: number,
        jackpot? : number,
        id : number, 
    }
}
const GameCard = ({data} : props) => {
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
                {data.jackpot && <Text style={{marginLeft:10}}>{data.jackpot} €</Text>}
                {data.blind && <Text style={{marginLeft:10}}>{data.blind} €</Text>}

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
                    <Text style={{marginLeft:10, fontSize:10}}>{data.region}</Text>


                </View>

            </View>
        </View>
        </View>

    );
}


const GamesMain = () => {

  const [gamesData, setGamesData] = useState(GamesData2)
  const [gamesData1, setGamesData1] = useState(GamesData2)
  const [gamesData2, setGamesData2] = useState(GamesData2)
  const [valueGame, SetValueGame] = useState("")
  const [valuePlace, SetValuePlace] = useState("")


    
  const handleCasinoSearch = (value : String) => {
    SetValuePlace(String(value))

    if (value.length === 0) {

        setGamesData1(GamesData2); 

      if(GamesData2.length === gamesData2.length) {
        setGamesData(GamesData2);
      }
      else {
        setGamesData(gamesData2);
        handleGameSearch(valueGame); 
      }
      
    }

    else {

    const filteredData = gamesData2.filter((item) =>
      (item.region.toLowerCase().includes(value.toLowerCase()) ||
      item.name.toLowerCase().includes(value.toLowerCase()))
      
    );

    if (filteredData.length === 0) {
        setGamesData([]);

    } else {
        setGamesData(filteredData);
        setGamesData1(filteredData); 

    }


  }

};

  const handleGameSearch = (value : String) => {
    SetValueGame(String(value))

    if (value.length === 0) {

        setGamesData2(GamesData2); 
      if(GamesData2.length === gamesData1.length) {
        setGamesData(GamesData2);
      }
      else {
        setGamesData(gamesData1);
        handleCasinoSearch(valuePlace); 
      }
      
    }

    else {
    const filteredData = gamesData1.filter((item) =>
        item.game.toLowerCase().includes(value.toLowerCase())
    )
    
    



    if (filteredData.length === 0) {
        setGamesData([]);

    } else {
        setGamesData(filteredData);
        setGamesData2(filteredData); 

    }


  }
    
  };

  return (
    <View>
      <View style={{height:70}}/>
      <View style={{
            width:"100%", 
            height: "100%", 
        }}>
            <FlatList
            data={gamesData}
            renderItem={({ item }) => <GameCard data={item}/>}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<GamesHeaderSearch  handleCasinoSearch={handleCasinoSearch} handleGameSearch={handleGameSearch}/>}
            ListFooterComponent={<View style={{height:200}}/>}
        />
        </View>
    </View>
  )
}

export default GamesMain