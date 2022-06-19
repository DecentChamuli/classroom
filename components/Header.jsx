import React, { useContext} from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import Link from 'next/link'
import styles from '../styles/Component.module.scss'
import AuthContext from '../stores/authContext'
import axios from 'axios'
import Cookies from 'js-cookie'
import { verify } from 'jsonwebtoken'

const Header = () => {

  const a = useContext(AuthContext)

  const token = Cookies.get('authToken')
  // console.log(token);

  let userID = token && verify(token, 'mytokensecret32')
  // console.log(userID);

  const handleLogout = async () => {
    const user = await axios.get('/api/auth/logoutuser')

    console.log(user.data)
  }

  return (
    <div className={styles.header_container}>
        <div className={styles.header_left}><h2><Link href="/">Classroom</Link></h2></div>
        <ul className={styles.header_center}>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/signup">Signup</Link></li>
          <li style={{cursor: 'pointer'}} onClick={handleLogout}>Logout</li>
          <li>{a}</li>
        </ul>
        <div className={styles.header_right}>
            <div className={styles.header_plusIcon}><AiOutlinePlus /></div>
        </div>
    </div>
  )
}

export default Header
