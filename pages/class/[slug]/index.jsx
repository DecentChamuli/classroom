import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { AiTwotoneSetting } from 'react-icons/ai'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import styles from '../../../styles/Slug.module.scss'
import AuthContext from '../../../stores/authContext'
import axios from 'axios'

const Slug = () => {

  const router = useRouter()
  const { slug } = router.query

  const authContext = useContext(AuthContext)

  const [classInfo, setClassInfo] = useState([])
  
  let UserID = authContext.userID
  
  useEffect(() => {
    const credentials = {
      classroomSlug: slug,
      userID: UserID
    }
    const fetchClassData = async () => {
      if(UserID){
        const classData = await axios.post('/api/class/getclass', credentials)
        // console.log(classData.data);
        return setClassInfo(classData.data)
      }
    }
    fetchClassData()
  }, [UserID, slug])

  /*
    classInfo:
    classroomCode: "rxv4Pll5"
    classroomDesc: "This is created by Two"
    classroomMembers: ['62b08d0054ba3e17c5b188e7']
    classroomName: "Class by User Two"
    classroomSlug: "Dr-biBVNU1Eyhqs"
    classroomTeacher: "62b08cc154ba3e17c5b188e3"
    createdAt: "2022-07-06T18:45:06.381Z"
    updatedAt: "2022-07-06T18:45:41.682Z"
  */

  return (
    <div>
      <Head>
        <title>{classInfo.success ? classInfo.classInfo.classroomName : 'No Class Exist'}</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <main className={styles.main}>
        {classInfo.success ?
          <>
            <div className={styles.top}>
              <div className={styles.classInfo}>
                <h1>{classInfo.classInfo.classroomName}</h1>
                <h3>{classInfo.classInfo.classroomDesc}</h3>
                <h3>Class Code: {classInfo.classInfo.classroomCode}</h3>
                <h2>Total Student(s): {classInfo.classInfo.classroomMembers.length}</h2>
                <span className={styles.settingIcon}><AiTwotoneSetting /></span>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.left}>This is somthing written on Left</div>
              <div className={styles.right}>This is somthing written on Right</div>
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
    </div>
  )
}

export default Slug