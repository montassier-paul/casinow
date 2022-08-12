import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CircleButton, DirectButton } from '../Button'
import { COLORS, FONT, SIZES } from '../../constants'
import { ServiceCard, GamesCard, HoursCard, TournamentCardById, EventCardById, TrendCardById, MachineCardById, TableCardById, FollowCard } from '../Cards'
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { addFollowings, removeFollowings } from '../../redux/userSlice'


interface props {
  data?: {
    _id: string,
    name: string,
    adresse: string,
    region?: string,
    departement?: string,
    ville?: string,
    machines?: number,
    tables?: number,
    restaurant?: boolean,
    parking?: boolean,
    betting?: boolean,
    poker?: boolean,
    hotel?: boolean,
    desc?: string,
    img?: string,
    tournamentsId: [string],
    tablesId: [string],
    trendsId: [string],
    eventsId: [string],
    machinesId: [string],
    hours: { day: string, opening: string, ending: string }[],
    games: { game: string, numbers: number }[],
    timestamps?: Date
  }

  setDisplayCasino: (input: boolean) => void,



}


interface followprops {
  clubId: string, 
  clubName: string, 
  clubAdresse: string, 
  purpose : string 

}


interface unfollowprops {
  clubId: string, 
  purpose : string 
  
}

const CasinoView = ({ data }: { data: props["data"] }) => {

  const [text, setText] = useState("")
  const [readMore, setReadMore] = useState(false);
  const userFollowings = useSelector((state: RootState) => state.user.followings)
  const dispatch = useDispatch()

  const handleFollow = ({ clubId, clubName, clubAdresse, purpose} : followprops) => {
    dispatch(addFollowings({ clubId, clubName, clubAdresse, purpose}))
  }

  const handleUnfollow = ({clubId, purpose} : unfollowprops) => {
    dispatch(removeFollowings({clubId, purpose}))

  }


  useEffect(() => {
    data?.desc && setText(data?.desc.slice(0, 100))
  }, [data])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        flex: 1,
      }}>


      {data?.name && <Text style={{
        width: "100%",
        fontFamily: FONT.Title,
        fontSize: SIZES.TilteSizeBig,
        letterSpacing: SIZES.TitleSpacing,
        textAlign: "center",
        color: COLORS.DarkPurple,
        marginVertical: 10

      }}>{data.name}</Text>}

      <View style={{
        width: "100%",
        height: 200,
        paddingHorizontal: 20,
        marginVertical: 10
      }}>
        <Image
          source={require("../../assets/Casino.jpg")}
          resizeMode="contain"
          style={{
            height: "100%", width: "100%", borderRadius: 10
          }} />

      </View>

      {data?.adresse && <Text style={{
        width: "100%",
        fontFamily: FONT.Text1,
        fontSize: SIZES.TextMiddle,
        color: COLORS.Black,
        paddingHorizontal: 15,
        marginVertical: 10

      }}>Adresse : {data.adresse}</Text>}


      {data?.desc &&
        <Text style={{
          width:"100%", 
          marginVertical:10, 
          fontFamily:FONT.Text1, 
          textAlign:"justify"
          
        }}>

          <Text>{text}</Text>
          {data.desc.length > 100 &&
            <>
              <Text>{!readMore && "..."}</Text>
              <Text
                style={{fontWeight : "bold"}}
                onPress={() => {
                  if (!readMore) {
                    setText(String(data.desc));
                    setReadMore(true);
                  } else {
                    setText(String(data.desc).slice(0, 100));
                    setReadMore(false);
                  }
                }}
              >
                {readMore ? " Show Less" : " Read More"}
              </Text>
            </>
          }
        </Text>

      }


      {data?.hours && <HoursCard data={{ hours: data.hours }} />}


      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />


      {data &&
        <View style={{
          width: "100%",
          marginVertical: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
        }}>
          <Text style={{
            fontFamily: FONT.Title,
            fontSize: SIZES.TextMiddle,
            marginBottom: 5,
            width: "100%",
            textAlign: "center"
          }}>Jeux et services proposés par l'établissement : </Text>

          {data.machines !== undefined &&
            <ServiceCard data={{
              text: String(data.machines) + " machines", textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.tables !== undefined &&
            <ServiceCard data={{
              text: String(data.tables) + " tables", textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.poker !== undefined &&
            <ServiceCard data={{
              text: "Poker", bool: data.poker, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.betting !== undefined &&
            <ServiceCard data={{
              text: "Paris Sportif", bool: data.betting, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.hotel !== undefined &&
            <ServiceCard data={{
              text: "Hôtel", bool: data.hotel, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.restaurant !== undefined &&
            <ServiceCard data={{
              text: "Restaurant", bool: data.restaurant, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}

          {data.parking !== undefined &&
            <ServiceCard data={{
              text: "Parking", bool: data.parking, textsize: SIZES.TextMiddle,
              dimension: 100
            }} />}



          {data.games && <GamesCard data={{ games: data.games }} />}






        </View>
      }

      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />


      <View style={{
        width: "100%",
      }}>
        <Text style={{
          fontFamily: FONT.Text2,
          alignSelf: "center"
        }}>Actualité du club</Text>

        {data?.tournamentsId.map((tournamentId, key) => {
          return <TournamentCardById id={tournamentId} key={key}/>
        })
        }

        {data?.eventsId.map((eventId, key) => {
          return <EventCardById id={eventId} key={key}/>
        })
        }

        {data?.trendsId.map((trendId, key) => {
          return <TrendCardById id={trendId} key={key}/>
        })
        }



      </View>


      <View style={{
        width: "50%",
        alignSelf: "center",
        paddingTop: 5,
        borderBottomWidth: 1
      }} />


      <View style={{
        width: "100%",
      }}>
        <Text style={{
          fontFamily: FONT.Text2,
          alignSelf: "center"
        }}>Suivre : </Text>


        
        {data?._id &&

        
        
        <>
        <FollowCard 
        data={{id : data._id, Name : data.name, adresse : data.adresse,purpose : 'direct', 
        text : "Suivre la casino", userfollowings : userFollowings}}
        handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>

        <Text style={{
          fontFamily: FONT.Text2,
          alignSelf: "center"
        }}>Recevoir une notification en cas de : </Text>

        <FollowCard 
        data={{id : data._id, Name : data.name, adresse : data.adresse,purpose : 'event', 
        text : "Evenements", userfollowings : userFollowings}}
        handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>

        <FollowCard 
        data={{id : data._id, Name : data.name, adresse : data.adresse,purpose : 'tournament', 
        text : "Tournois de poker", userfollowings : userFollowings}}
        handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>

        <FollowCard 
        data={{id : data._id, Name : data.name, adresse : data.adresse,purpose : 'jackpot', 
        text : "Jackpots Exceptionnels", userfollowings : userFollowings}}
        handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>

        </>
        }






      </View>


      <View style={{height:250}}/>




    </ScrollView>
  );
}


const DirectView = ({data} : {data : props["data"]}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        flex: 1,
      }}>
      <Text 
      style={{
          fontFamily:"Barlow_800ExtraBold", 
          fontSize:20, 
          width:"100%", 
          textAlign:"center"
      }}
      >LIVE</Text>
      

      {data?.machinesId.map((machineId, key) => {
        return <MachineCardById id={machineId} key={key}/>
      })}

      {data?.tablesId.map((tableId, key) => {
        return <TableCardById id={tableId} key={key}/>
      })}

    <View style={{height:250}}/>

      
  </ScrollView>

  )
}

const CasinoScreen = ({ data, setDisplayCasino }: props) => {

  const [direct, setDirect] = useState(false)
  const [inputText, setInputText] = useState("DIRECT")


  const handleQuitClick = () => {
    setDisplayCasino(false)

  }


  const handleDirectClick = () => {
    if (!direct) {
      setInputText("INFO")
    }
    else {
      setInputText("DIRECT")
    }
    setDirect(prev => !prev)
  }
  return (
    <View style={{

      height: "90%",
      padding: 10,
      flex: 1
    }}>

      {direct
        ? <DirectView data={data}/>
        : <CasinoView data={data} />

      }



      <CircleButton handlePress={handleQuitClick} img={require("../../assets/goBack.png")} />
      <DirectButton handlePress={handleDirectClick} input={inputText} />
    </View>
  )
}

export default CasinoScreen