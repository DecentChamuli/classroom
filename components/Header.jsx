import React, { useContext} from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import Link from 'next/link';
import styles from '../styles/Component.module.scss'
import AuthContext from '../stores/authContext';

const Header = () => {

  const a = useContext(AuthContext)

  return (
    <div className={styles.header_container}>
        <div className={styles.header_left}><h2><Link href="/">Classroom</Link></h2></div>
        <ul className={styles.header_center}>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/signup">Signup</Link></li>
          <li>{a}</li>
        </ul>
        <div className={styles.header_right}>
            <div className={styles.header_plusIcon}><AiOutlinePlus /></div>
        </div>
    </div>
  )
}

export default Header
