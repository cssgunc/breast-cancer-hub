import {Slot, Redirect} from 'expo-router';
import {getSetting} from "@/hooks/useSettings";
import {useState, useEffect} from "react";

export default function Protection(){
    const [session, setSession] = useState("");
    
    useEffect (() => {
        getSetting("token").then((token) => {setSession(token || "")
    });
    }, []);
    
    
    if (session === "") {
        return <Redirect href="/login"/>;
    }

    return <Slot />;
}