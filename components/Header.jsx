import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link';
import styles from '../styles/Component.module.css'

const Header = () => {
  return (
    <div className={styles.header_container}>
        <div className={styles.header_left}><h2><Link href="/">Classroom</Link></h2></div>
        <Link href="/login">Login</Link>
        <div className={styles.header_right}>
            <div className={styles.header_plusIcon}><AiOutlinePlus /></div>
        </div>
    </div>
  )
}

export default Header
