import { SafeAreaView} from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, LearnFeed  } from '../components'

const Learn = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#FFFF" }}>
      <FocusedStatusBar/>
      <Header/>
      <LearnFeed/>

    </SafeAreaView>
  )
}

export default Learn