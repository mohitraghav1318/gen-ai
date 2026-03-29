import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import LoadingScreen from "../../../components/common/LoadingScreen";

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (
            <LoadingScreen
                compact
                title="Verifying your session..."
                subtitle="Securing your workspace and restoring your latest state."
            />
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected
