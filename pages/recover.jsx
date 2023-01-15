import { useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Forgot.module.scss'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { MdError } from 'react-icons/md'
import axios from 'axios'
import { CircularLoader } from '../components/Loader'

const Recover = () => {

    const [isLoading, setLoading] = useState(false)

    const emailRef = useRef()

  return (
    <main className={styles.main}>
        <Head>
            <title>Recover Password - Classroom</title>
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
            <form>
                <input autoFocus ref={emailRef} id='email' className={styles.inputBox} placeholder='Enter your Email' type="text" />
            </form>
            <button className={styles.btn} disabled={!isLoading ? false : true} style={!isLoading ? { marginTop: '1.5rem' } : { marginTop: '1.5rem', padding: '8px 0', cursor: 'no-drop' }} onClick={() => { handleLogin() }}>{!isLoading ? 'Send Email' : <CircularLoader color='white' />}</button>
        </div>
    </main>
  )
}

export default Recover