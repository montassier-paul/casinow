import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT } from '../../constants'
import { UserInfoCard } from '../Cards'
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserInfo, resetTelNumber, resetfamilyName, resetfirstName } from '../../redux/userSlice'






const UserForm = () => {

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [telNumber, setTelNumber] = useState("")
    const [smsBool, setSmsBool] = useState(user.smsBool)

    const handleCheckBox = () => {
        setSmsBool(prev => !prev)
    }


    const handleUpdate = () => {

        const newUserData = {
            firstName: firstName.length !== 0 ? firstName : user.firstName,
            familyName: familyName.length !== 0 ? familyName : user.familyName,
            telNumber: telNumber.length !== 0 ? telNumber : user.telNumber,
            smsBool: smsBool
        }

        dispatch(updateUserInfo(newUserData))
        setFirstName("")
        setFamilyName("")
        setTelNumber("")
    }

    const handleRemove = (context: String) => {
        switch (context) {
            case 'FirstName':
                dispatch(resetfirstName())
                break;
            case "Telephone":
                dispatch(resetTelNumber())
                break;

            case "FamilyName":
                dispatch(resetfamilyName())
                break;

            default:

        }
    }

    return (
        <View style={{
            width: "100%",
            margin: 5,

        }}>
            <Text style={{
                alignSelf: "center",
                fontFamily: FONT.TitleBold,
                marginTop: 10,

            }}>INFORMATIONS UTILISATEURS</Text>

            <View style={{
                width: "80%",
                alignSelf: "center"
            }}>

                {user.firstName.length !== 0 && <UserInfoCard data={{ input: user.firstName, context: "FirstName" }} handleRemove={handleRemove} />}
                {user.familyName.length !== 0 && <UserInfoCard data={{ input: user.familyName, context: "FamilyName" }} handleRemove={handleRemove} />}
                {user.telNumber.length !== 0 && <UserInfoCard data={{ input: user.telNumber, context: "Telephone" }} handleRemove={handleRemove} />}




                <TextInput
                    onChangeText={setFirstName}
                    value={firstName}
                    maxLength={20}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 10,
                        paddingHorizontal: 5,


                    }}
                    placeholder="First Name" />

                <TextInput
                    onChangeText={setFamilyName}
                    value={familyName}
                    maxLength={20}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 10,
                        paddingHorizontal: 5

                    }}
                    placeholder="Family Name" />


                <TextInput
                    onChangeText={setTelNumber}
                    keyboardType={'numeric'}
                    maxLength={10}
                    value={telNumber}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 10,
                        paddingHorizontal: 5

                    }}
                    placeholder="Tel" />


                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    marginTop: 10,
                }}>
                    <Text style={{ fontFamily: FONT.Text1, width: "80%" }}>
                        Voulez-vous recevoir les jackpots exceptionnels par sms ?
                    </Text>

                    <View style={{ width: "20%", flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity
                            onPress={handleCheckBox}
                            style={{
                                height: 20,
                                width: 20,
                                borderWidth: 2,
                                borderRadius: 5,
                                marginTop: 10,
                                backgroundColor: smsBool ? COLORS.Green : COLORS.White,

                            }}>

                        </TouchableOpacity>

                    </View>

                </View>


                <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                        alignSelf: "center",
                        marginTop: 15,
                        height: 30,
                        width: 80,
                        borderRadius: 10,
                        borderWidth: 1,
                        backgroundColor: COLORS.LightPurpleTransparent,
                        borderColor: COLORS.DarkPurple,
                        paddingTop: 5
                    }}>
                    <Text style={{
                        alignSelf: "center",
                        fontFamily: FONT.TitleBold
                    }}>Update</Text>
                </TouchableOpacity>

            </View>


        </View >
    )
}

export default UserForm