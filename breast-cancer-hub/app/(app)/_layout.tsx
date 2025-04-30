import {Slot, Redirect} from 'expo-router';
import {getSetting} from "@/hooks/useSettings";
import {useState, useEffect} from "react";

export default function Protection(){
    const [session, setSession] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getSetting("token").then((token) => {
            setSession(token || "");
            setIsLoading(false);
        });
    }, []); 
    
    // Don't render anything while still loading
    if (isLoading) {
        return null;
    }
    
    // After loading, if no session token, redirect to login
    if (session === "") {
        return <Redirect href="/login" />;
    }
    
    // If we have a session token, render the protected content
    return <Slot />;
}