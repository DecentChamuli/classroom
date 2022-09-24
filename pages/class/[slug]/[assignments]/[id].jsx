import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../../../styles/Assignment.module.scss'
import { FiUpload, FiArrowLeftCircle } from 'react-icons/fi'
import AuthContext from '../../../../stores/authContext'
import Link from 'next/link'
import { DotsLoader, CircularLoader } from '../../../../components/Loader'
import axios from 'axios'
import { format } from 'timeago.js'

const Assignment = () => {
    const router = useRouter()
    const { slug, id } = router.query

    const authContext = useContext(AuthContext)
    let { userID } = authContext

    const [isLoading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState(false)
    const [hasTime, setHasTime] = useState(false)
    const [assignmentData, setAssignmentData] = useState([])
    const [assignmentFileURL, setAssignmentFileURL] = useState("")

    useEffect(() => {
      const credentials = {
        classroomSlug: slug,
        taskSlug: id,
        userID
      }
      const fetchAssignment = async () => {
        setLoading(true)
        const res = await axios.post('/api/class/getassignment', credentials)
        res.data.success ? setAssignmentData(res.data) : console.log(res.data)
        if(new Date(res.data.assignmentDetails.dueDate).getTime() > new Date().getTime()){
          setHasTime(true)
        }
        else{
          setHasTime(false)
        }
        setLoading(false)
        return
      }
      fetchAssignment()
    }, [id, slug, router, userID])

    console.log(assignmentData)

    // console.log(assignmentData.assignmentDetails.dueDate)
    // let dueDateMS = new Date(assignmentData.assignmentDetails.dueDate).getTime()
    // let createdAtMS = new Date(assignmentData.assignmentDetails.createdAt).getTime()
    // console.log(dueDateMS - createdAtMS)
    // console.log(createdAtMS - dueDateMS)
    // console.log(new Date().toISOString())
    // console.log(assignmentData.assignmentDetails.createdAt)

    const handleUpload = (event) => {
      // const fileName = event.target.files[0].name
      const file = URL.createObjectURL(event.target.files[0])
      setAssignmentFileURL(file)
    }
    
    const handleSubmit = async () => {
      if(!assignmentFileURL.match(/([^\s])/)){
        setError("Enter File URL or Upload File")
        return
      }
      setError(true)

      const data = {
        classroomSlug: slug,
        taskSlug: id,
        userID,
        submittedData: assignmentFileURL
      }

      setSubmitLoading(true)
      const res = await axios.post('/api/class/submitassignment', data)
      res.data.success ? console.log(res.data) : console.log(res.data)
      setAssignmentFileURL("")
      setSubmitLoading(false)
    }

    return (
      <div>
        <Head>
          <title>{assignmentData.success ? assignmentData.assignmentDetails.taskTitle : 'Classroom'}</title>
          <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
        </Head>
        {isLoading ? <DotsLoader loadingText="Loading Assignment..." /> :
          <>
            <div className={styles.goBack}><Link href={`/class/${slug}`}><a><FiArrowLeftCircle /><p>Go Back to Class</p></a></Link></div>
            <div className={styles.goBack}><Link href={`/class/${slug}/assignments`}><a><FiArrowLeftCircle /><p>View All Assignments</p></a></Link></div>
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
                  {assignmentData.hasSubmitted 
                  ?
                    <p style={{ color: '#05ca37' }}>Submitted</p> 
                  :
                    <>{hasTime ? <p style={{ color: '#04a1e9' }}>Assigned</p> : <p style={{ color: '#ec1919' }}>Missing</p>}</>
                  }
                </div>
                {error && <div style={{textAlign: 'center', marginTop: '10px', fontWeight: '600', color: '#e42e27', fontSize: '15px'}}>{error}</div>}
                <div className={styles.inputField}>
                  <input id='fileURL' placeholder=" " value={assignmentFileURL} onChange={(e)=> setAssignmentFileURL(e.target.value)} className={styles.inputBox} type="text" />
                  <label htmlFor="fileURL" className={styles.inputLabel}>Enter File URL</label>
                </div>
                <p className={styles.divider}>OR</p>
                <div className={styles.uploadFile}>
                  <input type="file" id="assignmentFile" onChange={(e) => handleUpload(e)} />
                  <label htmlFor="assignmentFile">
                    <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
                  </label>
                </div>
                <button disabled={!submitLoading ? false : true} className={`${styles.btn} ${styles.btn2}`} style={submitLoading ? { cursor: 'no-drop', paddingBlock: '8px' } : { letterSpacing: '.5px' } } onClick={() => handleSubmit()}>{!submitLoading ? 'Submit Assignment' : <CircularLoader color='#00ccff' />}</button>  
              </div>
            </main>
          </>
        }
      </div>
    )
}

export default Assignment