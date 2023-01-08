import React, { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Signup.module.scss'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
import { useRouter } from 'next/router'
import axios from 'axios'
import AuthContext from '../stores/authContext'
import { CircularLoader } from '../components/Loader'

const Signup = () => {

  const router = useRouter()
  
  const { userID, domReady } = useContext(AuthContext)

  useEffect(() => {
    if(domReady){
      if(userID) router.push('/')
      else return
    }
  }, [userID, router, domReady])

  const [viewPassword, setViewPassword] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const successSignup = () => {
    setSubmitError(false)
    setInputError(false)
    router.push('/login')
  }

  const handleKeyPress = event => {
    if (event.keyCode === 13) {
      handleSignUp()
    }
  }

  const handleSignUp = async () => {
    if(!nameRef.current.value.match(/([^\s])/) || !emailRef.current.value.match(/([^\s])/) || !passwordRef.current.value.match(/([^\s])/)){
      setInputError(true)
      setSubmitError(false)
      return
    }
    setInputError(false)
    setLoading(true)
    const credentials = {name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value}
    const user = await axios.post('/api/auth/registeruser', credentials)
    await user.data.success ? successSignup() : setSubmitError(user.data.error); setInputError(false)
    setLoading(false)

  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Signup - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div onKeyUp={(event)=>handleKeyPress(event)} className={styles.signup}>
        <h6>Create a Free Account</h6>
        {inputError && <div className={styles.error}><span><MdError /></span>All fields are required</div>}
        {submitError && <div className={styles.error}><span><MdError /></span>{submitError}</div>}
        <form>
          <div className={styles.inputField}>
            <input autoFocus ref={nameRef} id='name' placeholder=" " className={styles.inputBox} type="text" />
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
        </form>
        <div className={styles.disclaimer}>
          <p>By Signing Up, you agree to the Terms of Use and Privacy Policy</p>
        </div>
        <button disabled={!isLoading ? false : true} className={styles.btn} onClick={()=>{handleSignUp()}} style={!isLoading ? { marginTop: '1.5rem' } : { marginTop: '1.5rem', padding: '8px 0', cursor: 'no-drop' }}>{!isLoading ? 'Sign Up' : <CircularLoader color='white' />}</button>
        <p className={styles.logIn}>Already have an account? <Link href="/login">Log In</Link></p>
      </div>
    </main>
  )
}

export default Signup