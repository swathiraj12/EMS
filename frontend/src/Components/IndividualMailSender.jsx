import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Assets/CSS/MailSender.css';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

const IndividualMailSender = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();
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
    //Function to fetch user details by id
    const [users, setUsers] = useState({})

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/getuserbyid/${id}`)
            if (response.data && response.data.users) {
                setUsers(response.data.users)
            } else {
                console.error('No user details found in response')
            }

        } catch (error) {
            console.log('Error in fetching the users', error);
        }
    }
    useEffect(() => {
        fetchUserDetails()
    }, [])

    // Function to Send email to an individual employee
    const sendToIndividual = async () => {
        console.log('id:', id);

        try {
            const response = await axios.post(`http://localhost:4000/sendmail-indivi/${id}`, { subject, message })

            console.log(response.data);

            notifySuccess(response.data.message || `Mail Sent to ${users?.name}`)

            setSubject('');
            setMessage('');

        } catch (error) {
            console.log('Error sending email:', error);
            notifyError("Error sending email to individual employee")
        }
    };
    return (
        <>
            {/* React hot toast  */}
            <Toaster position="top-right" reverseOrder={false} />

            <h1 className='page-name text-center mx-5 mt-3' style={{ textTransform: 'uppercase' }}>MAIL SENDER FOR {users?.name}</h1>

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
                        <button className="btn send-btn" onClick={sendToIndividual}>
                            Send Email
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndividualMailSender