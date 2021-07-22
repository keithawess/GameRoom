import React, { useState, createContext, useEffect, useContext } from "react";
import { UserContext } from ".";
import useFetchDB from "../hooks/useFetchDB";

export const BuddyContext = createContext(null);

export function BuddyProvider(props) {
  const [buddy, setBuddy] = useState(null);
  const { callAPI: buddyCall } = useFetchDB("GET");
  const { userId } = useContext(UserContext);

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
    <BuddyContext.Provider value={{ buddy, setBuddy }}>
      {props.children}
    </BuddyContext.Provider>
  );
}
