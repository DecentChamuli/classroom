import React from 'react'
import styles from '../styles/Login.module.css'
import Head from 'next/head'

const login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
        <div className={styles.main}>
            This is login form
        </div>
    </div>


  )
}

export default login