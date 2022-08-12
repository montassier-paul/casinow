import { View, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Picker } from "@react-native-picker/picker";
import axios from 'axios';
import { propsEvent } from '../interface';
import { Search } from '../Search';
import { EventCard } from '../Cards';


const EventMain = () => {


    const dates = ["january", "february", "march", "april", "may", "june", "july",
            "august", "september", "october", "november", "december"]


    const [date, setDate] = useState('Unknown')

    const [tournamentData, setTournamentData] = useState<propsEvent[]>()


    const handleSearch = (value: string, context: string) => {

    }

    async function getTournament() {
        try {
          const response = await axios.get('https://casinow.herokuapp.com/api/evenements/full/');
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
    <View>
      <View style={{height:70}}/>

      <View style={{
            height: "90%",
            padding: 10,
        }}>

        <FlatList
          data={tournamentData}
          renderItem={({ item }) =><EventCard data={item} />}
          keyExtractor={(item: propsEvent) => item._id}
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

                    {dates.map((date, key) => {
                        return <Picker.Item label={date} value={date} key={key}/>
                    })
                    }
                
            </Picker>

        </View>
          }
          ListFooterComponent={<View style={{ height: 200 }} />}
        />

           
        </View>

      
       

        
           
    </View>
  )
}

export default EventMain