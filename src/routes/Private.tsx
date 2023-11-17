import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps{
    children: ReactNode
}

const Private = ({children}: PrivateProps) => {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user.uid,
                    email: user.email
                }

                localStorage.setItem('@reactlinks', JSON.stringify(userData))
                setLoading(false)
                setSigned(true)

            } else {
                setLoading(false)
                setSigned(false)
            }
        } )

        return () => {
            unsub()
        }
    }, [])

    if(loading){
        return <h1>....Buscando...</h1>
    }

    if(!signed){
        return <Navigate to='/login' />
    }

    return (
        children
    )
}
export default Private