import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { UserContext } from ".";
import useFetchDB from "../hooks/useFetchDB";

export const BuddyContext = createContext(null);

export function BuddyProvider(props) {
  const [buddy, setBuddy] = useState(null);
  const { callAPI: buddyCall } = useFetchDB("GET");
  const { userId } = useContext(UserContext);

  useEffect(async () => {
    let buddyRes = await buddyCall(`/api/buddies/user/${userId}`);
    if (buddyRes.error) {
      return;
    }
    setBuddy(buddyRes.data);
  }, [userId]);

  return (
    <BuddyContext.Provider value={{ buddy, setBuddy }}>
      {props.children}
    </BuddyContext.Provider>
  );
}
