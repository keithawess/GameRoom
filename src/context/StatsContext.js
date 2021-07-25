import React, { useState, createContext, useCallback, useEffect} from "react";
import useFetchDB from "../hooks/useFetchDB";

export const StatsContext = createContext(null);

export function StatsProvider(props){
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [ties, setTies] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [winRatio, setWinRatio] = useState(0);

    useEffect(()=>
    {
        if (gamesPlayed > 0)
        {
            setWinRatio(wins / gamesPlayed);
        }
    },[gamesPlayed, wins])


    return (<StatsContext.Provider value={{wins, losses, ties, gamesPlayed, winRatio}}>
        {props.children}
    </StatsContext.Provider>)
}