import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const Assignments = () => {

    const router = useRouter()

    const { slug } = router.query

    return (
        <div>
            <Head>
                <title>aaa</title>
                <meta name="description" content="Classroom built by Muhammad Tahir Ali" />
            </Head>
            <h2>Assignments of {slug}</h2>
        </div>
    )
}

export default Assignments