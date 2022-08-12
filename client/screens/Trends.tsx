import { SafeAreaView} from 'react-native'
import React, { useState }  from 'react'
import { FocusedStatusBar, Header, Footer, TrendsFeed } from '../components'

const Trends = () => {

  const [selfFeed, SetSelfFeed] = useState(true)

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#FFFF" }}>
      <FocusedStatusBar/>
      <Header/>
      <TrendsFeed context={selfFeed}/>
      <Footer SetSelfFeed={SetSelfFeed} selfFeed={selfFeed}/>
    </SafeAreaView>
  )
}

export default Trends