import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import AuthContext from '../stores/authContext'
import { AiOutlinePlus } from "react-icons/ai"
import axios from 'axios'

export default function Home() {

  const authContext = useContext(AuthContext)

  const [userClasses, setClasses] = useState([])
  
  let UserID = authContext.userID

  useEffect(() => {
    const fetchClass = async () => {
      if(UserID){
        const userClassData = await axios.post('/api/class/getuserclasses', {id: UserID})
        return setClasses(userClassData.data)

        /*
        classroomCode: "kxvfO390"
        classroomDesc: ""
        classroomName: "Another Class"
        classroomSlug: "uyPMXt0QQDcN2jg"
        classroomTeacher: "62b08d0054ba3e17c5b188e7"
        createdAt: "2022-06-24T15:29:17.771Z"
        updatedAt: "2022-06-24T15:29:17.771Z"
        */

      }
    }
    fetchClass()
  }, [UserID])

  return (
    <div>
      <Head>
        <title>Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>

      {!UserID ?
        <div className={styles.nothing}>
          <div className={styles.container}>
            <p className={styles.loginText}>Login to View Classes</p>
            <Link href="/login"><button className={styles.btn}>Join Now</button></Link>
          </div>
        </div>
        :
        <>
          {!userClasses.length ?
            <div className={styles.nothing}>
              <div className={styles.container}>
                <p>Click <AiOutlinePlus className={styles.icon} /> to Create or Join Class </p>
              </div>
            </div>
            :
            <main className={styles.main}>
              <div className={styles.container}>
                <ul className={styles.ul}>
                  {userClasses.map((userClass, index) => (
                    <Link href={`/class/${userClass.classroomSlug}`} key={index}>
                      <li className={styles.li}>
                        <div className={styles.boxTop}>
                          {userClass.classroomName}
                        </div>
                        <div className={styles.boxBottom}>
                          {userClass.classroomCode}
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </main>
          }
        </>
      }
    </div>
  )
}
