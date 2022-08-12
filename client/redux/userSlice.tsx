import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
    firstName: string,
    familyName: string,
    telNumber: string,
    smsBool: boolean,


    followings: {
        clubId : string, 
        clubName : string, 
        clubAdresse : string, 
        purpose : string
    }[]

}

const initialState: userState = {
    firstName: "Pierre",
    familyName: "Montassier",
    telNumber: "0651643417",
    smsBool: false,
    followings: []
}



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<{ firstName: string, familyName: string, telNumber: string, smsBool: boolean }>) => {

            if (action.payload.firstName !== state.firstName) {
                state.firstName = action.payload.firstName
            }
            if (action.payload.familyName !== state.familyName) {
                state.familyName = action.payload.familyName
            }
            if (action.payload.telNumber !== state.telNumber) {
                state.telNumber = action.payload.telNumber
            }
            if (state.smsBool !== action.payload.smsBool) {
                state.smsBool = action.payload.smsBool
            }



        },

        addFollowings: (state, action: PayloadAction<{ clubId: string, clubName: string, clubAdresse: string, purpose : string }>) => {

            state.followings.push({ clubId: action.payload.clubId, clubName: action.payload.clubName, clubAdresse: action.payload.clubAdresse, purpose : action.payload.purpose })

        },

        removeFollowings: (state, action: PayloadAction<{ clubId: string, purpose : string }>) => {

            state.followings = state.followings.filter((follow) =>
                follow.clubId !== action.payload.clubId|| follow.purpose !== action.payload.purpose)



        },
        resetfirstName: (state) => {
            state.firstName = ""

        },
        resetfamilyName: (state) => {
            state.familyName = ""

        },
        resetTelNumber: (state) => {
            state.telNumber = ""

        },
        resetSmsBool: (state) => {
            state.smsBool = false

        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUserInfo, resetSmsBool, resetTelNumber, resetfamilyName, resetfirstName, removeFollowings, addFollowings } = userSlice.actions

export default userSlice.reducer