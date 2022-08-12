import { SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, HomeMenuCard } from '../components';
import { COLORS } from '../constants';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FocusedStatusBar />
      <Header />
      <View style={{ height: 70 }}>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}>

        {/* Direct */}
        <HomeMenuCard
          data={{
            img: require("../assets/DirectCover.jpg"),
            title: "Direct",
            bottom: 20,
            navigationPage: "Direct"
          }} />

        {/* Trends */}
        {/* <HomeMenuCard
          data={{
            img: require("../assets/TrendsCover.jpg"),
            title: "Trends",
            right: 200,
            color: COLORS.Black,
            navigationPage: "Trends"
          }} /> */}

        {/* Casino & Clubs */}
        <HomeMenuCard
          data={{
            img: require("../assets/CasinosClubsCover.jpg"),
            title: "Casinos & Clubs",
            right: 50,
            bottom: 20,
            navigationPage: "Casinos"
          }} />

        {/* GameCard */}
        <HomeMenuCard
          data={{
            img: require("../assets/GamesCover.jpg"),
            title: "Jeux",
            right: 50,
            bottom: 100,
            navigationPage: "Games"
          }} />

        {/* PokerCard */}
        <HomeMenuCard
          data={{
            img: require("../assets/PokerCover.jpg"),
            title: "Tournois",
            right: 180,
            bottom: 80,
            navigationPage: "Poker"
          }} />

        {/* EventsCard */}
        <HomeMenuCard
          data={{
            img: require("../assets/EventsCover.jpg"),
            title: "Evenements",
            navigationPage: "Events"
          }} />

        {/* Learn2Play */}
        <HomeMenuCard
          data={{
            img: require("../assets/LearnCover.jpg"),
            title: "Apprendre",
            bottom: 10,
            navigationPage: "Learn"
          }} />

        {/* User */}
        <HomeMenuCard
          data={{
            img: require("../assets/UserCover.jpg"),
            title: "User",
            bottom: 100,
            right: 20,
            navigationPage: "User"
          }} />

        {/* Settings */}
        <HomeMenuCard
          data={{
            img: require("../assets/SettingsCover.jpg"),
            title: "Settings",
            bottom: 20,
            navigationPage: "Settings"
          }} />

      </ScrollView>

    </SafeAreaView>
  )
}




export default Home