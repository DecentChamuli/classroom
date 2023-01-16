import { useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Forgot.module.scss'
import axios from 'axios'
import { CircularLoader } from '../components/Loader'
import { useRouter } from 'next/router'
import AuthContext from '../stores/authContext'

const Recover = () => {

  const router = useRouter()

  const { userID, domReady } = useContext(AuthContext)

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  useEffect(() => {
    const verifyToken = async () => {
      let dataObj = {
        resetToken: router.query.password_reset,
        userEmail: router.query.user_email,
      }
      const res = await axios.post('/api/auth/recoverpassword', dataObj)
      if(res.data.error) return setError(res.data.error)
      setError(false)
    }
    if(domReady){
      if(userID) router.push('/')
      else verifyToken()
    }
  }, [domReady, router, userID])

  const handleResetPassword = async () => {
    if(!passwordRef.current.value.match(/([^\s])/)) return setError("Password cannot be Empty")
    if(passwordRef.current.value !== confirmPasswordRef.current.value) return setError("Passwords donot match.")

    setError(false)
    setSuccess(false)

    let dataObj = {
      resetToken: router.query.password_reset,
      userEmail: router.query.user_email,
      newPassword: passwordRef.current.value
    }

    setLoading(true)
    const res = await axios.put('/api/auth/recoverpassword', dataObj)
    await res.data.success ? setSuccess(res.data.success) : setError(res.data.error)
    setLoading(false)
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>Reset Password - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.container}>
        <h6>Reset Account Password</h6>
        <p><b>{router.query.user_email}</b></p>
        <form onKeyUp={(event) => event.keyCode === 13 && handleResetPassword()}>
          <div className={styles.inputField}>
            <input ref={passwordRef} type='password' id='newpassword' placeholder=" " className={styles.inputWithLabel} />
            <label htmlFor="newpassword" className={styles.inputLabel}>New Password</label>
          </div>
          <div className={styles.inputField} style={{ marginTop: '15px' } }>
            <input ref={confirmPasswordRef} type='password' id='confirmpassword' placeholder=" " className={styles.inputWithLabel} />
            <label htmlFor="confirmpassword" className={styles.inputLabel}>Confirm Password</label>
          </div>
          {error && <div className={styles.error} style={{fontWeight: '600', fontSize: '15px'}}>{error}</div>}
        </form>
        <button className={styles.btn} disabled={!isLoading ? false : true} style={!isLoading ? { marginTop: '1.5rem' } : { marginTop: '1.5rem', padding: '8px 0', cursor: 'no-drop' }} onClick={() => { handleResetPassword() }}>{!isLoading ? 'Set New Password' : <CircularLoader color='white' />}</button>
        {success && <div className={styles.confirmationContainer}>
          <p>{success}</p>
        </div>}
      </div>
    </main>
  )
}

export default Recover