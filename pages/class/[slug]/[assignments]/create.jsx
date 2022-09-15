import React, { useEffect, useContext, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateAssignment.module.scss'
import AuthContext from '../../../../stores/authContext'
import { FiUpload, FiChevronDown, FiChevronUp } from 'react-icons/fi'

const Create = () => {

  const router = useRouter()
  const { slug } = router.query

  const [value, setValue] = useState("")
  const [showFile, setShowfile] = useState(false)

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
        <h1 className={styles.heading}>Create Assignment</h1>
        <div className={styles.inputField}>
          <input id='assignmentTitle' placeholder=" " className={styles.inputBox} type="text" />
          <label htmlFor="assignmentTitle" className={styles.inputLabel}>Assignment Title</label>
        </div>
        <div className={styles.inputField} style={{height: '150px'}}>
          <textarea id='assignmentDesc' style={{fontSize: '18px', padding: '10px 1rem', fontWeight: '300'}} placeholder=" " className={styles.inputBox} />
          <label htmlFor="assignmentDesc" className={styles.inputLabel}>Assignment Description</label>
        </div>
        <div className={styles.uploadFile}>
          <p onClick={()=> setShowfile(!showFile)}>Upload Reference File <span style = {showFile ? {rotate: '-180deg'} : {}}><FiChevronDown /></span></p>
          <input type="file" id="assignmentFile" onChange={(e) => handleUpload(e)} />
          {!showFile && <><label htmlFor="assignmentFile">
            <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
          </label></>}
        </div>
        <div className={styles.marks}>
          <label>
            Total Marks
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
        </div>
        <div className={`${styles.btn} ${styles.btn2}`} disabled={value ? false : true} onClick={() => handleSubmit()}>Create Assignment</div>
      </main>
    </div>
  )
}

export default Create