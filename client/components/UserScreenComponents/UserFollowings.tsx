import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { UserFollowingsCard } from '../Cards'
import type { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { removeFollowings } from '../../redux/userSlice'





interface unfollowprops {
    clubId: string, 
    purpose : string 
    
  }


const UserFollowings = () => {

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()




    const handleUnfollow = ({clubId, purpose} : unfollowprops) => {
        dispatch(removeFollowings({clubId, purpose}))
    
      }


    return (
        <View style={{
            width: "80%",
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 10,
            height: 250,

        }}>
            <FlatList
                data={user.followings}
                renderItem={({ item }) => <UserFollowingsCard data={item} handleUnfollow={handleUnfollow} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={{
                    alignSelf: 'center', marginTop: 5
                }}> Vous suivez actuellement : </Text>}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />
        </View>
    )
}

export default UserFollowings