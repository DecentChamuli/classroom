import { useRef, useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Forgot.module.scss'
import { FiArrowLeftCircle } from 'react-icons/fi'
import axios from 'axios'
import { CircularLoader } from '../components/Loader'
import AuthContext from '../stores/authContext'
import { useRouter } from 'next/router'

const Forgot = () => {

  const router = useRouter()

  const { userID, domReady } = useContext(AuthContext)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [counter, setCounter] = useState(60)
  const [emailSent, setEmailSent] = useState(false)
  const [resend, setResend] = useState(false)

  const emailRef = useRef()

  let interval

  useEffect(() => {
    if(domReady){
      if(userID) router.push('/')
      else return
    }
    return () => clearInterval(interval)
  }, [domReady, interval, router, userID])

  const handleSuccess = () => {
    let pointer = 60
    setEmailSent(true)

    interval = setInterval(() => {
      if(pointer>0){
        setCounter(current => current - 1)
        pointer--
      }
      else{
        setResend(true)
        clearInterval(interval)
      }
    }, 1000)
  }
  
  const handleSend = async () => {
    if(!emailRef.current.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return setError('Please Enter valid Email')
    setError(false)
    setLoading(true)
    const res = await axios.post('/api/auth/forgotpassword', {userEmail: emailRef.current.value})
    await res.data.success ? handleSuccess() : setError(res.data.error)
    setLoading(false)
  }

  const handleResend = () => {
    setResend(false)
    setCounter(60)
    handleSend()
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Forgot Password - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.container}>
        <Link href={`/login`}>
          <div className={styles.loginBtn}>
            <FiArrowLeftCircle />
            <div>Back to Login</div>
          </div>
        </Link>
        <h6>Recover your Password</h6>
        <p>Enter your email address to receive OTP.</p>
        <form onSubmit={e =>{e.preventDefault(); handleSend()}}>
          <input autoFocus ref={emailRef} id='email' className={styles.inputBox} placeholder='Enter your Email' type="text" />
          {error && <div className={styles.error}>{error}</div>}
        </form>
        <div className={styles.resendContainer}>
          {emailSent && <>
            <span>Didn&apos;t receive Email?</span>
            {resend ? 
              <span onClick={handleResend} className={styles.resendBtn}>Send Again</span>
            :
              <span className={styles.resendCounter}>{counter}s</span>
            }
          </>}
        </div>
        {!emailSent ? 
          <button className={styles.btn} disabled={!isLoading ? false : true} style={!isLoading ? { marginTop: '1.5rem' } : { marginTop: '1.5rem', padding: '8px 0', cursor: 'no-drop' }} onClick={handleSend}>{!isLoading ? 'Send Email' : <CircularLoader color='white' />}</button> 
        :
          <>
            {!resend &&
            <div className={styles.confirmationContainer}>
              <p>Email Sent Successfully. <br />Please check your mailbox.</p>
            </div>}
          </>
        }
      </div>
    </main>
  )
}

export default Forgot