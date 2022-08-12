import React from 'react'
import { View, Image, TextInput } from 'react-native'
import { COLORS, FONT, SIZES } from '../constants'


interface props {
    data: {
        text: string, 
        context : string
    }
    handleSearch: (value: string, context : string) => void,


}
export const Search = ({ data, handleSearch }: props) => {


    const handleInput = (input : string) => {
        handleSearch(input, data.context)
    }


    return (

        <View
            style={{
                width: "80%",
                height: 50,
                borderRadius: 20,
                backgroundColor: COLORS.LightPurple,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginVertical:7,
            }}
        >
            <Image
                source={require("../assets/icons8-search-60.png")}
                style={{ width: 20, height: 20 }}
            />
            <View style={{ width: 10 }} />

            <TextInput
                placeholder={data.text}
                onChangeText={handleInput}
                style={{ flex: 1, fontSize: SIZES.TextMiddle, fontFamily: FONT.Text2 }}
            />

        </View>


    )
}
