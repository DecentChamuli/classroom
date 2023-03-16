import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Assignments = () => {

    const router = useRouter()

    const { slug } = router.query

    const [assignmentsData, setAssignments] = useState([])

    useEffect(() => {
        const fetchAllAssignment = async () => {
          const res = await axios.post('/api/class/getallassignments', { classroomSlug: slug })
          res.data.success ? setAssignments(res.data.success) : console.log(res.data)
          return
        }
        fetchAllAssignment()
    }, [slug, router])

    return (
        <div>
            <Head>
                <title>All Assignments</title>
                <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
            </Head>
            <div style={{textAlign: 'center', margin: '50px 0', fontWeight: '700', color: 'red'}}><Link href={`/class/${slug}`}><p>Go Back to Class</p></Link></div>
            <h2 style={{ textAlign: 'center', margin: '50px 0' }}>All Assignments</h2>
            {assignmentsData?.map((assignment, index) => (
                <div key={index} style={{ textAlign: 'center', color: 'blue', margin: '20px 0 50px', fontWeight: '600' }}>
                    <Link href={`/class/${slug}/assignments/${assignment.assignmentSlug}`}>{assignment.assignmentTitle}</Link><br />
                </div>
            ))}
        </div>
    )
}

export default Assignments