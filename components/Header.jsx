import React, { useContext, useState, useRef } from 'react'
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { BsFillPersonFill } from 'react-icons/bs'
import Link from 'next/link'
import styles from '../styles/Component.module.scss'
import AuthContext from '../stores/authContext'
import axios from 'axios'
import { MdError } from 'react-icons/md'
import { useRouter } from 'next/router'
import { CircularLoader } from '../components/Loader'
import Cookies from 'js-cookie'

const Header = () => {

  const router = useRouter()

  const classroomName = useRef("");
  const classroomDesc = useRef("");
  const classroomCode = useRef("");

  const [error, setError] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const [dropdownAccount, setDropdownAccount] = useState(false)
  const [dropdownClass, setDropdownClass] = useState(false)

  const [modalCreate, showModalCreate] = useState(false)
  const [modalJoin, showModalJoin] = useState(false)

  const [isLoading, setLoading] = useState(false)

  const authContext = useContext(AuthContext)

  let UserID = authContext.userID
  let setUserID = authContext.setUserID

  const handleLogout = async () => {
    // await axios.get('/api/auth/logoutuser')
    // setUserID(false)
    // setDropdownAccount(false)
    
    Cookies.remove('authToken')
    router.push('/')
  }

  const handleSuccess = (url) => {
    setError(false)
    showModalCreate(false)
    showModalJoin(false)
    setSubmitError(false)
    router.push('/class/'+url)
  }

  const handleCreate = async () => {
    if(classroomName.current.value === ""){
      setError(true)
      return
    }
    setError(false)

    setLoading(true)
    const credentials = {
      classroomName: classroomName.current.value,
      classroomDesc: classroomDesc.current.value,
      classroomTeacher: UserID
    }
    const createClass = await axios.post('/api/class/createclass', credentials)
    createClass.data.success ? handleSuccess(createClass.data.success) : console.log(createClass.data.error)
    setLoading(false)
  }
  
  const handleJoin = async () => {
    if(classroomCode.current.value === ""){
      setError(true)
      setSubmitError(false)
      return
    }
    setError(false)
    setLoading(true)
    const credentials = {
      classroomCode: classroomCode.current.value,
      id: UserID
    }
    const joinClass = await axios.post('/api/class/joinclass', credentials)
    joinClass.data.success ? handleSuccess(joinClass.data.success) : setSubmitError(joinClass.data.error)
    setLoading(false)
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
              <div onClick={() => setDropdownClass(true) } className={`${styles.header_Icon} ${styles.header_plusIcon}`}><AiOutlinePlus /></div>
              {dropdownClass &&
                <ul className={styles.dropDown} onMouseLeave={() => { setDropdownClass(false) }} style={{left: '-85px'}}>
                  <li onClick={() => showModalCreate(true) }>Create Class</li>
                  <li onClick={() => showModalJoin(true) }>Join Class</li>
                </ul>
              }
              <div onMouseEnter={() => { setDropdownAccount(true) }} onMouseLeave={() => { setDropdownAccount(false) }} className={`${styles.header_Icon} ${styles.header_accountIcon}`}><BsFillPersonFill /></div>
              {dropdownAccount &&
                <ul style={{left: '15px'}} onMouseEnter={() => { setDropdownAccount(true) }} onMouseLeave={() => { setDropdownAccount(false) }} className={styles.dropDown}>
                  <li>Profile</li>
                  <li onClick={()=>{handleLogout()}}>Logout</li>
                </ul>
              }
            </>
          }
        </div>
      </div>
      {modalJoin &&
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <p>Join Class</p>
              <span className={styles.closeIcon} onClick={ () => {showModalJoin(false); setError(false); setSubmitError(false); setLoading(false);} }><AiFillCloseCircle /></span>
            </div>
            <div className={styles.modalBody}>
              <h3>Class Code</h3>
              <p>Ask your teacher for the class code, then enter it here.</p>
              <div className={styles.inputField}>
                <input autoFocus id='classCode' ref={classroomCode} placeholder=" " className={styles.inputBox} type="text" />
                <label htmlFor="classCode" className={styles.inputLabel}>Class Code</label>
              </div>
              {error && <div className={styles.error}><span><MdError /></span>Class Code is required</div>}
              {submitError && <div className={styles.error}><span><MdError /></span>{submitError}</div>}
            </div>
            <div className={styles.modalFooter}>
              <button disabled={!isLoading ? false : true} className={styles.btnJoin} style={isLoading ? { padding: '3px 10px', cursor: 'no-drop' } : {}} onClick={()=>{handleJoin()}} >{!isLoading ? 'Join Class' : <CircularLoader color='#2b6d79' />}</button>
            </div>
          </div>
        </div>
      }
      {modalCreate &&
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <p>Create Class</p>
              <span className={styles.closeIcon} onClick={ () => {showModalCreate(false); setError(false); setLoading(false);} }><AiFillCloseCircle /></span>
            </div>
            <div className={styles.modalBody}>
              <p>You&apos;ll get Class Code after creating Class which can be used by students to Join Class.</p>
              <div className={styles.inputField}>
                <input autoFocus id='className' ref={classroomName} placeholder=" " className={styles.inputBox} type="text" />
                <label htmlFor="className" className={styles.inputLabel}>Class Name</label>
              </div>
              {error && <div className={styles.error}><span><MdError /></span>Class Name is required</div>}
              <div className={styles.inputField}>
                <input id='classDesc' ref={classroomDesc} placeholder=" " className={styles.inputBox} type="text" />
                <label htmlFor="classDesc" className={styles.inputLabel}>Class Description (Optional)</label>
              </div>
              <p>Class <span>Name</span> and <span>Description</span> are changeable</p>
            </div>
            <div className={styles.modalFooter}>
              <button disabled={!isLoading ? false : true} className={styles.btnJoin} style={isLoading ? { padding: '3px 10px', cursor: 'no-drop' } : {}} onClick={()=>{handleCreate()}}>{!isLoading ? 'Create Class' : <CircularLoader color='#2b6d79' />}</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Header
