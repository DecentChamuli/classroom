import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Classroom</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>

      <main className={styles.main}>
        {/* When user has no class Joined */}
        {/* <div className={styles.noClass}>
          <p>You have not joined or created any class</p>
          <Link href="/login"><button className={styles.btn}>Join Now</button></Link>
        </div> */}

        {/* When there are classes */}
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

      </main>

    </div>
  )
}
