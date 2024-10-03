import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Assets/CSS/MailSender.css';
import { useParams } from 'react-router-dom';

const IndividualMailSender = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();

    // Send email to an individual employee
    const sendToIndividual = async () => {
        console.log('id:', id);

        try {
            const response = await axios.post(`http://localhost:4000/sendmail-indivi/${id}`, { subject, message })

            console.log(response.data);

            alert(`Mail sent to employee with ID: ${id}`);

            setSubject('');
            setMessage('');

        } catch (error) {
            console.log('Error sending email:', error);
            alert('Error sending email to individual employee');
        }
    };

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
    return (
        <>
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