import React, { useState, createContext, useCallback, useEffect } from "react";
import useFetchDB from "../hooks/useFetchDB";

export const StatsContext = createContext(null);

export function StatsProvider(props) {
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
    async function fetchData() {
      const res = await winsCall("/api/stats/win", { userId: userId });
      if (res.success) {
        setWins((wins) => wins + 1);
        setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
      }
    }
    fetchData();
  }, []);

  const addLoss = useCallback((userId) => {
    async function fetchData() {
      const res = await lossesCall("/api/stats/loss", { userId: userId });
      if (res.success) {
        setLosses((losses) => losses + 1);
        setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
      }
    }
    fetchData();
  }, []);

  const addTie = useCallback((userId) => {
    async function fetchData() {
      const res = await tiesCall("/api/stats/tie", { userId: userId });
      if (res.success) {
        setTies((ties) => ties + 1);
        setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
      }
    }
    fetchData();
  }, []);

  const getStats = useCallback((userId) => {
    async function fetchData() {
      const res = await statsCall(`/api/stats/user/${userId}`);
      if (res.success) {
        setWins(res.data.wins);
        setLosses(res.data.losses);
        setTies(res.data.ties);
        setGamesPlayed(res.data.games_played);
      }
    }
    fetchData();
  });

  useEffect(() => {
    if (gamesPlayed > 0) {
      setWinRatio((wins / gamesPlayed).toFixed(2));
    }
  }, [gamesPlayed, wins]);

  return (
    <StatsContext.Provider
      value={{
        wins,
        losses,
        ties,
        gamesPlayed,
        winRatio,
        addWin,
        addLoss,
        addTie,
        getStats,
      }}
    >
      {props.children}
    </StatsContext.Provider>
  );
}
