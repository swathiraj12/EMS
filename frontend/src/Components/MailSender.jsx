import { useState } from 'react';
import axios from 'axios';
import '../Assets/CSS/MailSender.css'
import toast, { Toaster } from "react-hot-toast";

const MailSender = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    // Hot toast notification---
    // Success notification
    const notifySuccess = (msg) =>
        toast.success(msg, {
            style: {
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "rgb(17, 40, 51)",
            },
        });
    // Error notification
    const notifyError = (msg) =>
        toast.error(msg, {
            style: {
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "rgb(17, 40, 51)",
            },
        });
    // Function to Send email to all employees
    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:4000/sendmail-all', { subject, message });
            console.log(response.data);

            console.log('Email Subject:', subject);
            console.log('Email Message:', message);

            notifySuccess(response.data.message || 'Mail sent to all')

            setSubject('')
            setMessage('')

        } catch (error) {
            console.log('Error sending email:', error);
            notifyError("Error sending email to all employees")
        }
    };
    return (
        <>
            {/* React hot toast  */}
            <Toaster position="top-right" reverseOrder={false} />
            <div className='d-flex justify-content-center'>
                <div className='container mail-form mt-5'>
                    <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Subject"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Enter your message here"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    {/* Call to action button - send email */}
                    <div className='d-flex justify-content-center'>
                        <button className="btn send-btn" onClick={() => sendEmail(true)}>
                            Send to All Employees
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MailSender