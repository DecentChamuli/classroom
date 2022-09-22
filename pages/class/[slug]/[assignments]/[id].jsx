import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../../../styles/Assignment.module.scss'
import { FiUpload, FiArrowLeftCircle } from 'react-icons/fi'
import Link from 'next/link'
import { DotsLoader } from '../../../../components/Loader'
import axios from 'axios'
import { format } from 'timeago.js'

const Assignment = () => {
    const router = useRouter()
    const { slug, id } = router.query

    const [isLoading, setLoading] = useState(false)
    const [assignmentData, setAssignmentData] = useState([])

    useEffect(() => {
      const credentials = {
        classroomSlug: slug,
        taskSlug: id
      }
      const fetchAssignment = async () => {
        setLoading(true)
        const res = await axios.post('/api/class/getassignment', credentials)
        res.data.success ? setAssignmentData(res.data) : console.log(res.data)
        setLoading(false)
        return
      }
      fetchAssignment()
    }, [id, slug, router])

    const handleUpload = (event) => {
      // const fileName = event.target.files[0].name
      // const file = URL.createObjectURL(event.target.files[0])
      // console.log(file)
      console.log(event.target.files[0])
    }

    return (
      <div>
        <Head>
          <title>{assignmentData.success ? assignmentData.assignmentDetails.taskTitle : 'Classroom'}</title>
          <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
        </Head>
        {isLoading ? <DotsLoader /> :
          <>
            <div className={styles.goBack}><Link href={`/class/${slug}`}><a><FiArrowLeftCircle /><p>Go Back to Class</p></a></Link></div>
            <main className={styles.main}>
              <div className={styles.left}>
                {assignmentData.success && <>
                  <div className={styles.header}> 
                    <h1>{assignmentData.assignmentDetails.taskTitle}</h1>
                    <div className={styles.assignmentInfo}>
                      <div>
                        <span>{assignmentData.teacherName}</span>
                        <span>Marks: {assignmentData.assignmentDetails.taskMarks}</span>
                      </div>
                      <div>
                        <h5>Posted {format(assignmentData.assignmentDetails.createdAt)}</h5>
                        <h5>Due {format(assignmentData.assignmentDetails.dueDate)}</h5>
                      </div>
                    </div>
                  </div>
                  <div className={styles.body}>
                    <p>{assignmentData.assignmentDetails.taskDesc}</p>
                  </div>
                </> }
              </div>
              <div className={styles.right}>
                <div className={styles.header}>
                  <h3>Your Work</h3>
                  <p>Missing</p>
                </div>
                <div className={styles.inputField}>
                  <input id='fileURL' placeholder=" " className={styles.inputBox} type="text" />
                  <label htmlFor="fileURL" className={styles.inputLabel}>Enter File URL</label>
                </div>
                <p className={styles.divider}>OR</p>
                <div className={styles.uploadFile}>
                  <input type="file" id="assignmentFile" onChange={(e) => handleUpload(e)} />
                  <label htmlFor="assignmentFile">
                    <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
                  </label>
                </div>
                <div className={`${styles.btn} ${styles.btn2}`}>Submit</div>
              </div>
            </main>
        </>
        }
      </div>
    )
}

export default Assignment