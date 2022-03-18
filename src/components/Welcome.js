import React, { useEffect} from 'react'
import "../styles/Welcome.css"
import {useNavigate} from "react-router-dom"
import { useSelector} from 'react-redux'


const Welcome = () => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    
    useEffect(()=> {
        if(!user.phoneNumber) return navigate("/")
    }, [user.phoneNumber, navigate])

  return (
    <main className='welcome'>
            <h3 className="welcome__header"> Sign in successful</h3>
            <p>Welcome, {user.phoneNumber}</p>
    </main>
  )
}

export default Welcome