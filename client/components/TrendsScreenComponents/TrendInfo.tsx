import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants';
import { useState } from 'react';




export const CasinosInfo = ({name, localisation} : {name : String, localisation : String}) => {
    return (
        <View
        style={{
            width:"100%", 
            flexDirection:"row", 
            height: 50 ,
            justifyContent:'flex-start',
        }}>
            <View style={{
                width:"30%", 
            }}>
            <Image
              source={require("../../assets/icons8-casino-100.png")}
              resizeMode="contain"
              style={{height: "100%", alignSelf:"center"}}
            />
            </View>

            <Text style={{
                width: "70%",
                alignSelf:"center",
                textAlign:"justify", 
                fontFamily: 'Barlow_500Medium',

            }}> {name} , {localisation}</Text>

        </View>
    );
}

export const Description = ({description} : {description : String}) => {

    const [text, setText] = useState(description.slice(0, 100))
    const [readMore, setReadMore] = useState(false);

    return (
        <View
        style={{
            width:"100%", 
            paddingBottom:10,
        }}>
            <Text
            style={{
                fontFamily: 'Barlow_500Medium',
                textAlign:"justify"
            }}>

            <Text>{text}</Text>
            { description.length > 100 &&
            <>
            <Text>{!readMore  && "..."}</Text>
            <Text
              style={{}}
              onPress={() => {
                if (!readMore) {
                  setText(String(description));
                  setReadMore(true);
                } else {
                  setText(description.slice(0, 100));
                  setReadMore(false);
                }
              }}
            >
              {readMore ? " Show Less" : " Read More"}
            </Text>
            </>
            }
        </Text>
        </View>
    );
}

export const Horaire = ({date} : {date : String}) => {

    return (
    <View
    style={{
        width:"100%", 
        flexDirection:"row", 
        height: 50 ,
        justifyContent:'flex-start',
            }}>
        <View style={{
            width:"30%", 
        }}>
        <Image
          source={require("../../assets/icons8-date-65.png")}
          resizeMode="contain"
          style={{height: "80%", alignSelf:"center", marginTop:"10%"}}
        />
        </View>

        <Text style={{
            width: "70%",
            alignSelf:"center",
            textAlign:"justify", 
            fontFamily: 'Barlow_500Medium',

        }}> Date : {date}</Text>

    </View>

    )

}

export const Jackpot = ({jackpot} : { jackpot : Number} ) => {

    return (
        <View
        style={{
            width:"100%", 
            flexDirection:"row", 
            height: 50 ,
            justifyContent:'flex-start',
                }}>
            <View style={{
                width:"30%", 
            }}>
            <Image
              source={require("../../assets/icons8-chip-48.png")}
              resizeMode="contain"
              style={{height: "80%", alignSelf:"center", marginTop:"10%"}}
            />
            </View>
    
            <Text style={{
                width: "70%",
                alignSelf:"center",
                textAlign:"justify", 
                fontFamily: 'Barlow_500Medium',
    
            }}> Jackpot : {jackpot}</Text>
    
        </View>
    
        )

}

export const Blind = ({blind} : { blind : Number} ) => {

    return (
        <View
        style={{
            width:"100%", 
            flexDirection:"row", 
            height: 50 ,
            justifyContent:'flex-start',
                }}>
            <View style={{
                width:"30%", 
            }}>
            <Image
              source={require("../../assets/icons8-chip-48.png")}
              resizeMode="contain"
              style={{height: "80%", alignSelf:"center", marginTop:"10%"}}
            />
            </View>
    
            <Text style={{
                width: "70%",
                alignSelf:"center",
                textAlign:"justify", 
                fontFamily: 'Barlow_500Medium',
    
            }}> Blind : {blind}</Text>
    
        </View>
    
        )

}

export const Jeu = ({jeu} : {jeu : String}) => {

    return (
        <View
        style={{
            width:"100%", 
            flexDirection:"row", 
            height: 50 ,
            justifyContent:'flex-start',
                }}>
            <View style={{
                width:"30%", 
            }}>
            <Image
              source={require("../../assets/icons8-poker-53.png")}
              resizeMode="contain"
              style={{height: "80%", alignSelf:"center", marginTop:"10%"}}
            />
            </View>
    
            <Text style={{
                width: "70%",
                alignSelf:"center",
                textAlign:"justify", 
                fontFamily: 'Barlow_500Medium',
    
            }}> Jeu : {jeu}</Text>
    
        </View>
    
        )

}


export const Machine = ({machine} : {machine : String}) => {

    return (
        <View
        style={{
            width:"100%", 
            flexDirection:"row", 
            height: 50 ,
            justifyContent:'flex-start',
                }}>
            <View style={{
                width:"30%", 
            }}>
            <Image
              source={require("../../assets/icons8-slot-64.png")}
              resizeMode="contain"
              style={{height: "80%", alignSelf:"center", marginTop:"10%"}}
            />
            </View>
    
            <Text style={{
                width: "70%",
                alignSelf:"center",
                textAlign:"justify", 
                fontFamily: 'Barlow_500Medium',
    
            }}> Machine : {machine}</Text>
    
        </View>
    
        )

}

const TrendInfo = ({data} : { data : {salle:String, localisation:String, 
description:String, jeu:String, blind:Number, jackpot:Number, date:String, machine : String
}}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor:COLORS.BackgroundTwo, 
        borderBottomRightRadius: 20, 
        borderBottomLeftRadius: 20, 
        paddingHorizontal: 10,
        paddingTop: 2
      }}
    >  

      {data.salle && <CasinosInfo name={data.salle} localisation={data.localisation}/>}
      {data.date && <Horaire date={data.date}/>}
      {data.jackpot && <Jackpot jackpot={data.jackpot}/>}
      {data.blind && <Blind blind={data.blind}/>}
      {data.jeu && <Jeu jeu={data.jeu}/>}
      {data.machine && <Machine machine={data.machine}/>}
      {data.description && <Description description={data.description}/>}

    </View>
  )
}

export default TrendInfo