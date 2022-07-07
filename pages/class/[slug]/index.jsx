import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AiTwotoneSetting } from 'react-icons/ai'
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
          <div className={styles.classInfo}>
            <h1>This is Class Title</h1>
            <h3>This is Class Desc if Available</h3>
            <h2>Total Students: 2500</h2>
            <span className={styles.settingIcon}><AiTwotoneSetting /></span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>This is somthing written on Left</div>
          <div className={styles.right}>This is somthing written on Right</div>
        </div>
      </main>
    </div>
  )
}

export default Slug