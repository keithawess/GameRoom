import React, {useState, createContext, useCallback, useEffect} from "react";
import useFetchDB from "../hooks/useFetchDB";

export const BuddyContext = createContext(null);

export function BuddyProvider(props) {

    return (<BuddyContext.Provider>
        {props.children}
    </BuddyContext.Provider>)
}