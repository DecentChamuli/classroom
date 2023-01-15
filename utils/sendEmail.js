import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

const sendEmail = async (userName, userEmail, resetUrl, res) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587, // TLS
        // port: 465, // SSL
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const mailGen = new Mailgen({
        theme: 'default',
        product: {
            name: "Classroom",
            link: 'https://classroom-by-dc.vercel.app/'
        }
    })

    const emailBody = mailGen.generate({
        body: {
            signature: false,
            // greeting: false,
            name: userName,
            intro: 'You have received this email because you\'ve requested Password Reset for your account.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#008AE6',
                    text: 'Reset your Password',
                    link: resetUrl,
                    fallback: {
                        text: 'If you\'re having trouble clicking the "Reset your Password" button, copy and paste the URL below into your browser."'
                    }
                }
            },
            outro: ['Please note that the reset link is valid for 15-minutes only.','If you did not request a password reset, just ignore this email.']
        }
    })

    try {
        await transporter.sendMail({
            from: '"Classroom" <tahiralimail@zohomail.com>', // sender address
            to: userEmail, // list of receivers
            subject: "Reset Password", // Subject line
            html: emailBody, // html body
        })
        return res.status(200).send({success: 'Email Sent Successfully'})
    } catch (error) {
        return res.status(401).send({error: error.message})
    }
}

export default sendEmail