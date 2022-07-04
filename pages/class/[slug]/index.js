import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../../styles/Slug.module.scss'

const Slug = () => {

  const router = useRouter()
  const { slug } = router.query

  return (
    <div>
      <Head>
        <title>{slug}</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.classTitle}>
            <h2>{slug}</h2>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
        </div>
      </main>
    </div>
  )
}

export default Slug