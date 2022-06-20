import React, { useContext, useState, useEffect } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import Link from 'next/link'
import styles from '../styles/Component.module.scss'
import AuthContext from '../stores/authContext'
import axios from 'axios'

const Header = () => {

  const authContext = useContext(AuthContext)

  const UserID = authContext.userID ? authContext.userID._id : false

  // console.log(UserID);

  const handleLogout = async () => {
    const user = await axios.get('/api/auth/logoutuser')
    // console.log(user.data)
  }

  return (
    <div className={styles.header_container}>
        <div className={styles.header_left}><h2><Link href="/">Classroom</Link></h2></div>
        <ul className={styles.header_center}>
          {!UserID ? 
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Signup</Link></li>
            </>
            : <li style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</li>
          }
         
        </ul>
        <div className={styles.header_right}>
            <div className={styles.header_plusIcon}><AiOutlinePlus /></div>
        </div>
    </div>
  )
}

export default Header
