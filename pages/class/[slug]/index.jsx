import React, { useEffect, useContext, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { BsFillExclamationTriangleFill, BsThreeDotsVertical } from 'react-icons/bs'
import styles from '../../../styles/Slug.module.scss'
import AuthContext from '../../../stores/authContext'
import axios from 'axios'
import {DotsLoader} from '../../../components/Loader'

const Slug = () => {

  const router = useRouter()
  const { slug } = router.query

  const authContext = useContext(AuthContext)

  const [classInfo, setClassInfo] = useState([])
  const [renderKey, setRenderKey] = useState(0)
  const [isLoading, setLoading] = useState(false)

  const activityRef = useRef("")
  
  let UserID = authContext.userID
  
  useEffect(() => {
    const classCredentials = {
      classroomSlug: slug,
      userID: UserID
    }
    const fetchClassData = async () => {
      setLoading(true)
      if(UserID){
        const classData = await axios.post('/api/class/getclass', classCredentials)
        // console.log(classData.data);
        setClassInfo(classData.data)
        setLoading(false)
        return
        // return setClassInfo(classData.data)
      }
    }
    fetchClassData()
  }, [UserID, slug, renderKey])

  async function postActivity() {
    const activityCredentials = {
      classroomCode: classInfo.classInfo.classroomCode,
      byUser: classInfo.userInfo.name,
      postMsg: activityRef.current.value
    }
    await axios.post('/api/class/postactivity', activityCredentials)
    activityRef.current.value = ""
    setRenderKey(Math.random)
  }

  /*
    classInfo:
    classroomActivity: 
      0: {byUser: 'Admin One', postMsg: 'This is test Aonegain', _id: '62cd822a40765463527aa996', atDateTime: '2022-07-12T14:16:10.878Z'}
      1: {byUser: 'Admin One', postMsg: 'This is tsndfjdfnskest Aonegain', _id: '62cd9acbc057d4fb921d1bee', atDateTime: '2022-07-12T16:01:16.012Z'}
      2: {byUser: 'Admin One', postMsg: 'Post working Fine', _id: '62cd9b5cc057d4fb921d1bf6', atDateTime: '2022-07-12T16:03:40.129Z'}
    classroomAssignment: []
    classroomCode: "rxv4Pll5"
    classroomDesc: "This is created by Two"
    classroomMembers: (2) ['62b08d0054ba3e17c5b188e7', '62b2e12d5cf3b847054b3dc6']
    classroomName: "Class by User Two"
    classroomSlug: "Dr-biBVNU1Eyhqs"
    classroomTeacher: "62b08cc154ba3e17c5b188e3"

    userInfo:
    classesJoined: (3) ['62c56a9fbdc5a6fbe2b5330f', '62c5d8322b9df1d9fff98652', '62cd3ad540c142cb6e92c4e1']
    date: "2022-06-20T15:06:40.992Z"
    email: "admin@gmail.com"
    name: "Admin One"
    password: "$2a$10$iDy0I6hmWDS6DVVZLCFGauyMSYAiltvQICFdv2sXgl4Jn9rgT9Ora"
    role: "Admin"
    updatedAt: "2022-07-12T09:11:49.293Z"
    __v: 0
    _id: "62b08d0054ba3e17c5b188e7"
  */

  return (
    <div>
      <Head>
        <title>{classInfo.success ? classInfo.classInfo.classroomName : 'No Class Exist'}</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      {isLoading ? <DotsLoader/> : <>
        <main className={styles.main}>
          {classInfo.success ?
            <>
              <div className={styles.top}>
                <div className={styles.classInfo}>
                  <h1>{classInfo.classInfo.classroomName}</h1>
                  <h3>{classInfo.classInfo.classroomDesc}</h3>
                  <h3>Class Code: {classInfo.classInfo.classroomCode}</h3>
                  <h2>Total Student(s): {classInfo.classInfo.classroomMembers.length}</h2>
                  <span className={styles.settingIcon}><BsThreeDotsVertical /></span>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.left}>
                  {classInfo.classInfo.classroomTeacher === UserID ?
                    <>
                      <h4 style={{ paddingBottom: '0' }}>Create Assignment</h4>
                      <Link href={`${slug}/assignments/create`}><button className={styles.btn}>Create Now</button></Link>
                    </>
                    :
                    <>
                      <h4>Upcoming Submissions</h4>
                      <p>Wohoo! Nothing to do right now.</p>
                      <Link href={`${slug}/assignments`}><button className={styles.btn}>View All</button></Link>
                    </>
                  }
                </div>
                <div className={styles.right}>
                  <div className={styles.postInput}>
                    <input ref={activityRef} type="text" placeholder='Post Activity...'/>
                    <button className={styles.btn} onClick={()=>postActivity()}>Post Activity</button>
                  </div>
                  <div className={styles.activityTimeline}>
                    {classInfo.classInfo.classroomActivity.length ?
                      <>{
                        classInfo.classInfo.classroomActivity.map((eachActivity, index) => (
                          <p key={index}>{eachActivity.postMsg} by <span style={{fontWeight: '600', opacity: '0.6', color: 'blue'}}>{eachActivity.byUser}</span></p>
                        ))
                      }</>
                      :
                      <span style={{borderRadius: '4px', border: '0.1rem solid #d6d4d4', minHeight: '25vh', paddingTop: '10vh', paddingLeft: '20%', width: '100%', fontSize: '19px'}}>Class Activity will show up here</span>
                    }
                  </div>
                </div>
              </div>
            </>
            : 
            <div className={styles.noClass}>
              <span><BsFillExclamationTriangleFill /></span>
              <h2>{classInfo.error}</h2>
              <Link href='/'><p>Return to Home</p></Link>
            </div>
          }
        </main>
        </>}
    </div>
  )
}

export default Slug