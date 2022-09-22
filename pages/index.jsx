import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'
import AuthContext from '../stores/authContext'
import Cookies from 'js-cookie'
import { AiOutlinePlus } from "react-icons/ai"
import axios from 'axios'
import { DotsLoader } from '../components/Loader'

export default function Home() {

  const router = useRouter()

  const authContext = useContext(AuthContext)

  const [userClasses, setClasses] = useState([])
  const [isLoading, setLoading] = useState(false)

  let UserID = authContext.userID
  let setUserID = authContext.setUserID

  useEffect(() => {
    const fetchClass = async () => {
      if(UserID){
        setLoading(true)
        const userClassData = await axios.post('/api/class/getuserclasses', {id: UserID})
        if(userClassData.data.error){
          Cookies.remove('authToken')
          return setUserID(false)
        }
        setClasses(userClassData.data)
        setLoading(false)
        return 
      }
      else{
        router.push('/login')
      }
    }
    fetchClass()
  }, [UserID, router, setUserID])

  return (
    <div>
      <Head>
        <title>Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      {isLoading ? <DotsLoader loadingText="Loading Classes..." /> : <>
        {!userClasses.length ?
          <div className={styles.nothing}>
            <div className={styles.container}>
              <p>Click <AiOutlinePlus className={styles.icon} /> to Create or Join Class </p>
            </div>
          </div>
          :
          <main className={styles.main}>
            <div className={styles.container}>
              <div className={styles.allClasses}>
                {userClasses.map((userClass, index) => (
                  <Link href={`/class/${userClass.classroomSlug}`} key={index}>
                    <a><div className={styles.eachClass}>
                      <div className={styles.top}>
                        <h3>{userClass.classroomName}</h3>
                      </div>
                      <div className={styles.bottom}>
                        <span>{userClass.classroomCode}</span>
                      </div>
                    </div></a>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        }
      </>}
    </div>
  )
}