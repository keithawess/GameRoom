import React, { useState, createContext, useCallback, useEffect} from "react";
import useFetchDB from "../hooks/useFetchDB";

export const StatsContext = createContext(null);

export function StatsProvider(props){
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [ties, setTies] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [winRatio, setWinRatio] = useState(0);

    const { callAPI: winsCall } = useFetchDB("PATCH");
    const { callAPI: lossesCall } = useFetchDB("PATCH");
    const { callAPI: tiesCall } = useFetchDB("PATCH");
    const { callAPI: statsCall } = useFetchDB("GET");

    const addWin = useCallback((userId) => {
        console.log("Ping")
        async function fetchData() {
          const res = await winsCall("/api/stats/win", {userId: userId});
          if (res.success) {
              setWins(wins + 1);
              setGamesPlayed(gamesPlayed + 1);
          }
        }
        fetchData();
      }, []);

    useEffect(()=>
    {
        if (gamesPlayed > 0)
        {
            setWinRatio(wins / gamesPlayed);
        }
    },[gamesPlayed, wins]);


    return (<StatsContext.Provider value={{wins, losses, ties, gamesPlayed, winRatio, addWin}}>
        {props.children}
    </StatsContext.Provider>)
}