import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../../../styles/Assignment.module.scss'
import { FiUpload, FiArrowLeftCircle } from 'react-icons/fi'
import Link from 'next/link'

const Assignment = () => {

    const router = useRouter()
    const { slug } = router.query
    // console.log(router.query)

    const handleUpload = (event) => {
      // const fileName = event.target.files[0].name
      // const file = URL.createObjectURL(event.target.files[0])
      // console.log(file)
      console.log(event.target.files[0])
    }

    return (
      <div>
        <Head>
          <title>Each Assignment</title>
          <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
        </Head>
        <div className={styles.goBack}><Link href={`/class/${slug}`}><a><FiArrowLeftCircle /><p>Go Back to Class</p></a></Link></div>
        <main className={styles.main}>
          <div className={styles.left}>
            <div className={styles.header}>
              <h1>Assignment Title</h1>
              <div className={styles.assignmentInfo}>
                <div>
                  <span>Teacher Name</span>
                  <span>Marks: 100</span>
                </div>
                <div>
                  <h5>Posted at: 31 Aug</h5>
                  <h5>Due 5 Sept</h5>
                </div>
              </div>
            </div>
            <div className={styles.body}>
              <p>Assignment Description Here Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.header}>
              <h3>Your Work</h3>
              <p>Missing</p>
            </div>
            <div className={styles.inputField}>
              <input id='classDesc' placeholder=" " className={styles.inputBox} type="text" />
              <label htmlFor="classDesc" className={styles.inputLabel}>Enter File URL</label>
            </div>
            <p className={styles.divider}>OR</p>
            {/* <div className={styles.btn}><span><FiUpload /></span>Upload File</div> */}
            <div className={styles.uploadFile}>
              <input type="file" id="assignmentFile" onChange={(e)=>handleUpload(e)}/>
              <label htmlFor="assignmentFile">
                <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
              </label>
            </div>
            <div className={`${styles.btn} ${styles.btn2}`}>Submit</div>
          </div>
        </main>
      </div>
    )
}

export default Assignment