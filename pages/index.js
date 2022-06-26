import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import AuthContext from '../stores/authContext'
import { AiOutlinePlus } from "react-icons/ai"
import axios from 'axios'

export default function Home() {

  const authContext = useContext(AuthContext)

  // const [userClasses, setClasses] = useState([])
  
  let UserID = authContext.userID

  useEffect(() => {

    // async function fetchClass(){
      if(UserID){
        const tempVar = axios.post('/api/class/getclass', {id: UserID})
        console.log(tempVar)
      }
    // }
    // fetchClass()
  }, [UserID])
  

  return (
    <div>
      <Head>
        <title>Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>

      {/* When User is not logged in */}
      {!UserID && 
        <div className={styles.nothing}>
          {/* <Login/> */}
          <div className={styles.container}>
            <p className={styles.loginText}>Login to View Classes</p>
            <Link href="/login"><button className={styles.btn}>Join Now</button></Link>
          </div>
        </div>
      }

      {/* When user has no class Joined */}
      <div className={styles.nothing}>
        <div className={styles.container}>
          {/* <p className={styles.loginText}>You have not joined or created any class</p> */}
          <p>Click <AiOutlinePlus className={styles.icon}/> to Create or Join Class </p>
        </div>
      </div>


      {/* When there are classes */}
      {/* <main className={styles.main}>
        <div className={styles.container}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <div className={styles.boxTop}>
                this is top
              </div>
              <div className={styles.boxBottom}>
                this is bottom
              </div>
            </li>
          </ul>
        </div>
      </main> */}

    </div>
  )
}
