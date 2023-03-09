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
import { PickerInline } from 'filestack-react'

const Create = () => {

  const router = useRouter()
  const { slug } = router.query

  const FILESTACK_API_KEY = process.env.NEXT_PUBLIC_FILESTACK_API_KEY

  const [marks, setMarks] = useState("10")
  const [date, setDate] = useState(null)
  const [showFile, setShowfile] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState([])
  const [error, setError] = useState(false)

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const titleRef = useRef()
  const descRef = useRef()

  const handleSubmit = async () => {
    if(!titleRef.current.value.match(/([^\s])/) || !descRef.current.value.match(/([^\s])/) || !marks.match(/([^\s])/) || !date){ 
      setError('All Fields are Required except Reference File')
      return
    }
    setError(false)
    setLoading(true)
    const data = {
      assignmentTitle: titleRef.current.value,
      assignmentDesc: descRef.current.value,
      assignmentMarks: Number(marks),
      classroomSlug: slug,
      dueDate: date.toISOString()
    }
    const response = await axios.post('/api/class/createassignment', data)
    setLoading(false)
    await response.data.success ? router.push(`/class/${slug}/assignments/${response.data.success}`) : setError(response.data.error)
  }

  const handleUpload = async (event) => {
    // const fileName = event.target.files[0].name
    // const file = URL.createObjectURL(event.target.files[0])
    // const file = event.target.files[0]

    let form = new FormData()
    let IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY

    form.append('image', event.target.files[0])
    let xhr = new XMLHttpRequest()
    xhr.upload.addEventListener("progress", ProgressHandler, false)
    xhr.addEventListener("load", SuccessHandler, false)
    xhr.open("POST", `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`)
    xhr.send(form)

    // for(const eachFile of event.target.files){
    //   form.append('image', eachFile)
    //   try {
    //     console.log(eachFile)
    //     const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, form)
    //     console.log(res.data.data.url)
    //   } catch (error) {
    //     console.log(error.response.data)
    //   }
    // }

    event.target.value = null
  } 
  const ProgressHandler = (e) => {
    let percent = (e.loaded / e.total) * 100
    percent = Math.round(percent)
    if(percent % 10 === 0){
      console.log(`Loaded: ${(e.loaded/1024**2).toFixed(2)} MBs  Total: ${(e.total/1024**2).toFixed(2)} MBs  Percentage ${percent}%`)
    }
  }
  const SuccessHandler = (e) => {
    const res = JSON.parse(e.target.response)
    console.log(res.data.url)
  }

  /*
    filename: "with bg 2.jpg"
    handle: "RHpC4jYSS3uVYqOamFHu"
    mimetype: "image/jpeg"
    originalFile: {name: 'with bg 2.jpg', type: 'image/jpeg', size: 506661}
    originalPath: "with bg 2.jpg"
    size: 506661
    source: "local_file_system"
    status: "Stored"
    uploadId: "RT5tQXKzQ0zP7193"
    url: "https://cdn.filestackcontent.com/RHpC4jYSS3uVYqOamFHu"
  */

  /*
    let obj ={
      filename: "Lab File.docx"
    }
    let ext = obj.filename.split(".")
    console.log(ext[ext.length - 1])
  */

  return (
    <div>
      <Head>
        <title>Create Assignment</title>
        <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
      </Head>
      <div className={styles.goBack}><Link href={`/class/${slug}`}><a><FiArrowLeftCircle /><p>Go Back to Class</p></a></Link></div>
      {error && <div style={{textAlign: 'center', marginTop: '20px', fontWeight: '600', color: '#e42e27', fontSize: '17px'}}>{error}</div>}
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
            {/* <input type="file" accept="image/png, image/jpg, image/jpeg" multiple id="assignmentFile" onChange={(e) => handleUpload(e)} /> */}
            {showFile && <><label htmlFor="assignmentFile">
              <div style={{display: 'flex', flexDirection: 'column', marginBottom: '0.5rem'}}>
                <small>Reference File is Optional</small>
                <small style={{fontSize: '70%'}}>Allowed File Type: PNG, JPEG, JPG, DOCX, PDF.</small>
              </div>
              {/* <div className={styles.btn}><span><FiUpload /></span>Upload File</div> */}
              <PickerInline
                apikey= {FILESTACK_API_KEY}
                pickerOptions={{
                  accept: ['.png', '.jpg', '.jpeg', '.txt', '.pdf', '.docx'],
                  fromSources: ['local_file_system'],
                  maxFiles: uploadedFile.length === 0 ? 5 : 5 - uploadedFile.length, // Max is 5 in total
                  // maxFiles: 5,
                  maxSize: 5 * 1024 * 1024, // 5 MB
                }}
                onUploadDone={ res => {
                  // for(const eachFile of res.filesUploaded ){
                  //   console.log(eachFile)
                  // }
                  setUploadedFile(res.filesUploaded)
                  setShowfile(!showFile) 
                }}
              ><div className="fileStackPicker"></div></PickerInline>
            </label></>}
          </div>
          <div className={styles.uploadedFile}>
            <span>Uploaded Files</span>
            <div className={styles.allFiles}>
              <div style={{background: 'url("https://ucarecdn.com/a5c1cdc7-0b25-413c-9316-6b864cc5d497/-/resize/700/")'}} className={styles.singleFile}>PNG</div>
            </div>
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