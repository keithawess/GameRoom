import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from ".";
import useFetchDB from "../hooks/useFetchDB";

export const BuddyContext = createContext(null);

export function BuddyProvider(props) {
  const [buddy, setBuddy] = useState(null);
  const { callAPI: buddyCall } = useFetchDB("GET");
  const { userId } = useContext(UserContext);
  const [buddyPage, setBuddyPage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let buddyRes = await buddyCall(`/api/buddies/user/${userId}`);
      if (buddyRes.error) {
        return;
      }
      setBuddy(buddyRes.data);
    }
    fetchData();
  }, [userId]);

  return (
    <BuddyContext.Provider value={{ buddy, setBuddy, setBuddyPage, buddyPage }}>
      {props.children}
    </BuddyContext.Provider>
  );
}
