import React, {useState, createContext, useCallback, useEffect} from "react";
import useFetchDB from "../hooks/useFetchDB";

export const UserContext = createContext(null);

export function UserProvider(props){
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [level, setLevel] = useState(0);
    const [experience, setExperience] = useState(0);

    const { callAPI: levelCall } = useFetchDB("PATCH");
    const { callAPI: expCall } = useFetchDB("PATCH");
    const { callAPI: logoutCall } = useFetchDB("GET");
    const { callAPI: validateCall } = useFetchDB("GET");

    const login = useCallback ((user)=>{
        setUsername(user.username);
        setLevel(user.level);
        setExperience(user.experience);
        setUserId(user.id);
    },[]);

    const logout = useCallback (async () => {
        const res = await logoutCall("/api/users/logout");
        if(res.success) {
            setUserId("");
            setUsername("");
            setLevel(0);
            setExperience(0);
            setBuddy(null);
            setNavScroll(0);
        }
    }, []);

    useEffect(() => {
        async function validate() {
          const res = await validateCall("/api/users/validate");
          if (res.success) {
            login(res.data);
    
            let buddyRes = await buddyCall(
              `/api/buddies/user/${res.data.id}`
            );
            setUsername(res.data.username);
            if (buddyRes.error) {
              return;
            }
            setBuddy(buddyRes.data);
          }
        }
        validate();
      }, []);
}