import React, { useEffect, useContext, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateAssignment.module.scss'
import AuthContext from '../../../../stores/authContext'
import { FiUpload } from 'react-icons/fi'

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
        <div className={styles.container}>
          <div className={styles.inputField}>
            <input id='classDesc' placeholder=" " className={styles.inputBox} type="text" />
            <label htmlFor="classDesc" className={styles.inputLabel}>Enter File URL</label>
          </div>
          <div className={styles.uploadFile}>
            <input type="file" id="assignmentFile" onChange={(e) => handleUpload(e)} />
            <label htmlFor="assignmentFile">
              <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
            </label>
          </div>
          <div className={`${styles.btn} ${styles.btn2}`}>Submit</div>
          <div className={styles.marks}>
            <label>
              Total Marks
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            </label>
          </div>
          <button className={styles.btn} disabled={value ? false : true} onClick={() => handleSubmit()}>Create Assignment</button>
        </div>
      </main>
    </div>
  )
}

export default Create