import React, { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Signup.module.scss'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
import { useRouter } from 'next/router'
import axios from 'axios'
import AuthContext from '../stores/authContext'

const Signup = () => {

  const router = useRouter()
  
  const authContext = useContext(AuthContext)
  
  let UserID = authContext.userID

  useEffect(() => {
    if(UserID){
      router.push('/')
    }
    else{
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [viewPassword, setViewPassword] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const successSignup = () => {
    setSubmitError(false)
    setInputError(false)
    router.push('/login')
  }

  const handleSignUp = async () => {
    if(nameRef.current.value === "" || emailRef.current.value === "" || passwordRef.current.value === ""){
      setInputError(true)
      setSubmitError(false)
      return
    }
    setInputError(false)

    const credentials = {name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value}
    const user = await axios.post('/api/auth/registeruser', credentials)

    user.data.success ? successSignup() : setSubmitError(user.data.error); setInputError(false)

    // console.log(user.data)
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Signup - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.signup}>
        <h6>Create a Free Account</h6>
        {inputError && <div className={styles.error}><span><MdError /></span>All fields are required</div>}
        {submitError && <div className={styles.error}><span><MdError /></span>{submitError}</div>}
        <div className={styles.inputField}>
          <input ref={nameRef} id='name' placeholder=" " className={styles.inputBox} type="text" />
          <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
        </div>
        <div className={styles.inputField}>
          <input ref={emailRef} id='email' placeholder=" " className={styles.inputBox} type="text" />
          <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
        </div>
        <div className={styles.inputField}>
          <input ref={passwordRef} style={{padding: '0 0 0 1rem'}} id='password' placeholder=" " className={styles.inputBox} type={!viewPassword ? 'password' : 'text'} />
          <label htmlFor="password" className={styles.inputLabel}>Password</label>
          <span className={styles.viewPw} onClick={()=>setViewPassword(!viewPassword)}>{!viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
        </div>
        <div className={styles.disclaimer}>
          <input type='checkbox' id='tos' />
          <label htmlFor='tos'>I agree to the Terms of Use and Privacy Policy</label>
        </div>
        <button className={styles.btn} onClick={handleSignUp} style={{ marginTop: '1.5rem' }}>Sign Up</button>
        <p className={styles.logIn}>Already have an account? <Link href="/login">Log In</Link></p>
      </div>
    </main>
  )
}

export default Signup