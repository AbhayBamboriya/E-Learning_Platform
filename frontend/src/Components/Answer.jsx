import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Answer = () => {
    const {doubtId}=useParams();
    const [answer,setAnswer]=useState([])
    useEffect(()=>{
        console.log('inside');
        
        const fetch=async () => {
            console.log('in');
            
            try{
                const res=await axios.get(`http://localhost:5000/doubts/answer/${doubtId}`)
                console.log('res is ',res);
                setAnswer(res?.data?.result)
            }     
            catch (err) {
                // setError('Error fetching data');
                // console.error('Error fetching data:', err);
            }

        }
        fetch()

    },[])
    const [inputText, setInputText] = useState('');
    const onSubmit = async () => {
      console.log('inside blure');
      if(inputText=='') {
        toast.error('Provide answer for Upload')
        return
      }
        try {
          const response = await axios.post(`http://localhost:5000/doubts/${doubtId}/answer`, 
            { answer: inputText }, // Ensure you're sending an object
      {
        withCredentials: true, // This option sends cookies and HTTP auth headers
      }
          
          );
    
          // const data = await response.json();
          console.log('Response from backend:', response);
          // window.location.reload();
          if(response?.data?.success){
            window.location.reload()
            toast.success('Answer Uploaded SuccessFully')
          }

        } catch (error) {
          console.error('Error sending data to backend:', error);
        }
      };
    
  return (
    <div className='text-center justify-space-evenly'>
        {/* <h1> id {`${doubtId}`}</h1> */}
        {console.log('in answer',answer)}
        <ToastContainer/>
        <table>
                <thead>
                    <tr>
                        <th>Answer </th>
                        <th>Uploaded By</th>
                    </tr>
                </thead>
                <tbody>
                    {answer.map((a, index) => (
                        <tr key={index}>
                            <td>{a.answer}</td>
                            <td>{a.teacherName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <input
        type="text"
        value={inputText}
        className="border-2 border-red-300 rounded-2xl p-2 mb-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your Answer"
      />
      <button onClick={onSubmit}>Upload</button>
    </div>
  )
}

export default Answer
