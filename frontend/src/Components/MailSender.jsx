import { useState } from 'react';
import axios from 'axios';
import '../Assets/CSS/MailSender.css'

const MailSender = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:4000/sendmail-all', { subject, message });
            console.log(response.data);
            
            console.log('Email Subject:', subject);
            console.log('Email Message:', message);
            
            alert('Mail sent');

            setSubject('')
            setMessage('')

        } catch (error) {
            console.log('Error sending email:',error);
            
            alert('Error sending email');
        }
    };

  return (
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
                  <button className="btn send-btn" onClick={() => sendEmail(true)}>
                      Send to All Employees
                  </button>
              </div>
          </div>

      </div>
  )
}

export default MailSender