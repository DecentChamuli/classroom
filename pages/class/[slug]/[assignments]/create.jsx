import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateClass.module.scss'
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
        <title>No Class Exist</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <main className={styles.main}>
        <h2>Create Assignment</h2>
        {slug}
      </main>
    </div>
  )
}

export default Create