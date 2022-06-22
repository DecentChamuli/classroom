import React, { useContext, useState } from 'react'
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { BsFillPersonFill } from 'react-icons/bs'
import Link from 'next/link'
import styles from '../styles/Component.module.scss'
import AuthContext from '../stores/authContext'
import axios from 'axios'

const Header = () => {

  const [dropdown, setDropdown] = useState(false)

  const [modal, showModal] = useState(false)
  
  const authContext = useContext(AuthContext)
  
  let UserID = authContext.userID
  
  const handleLogout = async () => {
    const user = await axios.get('/api/auth/logoutuser')
    // console.log(user.data)
  }
  
  return (
    <>
      <div className={styles.header_container}>
        <div className={styles.header_left}><h2><Link href="/">Classroom</Link></h2></div>
        <div className={styles.header_right}>
          {!UserID ?
            <ul className={styles.join}>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/signup">Signup</Link></li>
            </ul>
            :
            <>
              <div onClick={() => showModal(true) } className={`${styles.header_Icon} ${styles.header_plusIcon}`}><AiOutlinePlus /></div>
              <div onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className={`${styles.header_Icon} ${styles.header_accountIcon}`}><BsFillPersonFill /></div>
              {dropdown &&
                <ul onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className={styles.dropDown}>
                  <li>Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              }
            </>
          }
        </div>
      </div>
      {modal &&
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <p>Join Class</p>
              <span className={styles.closeIcon} onClick={ () => showModal( false) }><AiFillCloseCircle /></span>
            </div>
            <div className={styles.modalBody}>
              <h3>Class Code</h3>
              <p>Ask your teacher for the class code, then enter it here.</p>
              <div className={styles.inputField}>
                <input id='classCode' placeholder=" " className={styles.inputBox} type="text" />
                <label htmlFor="classCode" className={styles.inputLabel}>Class Code</label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnJoin}>Join Class</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Header
