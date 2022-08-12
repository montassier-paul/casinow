import {View, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeadCard from './HeadCard'
import TrendCard from './TrendCard'
import { TrendsData } from '../../constants'




const TrendsFeed = ({context} : {context : boolean}) => {

    const [trendsData, setTrendsData] = useState(TrendsData);
    const ref = React.useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollToOffset({ animated: false, offset: 0 })
        }
    }, [context])


  return (
    <View>

        <View style={{ height: 70}}>
        </View>
        
        <FlatList
            ref={ref}
            data={trendsData}
            renderItem={({ item }) => <TrendCard data={item} />}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HeadCard context={context}/>}
            ListFooterComponent={<View style={{height:200}}/>}
          />
        



    </View>
  )
}

export default TrendsFeed