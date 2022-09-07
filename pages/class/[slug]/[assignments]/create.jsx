import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateAssignment.module.scss'
import AuthContext from '../../../../stores/authContext'

const Create = () => {

  const router = useRouter()
  const { slug } = router.query

  // const authContext = useContext(AuthContext)
  // let UserID = authContext.userID
 
  // useEffect(() => {

  // }, [])
  

  return (
    <div>
      <Head>
        <title>Create Assignment</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          left
        </div>
        <div className={styles.right}>
          right
        </div>
      </main>
    </div>
  )
}

export default Create