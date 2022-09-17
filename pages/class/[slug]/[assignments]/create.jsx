import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateAssignment.module.scss'
import { FiUpload, FiChevronDown, FiArrowLeftCircle } from 'react-icons/fi'
import { CircularLoader } from '../../../../components/Loader'
import axios from 'axios'

const Create = () => {

  const router = useRouter()
  const { slug } = router.query

  const [marks, setMarks] = useState("10")
  const [showFile, setShowfile] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const titleRef = useRef()
  const descRef = useRef()

  const handleSubmit = async () => {
    if(!titleRef.current.value.match(/([^\s])/) || !descRef.current.value.match(/([^\s])/) || !marks.match(/([^\s])/)){ 
      // setInputError(true)
      console.log('Empty');
      // Null Error is still left for implementation
      return
    }

    setLoading(!isLoading)


    // setLoading(true)
    // const data = {taskTitle: titleRef.current.value, taskDesc: descRef.current.value, taskMarks: Number(marks), classroomSlug: slug}
    // const response = await axios.post('/api/class/createassignment', data)
    // await response.data.success ? console.log(response.data.success) : console.log('fail')
    // setLoading(false)

    // console.log(titleRef.current.value, descRef.current.value, Number(marks))
  }

  return (
    <div>
      <Head>
        <title>Create Assignment</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.goBack}><Link href={`/class/${slug}`}><a><FiArrowLeftCircle /><p>Go Back to Class</p></a></Link></div>
      <main className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.heading}>Create Assignment</h1>
          <div className={styles.inputField}>
            <input id='assignmentTitle' ref={titleRef} placeholder=" " className={styles.inputBox} type="text" />
            <label htmlFor="assignmentTitle" className={styles.inputLabel}>Assignment Title</label>
          </div>
          <div className={styles.inputField} style={{height: '150px'}}>
            <textarea id='assignmentDesc' ref={descRef} style={{fontSize: '17px', padding: '10px 1rem', fontWeight: '300'}} placeholder=" " className={styles.inputBox} />
            <label htmlFor="assignmentDesc" className={styles.inputLabel}>Assignment Description</label>
          </div>
          <div className={styles.uploadFile}>
            <p onClick={()=> setShowfile(!showFile)}>Upload Reference File <span style = {showFile ? {rotate: '-180deg'} : {}}><FiChevronDown /></span></p>
            <input type="file" id="assignmentFile" onChange={(e) => handleUpload(e)} />
            {showFile && <><label htmlFor="assignmentFile">
              <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
            </label></>}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.marks}>
            <label htmlFor='totalMarks'>Total Marks:</label>
            <input type="number" id='totalMarks' value={marks} onChange={(e) => setMarks(e.target.value)} />
          </div>
          <p>due date</p>
          <div className={`${styles.btn} ${styles.btn2}`} onClick={() => handleSubmit()}>Create Assignment</div>
          <button className={`${styles.btn} ${styles.btn2}`} style={!isLoading ? {} : { cursor: 'no-drop' }} onClick={() => handleSubmit()}>{!isLoading ? 'Create Assignment' : <CircularLoader color='#0baed6' />}</button>
          {/* disabled={!isLoading ? false : true}  */}
        </div>
      </main>
    </div>
  )
}

export default Create