import { View, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import CasinoScreen from './CasinoScreen'
import axios from 'axios'
import { CasinoCard } from '../Cards'
import { Search } from '../Search'
import { propsCasino } from '../interface'



const CasinosMain = () => {



  const [casinosData, setCasinosData] = useState<propsCasino[]>([]);
  const [casino, setCasino] = useState<propsCasino>()
  const [casinosDataFiltered, setCasinosDataFiltered] = useState<propsCasino[]>([])
  const [serviceSearch, setServiceSearch] = useState('')
  const [placeSearch, setPlaceSearch] = useState('')
  const [displayCasino, setDisplayCasino] = useState(false)
  const [casinoId, setCasinoId] = useState("")


  async function getCasinos() {
    try {
      const response = await axios.get('https://casinow.herokuapp.com/api/casinos/full/');
      setCasinosData(response.data.data)
    }
    catch (error) {
      // console.log(error);
    }
  }


  useEffect(() => {
    let abortController = new AbortController(); 
    getCasinos();
    abortController.abort()
  }, []);


  useEffect(() => {
    setCasinosDataFiltered(casinosData)
  }, [casinosData])


  useEffect(() => {

    const data = casinosData.filter((casinoData) => casinoData._id === casinoId)
    data.length ===1 && setCasino(data[0])

  }, [casinoId])


  const handleSearch = (value: string, context: string) => {

    if (context === "service") {
      setServiceSearch(value)

      if (value.length === 0 && placeSearch.length === 0) {
        setCasinosDataFiltered(casinosData)
      }
      else {
        let filteredData = casinosData.filter((casinoData) =>
          (
            casinoData.adresse.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.departement?.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.name.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.region?.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.ville?.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase())
          ) &&
          (
            "poker".includes(value.toLocaleLowerCase()) && casinoData.poker ||
            "restaurant".includes(value.toLocaleLowerCase()) && casinoData.restaurant ||
            "parking".includes(value.toLocaleLowerCase()) && casinoData.parking ||
            "hôtel".includes(value.toLocaleLowerCase()) && casinoData.hotel ||
            "hotel".includes(value.toLocaleLowerCase()) && casinoData.hotel ||
            "paris sportif".includes(value.toLocaleLowerCase()) && casinoData.betting ||

            (casinoData.games.length > 0 ?

              casinoData.games.filter((game) => {

                if (game.game.toLocaleLowerCase().includes(serviceSearch.toLocaleLowerCase()) &&
                  game.numbers > 0) {
                  return true
                }
                else {
                  return false
                }
              }).length > 0
              : false)







          )

        )




        if (filteredData.length === 0) {
          setCasinosDataFiltered([])
        } else {
          setCasinosDataFiltered(filteredData)
        }


      }




    }
    if (context === "place") {

      setPlaceSearch(value)

      if (value.length === 0 && serviceSearch.length === 0) {
        setCasinosDataFiltered(casinosData)
      }
      else {

        let filteredData = casinosData.filter((casinoData) =>

          (
            casinoData.adresse.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.departement?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.region?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.ville?.toLocaleLowerCase().includes(value.toLocaleLowerCase())

          )

          &&

          (serviceSearch.length > 0
            ?
            "poker".includes(serviceSearch.toLocaleLowerCase()) && casinoData.poker ||
            "restaurant".includes(serviceSearch.toLocaleLowerCase()) && casinoData.restaurant ||
            "parking".includes(serviceSearch.toLocaleLowerCase()) && casinoData.parking ||
            "hôtel".includes(serviceSearch.toLocaleLowerCase()) && casinoData.hotel ||
            "hotel".includes(serviceSearch.toLocaleLowerCase()) && casinoData.hotel ||
            "paris sportif".includes(serviceSearch.toLocaleLowerCase()) && casinoData.betting ||

            (casinoData.games.length > 0 ?

              casinoData.games.filter((game) => {

                if (game.game.toLocaleLowerCase().includes(serviceSearch.toLocaleLowerCase()) &&
                  game.numbers > 0) {
                  return true
                }
                else {
                  return false
                }
              }).length > 0
              : false)

            : true
          )

        )




        if (filteredData.length === 0) {
          setCasinosDataFiltered([])
        } else {
          setCasinosDataFiltered(filteredData)
        }


      }
    }

  }



  return (
    <View style={{
      height: "100%"
    }}>

      <View style={{ height: 70 }}>
      </View>


      {!displayCasino
        ? <FlatList
          data={casinosDataFiltered}
          renderItem={({ item }) => <CasinoCard data={item} setCasinoId={setCasinoId} setDisplayCasino={setDisplayCasino} />}
          keyExtractor={(item: propsCasino) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 5,
              }}>
              <Search data={{ text: "Search for a casino or a place", context: "place" }} handleSearch={handleSearch} />
              <View />
              <Search data={{ text: "Search for a Game or a service", context: "service" }} handleSearch={handleSearch} />

            </View>
          }
          ListFooterComponent={<View style={{ height: 200 }} />}
        />

        : <CasinoScreen data={casino} setDisplayCasino={setDisplayCasino} />

      }
    </View>
  )
}

export default CasinosMain