import React, { useState, createContext, useCallback, useEffect, useContext } from "react";
import useFetchDB from "../hooks/useFetchDB";
import { StatsContext } from ".";

export const UserContext = createContext(null);

export function UserProvider(props) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [level, setLevel] = useState(0);
  const [experience, setExperience] = useState(0);

  const { getStats } = useContext(StatsContext)

  const { callAPI: levelCall } = useFetchDB("PATCH");
  const { callAPI: expCall } = useFetchDB("PATCH");
  const { callAPI: logoutCall } = useFetchDB("GET");
  const { callAPI: validateCall } = useFetchDB("GET");

  const login = useCallback((user) => {
    setUsername(user.username);
    setLevel(user.level);
    setExperience(user.experience);
    setUserId(user.id);
    getStats(user.id)
  }, []);

  const logout = useCallback(() => {
    async function fetchData() {
      const res = await logoutCall("/api/users/logout");
      if (res.success) {
        setUserId("");
        setUsername("");
        setLevel(0);
        setExperience(0);
      }
    }
    fetchData();
  }, []);

  const experienceUp = useCallback((exp) => {
    setExperience((curr) => curr + exp);
  }, []);

  useEffect(() => {
    async function validate() {
      const res = await validateCall("/api/users/validate");
      if (res.success) {
        login(res.data);
      }
    }
    validate();
  }, []);

  useEffect(() => {
    if (experience >= 100) {
      setLevel(level + 1);
      setExperience(experience - 100);
    }
  }, [experience, level]);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        let res = await levelCall("/api/users/level", {
          userId: userId,
          level: level,
        });
        if (res.error) {
          console.log(res.error);
        }
      }
    }
    fetchData();
  }, [level, levelCall, userId]);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        let res = await expCall("/api/users/experience", {
          userId: userId,
          experience: experience,
        });
        if (res.error) {
          console.log(res.error);
        }
      }
    }
    fetchData();
  }, [experience, expCall, userId]);

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        experienceUp,
        userId,
        level,
        experience,
        username,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
