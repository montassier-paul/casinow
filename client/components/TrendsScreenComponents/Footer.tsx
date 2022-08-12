import { View, TouchableOpacity,  Image} from 'react-native'
import React, { SetStateAction, Dispatch }  from 'react'
import { COLORS } from '../../constants'




const Footer = ({ SetSelfFeed, selfFeed} : { SetSelfFeed : Dispatch<SetStateAction<boolean>> , selfFeed : boolean}) => {
  
    const handleOnPressTrends = () => {

        if(selfFeed === true)
            SetSelfFeed((prevselfFeed) => !prevselfFeed)
        
    
    }

    const handleOnPressSelf = () => {

        if(selfFeed === false)
            SetSelfFeed((prevselfFeed) => !prevselfFeed)
        
    
    }

  
    return (
    <View
    style={{
        position: "absolute",
        zIndex: 10,
        bottom:0, 
        backgroundColor: COLORS.BackgroundTwo, 
        width: "100%", 
        flexDirection:"row", 
        height:50, 
        justifyContent:"space-evenly"
        

    }}
    >
        <TouchableOpacity
        onPress={handleOnPressTrends}
        style={{ 
            // borderRadius:20, 
            borderColor: "#9C07D0",
            borderTopWidth:1, 
            width:"50%",
            backgroundColor: "#FFFFFF", 
        }}>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent:"center", 
                }}>
                    <Image
                        source={require("../../assets/icons8-fire-48.png")}
                        resizeMode="contain"
                        style={{ width: "80%", height: "80%", alignSelf:"center"}}
                        />

            </View>
            
        </TouchableOpacity>


        <TouchableOpacity
        onPress={handleOnPressSelf}
        style={{
            borderColor: "#9C07D0",
            // borderRadius:20, 
            borderTopWidth:1, 
            width:"50%", 
            backgroundColor: "#FFFFFF", 
        }}>

            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent:"center",
                    
                }}>
                    <Image
                        source={require("../../assets/icons8-news-feed-48.png")}
                        resizeMode="contain"
                        style={{ width: "80%", height: "80%", alignSelf:"center"}}
                        />

            </View>
        </TouchableOpacity>
      
    </View>
  )
}

export default Footer