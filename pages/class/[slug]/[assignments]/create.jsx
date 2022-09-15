import React, { useEffect, useContext, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateAssignment.module.scss'
import AuthContext from '../../../../stores/authContext'

const Create = () => {

  const router = useRouter()
  const { slug } = router.query

  const [value, setValue] = useState("")

  // const authContext = useContext(AuthContext)
  // let UserID = authContext.userID
 
  // useEffect(() => {

  // }, [])


  const handleSubmit = () => {
    // if(value.match(/([^\s])/)){ // True when not Empty
    //   console.log(value)
    //   return
    // }
    // console.log('Empty');

    console.log(value)
  }

  return (
    <div>
      <Head>
        <title>Create Assignment</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.container}>
            <label>
              Title
              <input type="text" />
            </label>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.marks}>
            <label>
              Total Marks
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}/>
            </label>
          </div>
          <button className={styles.btn} disabled={value ? false : true} onClick={()=>handleSubmit()}>Create Assignment</button>
        </div>
      </main>
    </div>
  )
}

export default Create