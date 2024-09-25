import  {jwtDecode}  from 'jwt-decode'
import { createContext, useContext, useEffect, useState } from 'react'

const authContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            signin(token)
        } else {
            signout()
        }
        setLoading(false)
    }, [])

    const signin = (token) => {
        const decodedToken = jwtDecode(token)
        setUser({
            role: decodedToken.role,
            name: decodedToken.name,
            email: decodedToken.email
        })
    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem('token')
    }
    return (
        <authContext.Provider value={{ signin, signout, user, loading }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}