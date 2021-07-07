import { useState, useEffect } from "react";

const baseUrl = "api.toys/api/"

export default function useFetch(url) {
    const [data,setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(()=> {
        setError(null);
        setData(null);
        if (url.length < 1)
        {
            setError("Incorrect URL")
            return;
        }
        async function callAPI() {
            setLoading(true);
            
            try {
                const response = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    
                    setData(json);
                } else {
                    throw response;
                }
            } catch (e) {
                console.log(e);
                setError("Whoops, something isn't right.")
            } finally {
                setLoading(false);
            }
        }
        callAPI();
    }, [url]);
        
        return {data,error,loading};
    }