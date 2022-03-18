import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/Login.css"
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import { useDispatch } from 'react-redux'
import { setUser} from '../redux/user';

const Login = () => {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState("")
  const dispatch = useDispatch()

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha__container', {
      "size" : "invisible",
      "callback": (response) =>{}
    }, auth)
  }

    const signIn = (e) => {
      e.preventDefault()
      if(phoneNumber) {
        generateRecaptcha()
        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
        .then(confirmedResult => {
            window.confirmedResult = confirmedResult
            setPhoneNumber("")
            setShowOTP(true)
        }).catch(err => {
          console.error("SMS not sent" , err)
        })
      }
      
    }

    const verifyOTP = (e) => {
      e.preventDefault()
      let confirmedResult = window.confirmedResult
      confirmedResult.confirm(otp).then(result => {
        const user = result.user
        dispatch(setUser({phoneNumber: user.phoneNumber}))
        navigate("/dashboard")
      }).catch(err => console.error(err))
    }
    
  return (
    <main className='login'>
        <h3 className='login__logo'>Welcome! </h3>
        {showOTP ? (
            <>
              <h3 className='login__logo'>Enter the OTP </h3>
              <form className='login__form'> 
                <label htmlFor='email'> OTP   </label>
                <input type="number" value={otp} required onChange={(e) => setOtp(e.target.value)} maxLength="6"/>

                <button className='login__btn' onClick={verifyOTP} type="submit">SIGN IN</button>
            </form>
            </>
        ) : (
          <>
          <form className='login__form'> 
          <label htmlFor='number'> Phone Number   </label>
          <input type="tel" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} name="number"/>

          <button className='login__btn' onClick={signIn} type="submit">Get OTP</button>
        </form>
          <div id='recaptcha__container'></div>
          </>
        )}
    </main>
  )
}

export default Login