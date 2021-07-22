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

}