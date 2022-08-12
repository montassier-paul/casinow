
import { ImageSourcePropType } from 'react-native'
import { RootStackParamList } from "../screens";

export interface propsHomeMenuCard {
    data: {
        img: ImageSourcePropType,
        title: string,
        right?: number,
        bottom?: number,
        color?: string,
        navigationPage: keyof RootStackParamList
    }
}

export interface propsUserInfoCard {
    data: { input: string, context: string }
    handleRemove: (input: string) => void,

}

export interface propsCasino {
    _id: string,
    name: string,
    adresse: string,
    region?: string,
    departement?: string,
    ville?: string,
    machines?: number,
    tables?: number,
    restaurant?: boolean,
    parking?: boolean,
    betting?: boolean,
    poker?: boolean,
    hotel?: boolean,
    desc?: string,
    img?: string,
    tournamentsId: [string],
    tablesId: [string],
    trendsId: [string],
    eventsId: [string],
    machinesId: [string],
    hours: { day: string, opening: string, ending: string }[],
    games: { game: string, numbers: number }[],
    timestamps?: Date
  }

export interface propsCasinosCard {
    data: {
        _id: string,
        name: string,
        adresse: string,
        region?: string,
        departement?: string,
        ville?: string,
        machines?: number,
        tables?: number,
        restaurant?: boolean,
        parking?: boolean,
        betting?: boolean,
        poker?: boolean,
        hotel?: boolean,
        desc?: string,
        img?: string,
        hours: { day: string, opening: string, ending: string }[]
    },

    setDisplayCasino: (input: boolean) => void,

    setCasinoId: (_id: string) => void,

}

export interface propsServiceCard {
    data: {
        img?: ImageSourcePropType,
        text: string,
        bool?: boolean,
        textsize?: number,
        dimension?: number
    }
}

export interface propsHoursCard {
    data: { hours: { day: string, opening: string, ending: string }[] }
}

export interface propsFollowCard {
    data: {

        id: string,
        Name: string,
        adresse: string,
        purpose: string,
        text: string,
        userfollowings: {
            clubId: string;
            clubName: string;
            clubAdresse: string;
            purpose: string;
        }[]


    },

    handleFollow: ({ clubId, clubName, clubAdresse, purpose }: {
        clubId: string, clubName: string,
        clubAdresse: string, purpose: string
    }) => void
    handleUnfollow: ({ clubId, purpose }: { clubId: string, purpose: string }) => void
}

export interface propsUserFollowingsCard {

    data: {
        clubId: string;
        clubName: string;
        clubAdresse: string;
        purpose: string;
    }
    handleUnfollow: ({ clubId, purpose }: { clubId: string, purpose: string }) => void
}

export interface propsGamesCard {
    data: {
        games: { game: string, numbers: number }[]
    }
}

export interface propsEvent {
    desc?: string,
    title: string,
    _id:string,
    img?: string,
    casinoId: string,
    date: string,
    opening?: string,
    ending?: string,
}

export interface propsEventCard {

    data : {
        desc?: string,
        title: string,
        _id:string,
        img?: string,
        casinoId: string,
        date: string,
        opening?: string,
        ending?: string,
    }

}

export interface propsMachine {

    casinoId: string,
    jackpot: number,
    _id:string,
    game: string,

}

export interface propsTable {
    casinoId: string,
    open: boolean,
    game: string,

}


export interface propsTournament {

    desc?: string,
    title: string,
    _id:string,
    img?: string,
    type: string,
    blind?: number,
    casinoId: string,
    date: string,
    opening?: string,
    ending?: string,

}

export interface propsTournamentCard {
    data : {
        desc?: string,
        title: string,
        _id:string,
        img?: string,
        type: string,
        blind?: number,
        casinoId: string,
        date: string,
        opening?: string,
        ending?: string,
    }
}


export interface propsTrend {

    desc?: string,
    img?: string,
    date?: string,
    title: string,
    casinoId: string,


}
