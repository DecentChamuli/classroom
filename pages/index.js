import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import Login from './login'
import AuthContext from '../stores/authContext'

export default function Home() {

  const authContext = useContext(AuthContext)
  
  let UserID = authContext.userID

  return (
    <div>
      <Head>
        <title>Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>


      {/* When User is not logged in */}
      {!UserID && 
        <div className={styles.nothing}>
          <Login/>
          {/* <div className={styles.container}>
            <p>Login to View Classes</p>
            <Link href="/login"><button className={styles.btn}>Join Now</button></Link>
          </div> */}
        </div>
      }


      {/* When user has no class Joined */}
      {/* <div className={styles.nothing}>
        <div className={styles.container}>
          <p>You have not joined or created any class</p>
          <Link href="/login"><button className={styles.btn}>Join Now</button></Link>
        </div>
      </div> */}


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
