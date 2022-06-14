import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Login.module.scss'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
import { useRouter } from 'next/router'


const Login = () => {

  const router = useRouter()

  const [emailInput, setEmail] = useState(false)
  const [passwordInput, setPassword] = useState(true)
  const [viewPassword, setViewPassword] = useState(false)
  const [error, setError] = useState(false)

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const togglePassword = () => {
    setViewPassword(!viewPassword)
  }

  const handleEmail = () => {
    if(emailRef.current.value === ""){
      setError(true)
      return
    }
    setEmail(emailRef.current.value)
    setPassword(false)
    setError(false)
  }

  const handlePassword = () => {
    if(passwordRef.current.value === ""){
      setError(true)
      return
    }
    router.push('/')
    setPassword(passwordRef.current.value)
    setError(false)
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Login - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.login}>
        {!emailInput &&
          <div className={styles.emailLogin}>
            <h6>Log in you Account</h6>
            <div className={styles.inputField}>
              <span className={styles.icon}><BsFillPersonFill /></span>
              <input ref={emailRef} id='username' className={styles.inputBox} placeholder='Username or Email' type="text" />
            </div>
            {error && <div className={styles.error}><span><MdError /></span>This field is required</div>}
            <button className={styles.btn} onClick={handleEmail}>Continue with Email</button>
            <div className={styles.signUp}>
              <p>Don&apos;t have an Account ?</p>
              <Link href='/signup'><button className={`${styles.btn} ${styles.btnSignUp}`}>Sign Up</button></Link>
            </div>
          </div>
        }
        {!passwordInput &&
          <div className={styles.passwordLogin}>
            <h6>Welcome</h6>
            <p style={{ textAlign: 'center', fontSize: '15px', marginTop: '.5rem' }}>{emailInput}</p>
            <div className={styles.inputField} style={{ marginTop: '1rem' }}>
              <span className={styles.icon}><FaLock /></span>
              <input ref={passwordRef} id='password' className={styles.inputBox} placeholder='Enter your Password' type={!viewPassword ? 'password' : 'text'} />
              <span className={`${styles.icon} ${styles.viewPw}`} onClick={togglePassword}>{!viewPassword ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
            </div>
            {error && <div className={styles.error}><span><MdError /></span>This field is required</div>}
            <div className={styles.otherChecks} style={{ marginTop: '5px' }}>
              <div>
                <input style={{ cursor: 'pointer' }} type='checkbox' id='rememberMe' />
                <label htmlFor='rememberMe' style={{ marginLeft: '5px', cursor: 'pointer' }}>Keep me logged in</label>
              </div>
              <p className={styles.forgotPw}>Forgot Password?</p>
            </div>
            <button className={styles.btn} style={{marginTop: '1.5rem'}} onClick={handlePassword}>Login</button>
          </div>
        }
      </div>
    </main>
  )
}

export default Login