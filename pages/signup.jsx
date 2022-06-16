import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Signup.module.scss'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdError } from 'react-icons/md'
import { useRouter } from 'next/router'

const Signup = () => {

  const router = useRouter()

  const [viewPassword, setViewPassword] = useState(false)
  const [error, setError] = useState(false)

  const nameRef = useRef("");
  const emailRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const handleSignUp = () => {
    if(emailRef.current.value === ""){
      setError(true)
      return
    }
    setError(false)
    router.push('/cart')
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Signup - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.signup}>
        <h6>Create a Free Account</h6>
        {error && <div className={styles.error}><span><MdError /></span>All fields are required</div>}
        <div className={styles.inputField}>
          <input ref={nameRef} id='name' placeholder=" " className={styles.inputBox} type="text" />
          <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
        </div>
        <div className={styles.inputField}>
          <input ref={usernameRef} id='username' placeholder=" " className={styles.inputBox}  type="text" />
          <label htmlFor="username" className={styles.inputLabel}>Username</label>
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