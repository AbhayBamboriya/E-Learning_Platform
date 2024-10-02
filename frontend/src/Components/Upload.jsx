import axios from 'axios';
import React, { useState } from 'react';
import './Upload.css'; // Ensure the CSS file is correctly imported
import { toast, ToastContainer } from 'react-toastify';

const Upload = () => {
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    let loading=false;
    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
    };

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        loading=true;
        event.preventDefault();
        const toastId=toast.loading('Wait, File is Uploading') 
        if (!subject || !file) {
          setMessage('Please provide both subject and file.');
          return;
        }
      
        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('pdf', file);
      
        try {
          const response = await axios.post('http://localhost:5000/doubts/upload-pdf', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials:true

          });
          console.log('req of upload',response);
          // if(response)  loading=false;
          if(response?.data?.success) toast.update(toastId, { render: 'Resource Upload successful!', type: 'success', isLoading: false });
          {
            
          }
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Error uploading file. Please try again.');
          console.error('Error:', error.response ? error.response.data : error.message);
        }
      };
      

    return (
      <div className="upload-container"> {/* Apply the CSS class here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <h1>Upload Resources</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Subject:
              <input type="text" value={subject} onChange={handleSubjectChange} required />
            </label>
          </div>
          <div>
            <label>
              PDF File:
              <input type="file" accept=".pdf" onChange={handleFileChange} required />
            </label>
          </div>
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
}

export default Upload;
