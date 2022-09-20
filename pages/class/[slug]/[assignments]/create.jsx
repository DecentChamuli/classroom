import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/CreateAssignment.module.scss'
import { FiUpload, FiChevronDown, FiArrowLeftCircle } from 'react-icons/fi'
import { CircularLoader } from '../../../../components/Loader'
import axios from 'axios'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Create = () => {

  const router = useRouter()
  const { slug } = router.query

  const [marks, setMarks] = useState("10")
  const [date, setDate] = useState(null)
  const [showFile, setShowfile] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const titleRef = useRef()
  const descRef = useRef()

  const handleSubmit = async () => {
    if(!titleRef.current.value.match(/([^\s])/) || !descRef.current.value.match(/([^\s])/) || !marks.match(/([^\s])/) || !date){ 
      // setInputError(true)
      console.log('Empty');
      // Null Error is still left for implementation
      return
    }
    setLoading(true)
    const data = {
      taskTitle: titleRef.current.value,
      taskDesc: descRef.current.value,
      taskMarks: Number(marks),
      classroomSlug: slug,
      dueDate: date.toISOString()
    }
    const response = await axios.post('/api/class/createassignment', data)
    // await response.data.success ? console.log(response.data.success) : console.log('fail')
    setLoading(false)
    await response.data.success ? router.push(`/class/${slug}/assignments/${response.data.success._id}`) : console.log('fail')

    // let allInputs = document.getElementsByTagName('input')
    // console.log(allInputs)
  }

  return (
    <div>
      <Head>
        <title>Create Assignment</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.goBack}><Link href={`/class/${slug}`}><a><FiArrowLeftCircle /><p>Go Back to Class</p></a></Link></div>
      <main className={styles.main}>
        <div className={styles.left}>
          <h1 className={styles.heading}>Create Assignment</h1>
          <div className={styles.inputField}>
            <input id='assignmentTitle' ref={titleRef} placeholder=" " className={styles.inputBox} type="text" />
            <label htmlFor="assignmentTitle" className={styles.inputLabel}>Assignment Title</label>
          </div>
          <div className={styles.inputField} style={{height: '150px'}}>
            <textarea id='assignmentDesc' ref={descRef} style={{fontSize: '17px', padding: '10px 1rem', fontWeight: '300'}} placeholder=" " className={styles.inputBox} />
            <label htmlFor="assignmentDesc" className={styles.inputLabel}>Assignment Description</label>
          </div>
          <div className={styles.uploadFile}>
            <p onClick={()=> setShowfile(!showFile)}>Upload Reference File <span style = {showFile ? {rotate: '-180deg'} : {}}><FiChevronDown /></span></p>
            <input type="file" id="assignmentFile" onChange={(e) => handleUpload(e)} />
            {showFile && <><label htmlFor="assignmentFile">
              <div className={styles.btn}><span><FiUpload /></span>Upload File</div>
            </label></>}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.marks}>
            <label htmlFor='totalMarks'>Total Marks:</label>
            <input type="number" id='totalMarks' value={marks} onChange={(e) => setMarks(e.target.value)} />
          </div>
          <div className={styles.date}>
            <label htmlFor='dueDate'>Due Date:</label>
            <DatePicker
              id='dueDate'
              className={styles.inputBox}
              selected={date}
              onChange={date => setDate(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              filterTime={filterPassedTime}
              showTimeSelect
              // showTimeInput
              timeIntervals={15}
              closeOnScroll={true}
              isClearable={true}
              showMonthDropdown
              withPortal
              placeholderText="Select Due Date with Time"
             />
          </div>
          <button disabled={!isLoading ? false : true} className={`${styles.btn} ${styles.btn2}`} style={isLoading ? { cursor: 'no-drop', paddingBlock: '6px'  } : {} } onClick={() => handleSubmit()}>{!isLoading ? 'Create Assignment' : <CircularLoader color='#00ccff' />}</button> 
        </div>
      </main>
    </div>
  )
}

export default Create