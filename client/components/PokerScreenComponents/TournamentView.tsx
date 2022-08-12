import { View, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { CircleButton } from '../Button'
import { Search } from '../Search'
import { Picker } from "@react-native-picker/picker";
import axios from 'axios'
import { propsTournament } from '../interface'
import { TournamentCard } from '../Cards'




const TournamentView = ({ handleQuitClick, state }: { handleQuitClick: () => void, state: string }) => {

    const dates = {
        regular: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        exceptionnel: ["january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december"]
    }

    const [date, setDate] = useState('Unknown')
    const [tournamentData, setTournamentData] = useState<propsTournament[]>()

    const handleSearch = (value: string, context: string) => {

    }

    async function getTournament() {
        try {
          const response = await axios.get('https://casinow.herokuapp.com/api/tournaments/full/');
          setTournamentData(response.data.data)
        }
        catch (error) {
          // console.log(error);
        }
      }
    
    
      useEffect(() => {
        let abortController = new AbortController(); 
        getTournament();
        abortController.abort()
      }, []);
    




    return (
        <View style={{
            height: "90%",
            padding: 10,
        }}>

        <FlatList
          data={tournamentData}
          renderItem={({ item }) =><TournamentCard data={item} />}
          keyExtractor={(item: propsTournament) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
            style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 5,
            }}>
            <Search data={{ text: "Search for a casino or a place", context: "place" }} handleSearch={handleSearch} />

            <Picker
                selectedValue={date}
                onValueChange={(value, index) => setDate(value)}
                mode="dropdown" // Android only
                style={{width:"80%",
                    alignSelf:"center",
                    marginTop:10}}
                >   
                    <Picker.Item label="Select a date" value="Unknown" />

                    {
                    state==="regular" 
                    ?dates.regular.map((date, key) => {
                        return <Picker.Item label={date} value={date} key={key}/>
                    })
                    :dates.exceptionnel.map((date, key) => {
                        return <Picker.Item label={date} value={date} key={key}/>
                    })
                    
                    }
                
            </Picker>

        </View>
          }
          ListFooterComponent={<View style={{ height: 200 }} />}
        />

           

            <CircleButton handlePress={handleQuitClick} img={require("../../assets/goBack.png")} />
        </View>
    )
}

export default TournamentView