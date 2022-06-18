import { serialize } from 'cookie'

export default async function handler (req, res) {

    const { cookies } = req

    const token = cookies.authToken

    if(!token){
        res.send({error: 'You are already Logged Out'})
        return
    }
    const serialised = serialize("authToken", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1, // Instantly
        path: "/"
    })

    res.setHeader('Set-Cookie', serialised)
    res.status(200).send({success: 'Successfully Logged out!'})
}