    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import './GetResources.css'; // Import your CSS file

    const GetResources = () => {
        const [uploads, setUploads] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [books,setBooks]=useState()
        const [paper,setpaper]=useState()
        const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
        const [subjectSearchTerm, setSubjectSearchTerm] = useState('');
        const [type,setType]=useState('')
        useEffect(() => {
         
                const fetchUploads = async () => {
                    console.log('called',type);
                    
                    try {
                        if(type=="Book"){
                            const response = await axios.get('http://localhost:5000/doubts/allBooks', { withCredentials: true });
                            setBooks(response.data);
                        }
                        else{
                            const response = await axios.get('http://localhost:5000/doubts/allPYQ', { withCredentials: true });
                            setpaper(response.data);
                        }
                    } catch (err) {
                        setError('Error fetching data');
                        console.error('Error fetching data:', err);
                    } finally {
                        setLoading(false);
                    }
                };
            
          

            fetchUploads();
        }, [type]);

        const handleTeacherSearchChange = (event) => {
            setTeacherSearchTerm(event.target.value);
        };

        const handleSubjectSearchChange = (event) => {
            setSubjectSearchTerm(event.target.value);
        };

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        // Filter uploads based on the search terms\
        console.log('books',books);
        
        // const filteredUploads = paper.data.filter(upload => {
        //     const lowerCaseTeacherSearchTerm = teacherSearchTerm.toLowerCase();
        //     const lowerCaseSubjectSearchTerm = subjectSearchTerm.toLowerCase();
            
        //     const matchesTeacher = upload.teacherName.toLowerCase().includes(lowerCaseTeacherSearchTerm);
        //     const matchesSubject = upload.subject.toLowerCase().includes(lowerCaseSubjectSearchTerm);
            
        //     return matchesTeacher && matchesSubject; // Return true if both fields match
        // });
       
        const handleType=(event)=>{
            setType(event.target.value)
          }

        const Books=()=>{
           console.log('in books',books);
           
            
            return(
                <>
                    <div>
                    {/* <input
                        type="text"
                        placeholder="Search by Teacher Name"
                        value={teacherSearchTerm}
                        onChange={handleTeacherSearchChange}
                    />
                    <input
                        type="text"
                        placeholder="Search by Subject"
                        value={subjectSearchTerm}
                        onChange={handleSubjectSearchChange}
                    /> */}
                </div>
                <table>
                    <thead>
                        <tr>
                            {/* <th>Teacher Name</th> */}
                            <th>Subject</th>
                            <th>
                                Teacher
                            </th>
                            <th>Year</th>
                            <th>Book</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        books?.data.map((m,idx)=>(
                            <tr key={idx}>
                                <td>
                                    {m.subject_name}
                                </td>
                                <td>
                                   { m.uploader_name}
                                </td>
                                <td>
                                  {  m.year}
                                </td>
                                <td>
                                    {m.book_name}
                                </td>
                                <td>
                                   
                                   <a href={ m.cloudinary_url} target="_blank" rel="noopener noreferrer">
                                        View PDF
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                </>
            )
        }
        const PYQ=()=>{

            return(
                <>
                    <div>
                    {/* <input
                        type="text"
                        placeholder="Search by Teacher Name"
                        value={teacherSearchTerm}
                        onChange={handleTeacherSearchChange}
                    />
                    <input
                        type="text"
                        placeholder="Search by Subject"
                        value={subjectSearchTerm}
                        onChange={handleSubjectSearchChange}
                    /> */}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Branch</th>
                            <th>Year</th>
                            <th>Paper Year</th>
                            <th>URL</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                        paper.data.map((m,idx)=>(
                            <tr key={idx}>
                                <td>
                                    {m.subject_name}
                                </td>
                                <td>
                                   { m.branch}
                                </td>
                                <td>
                                  {  m.year}
                                </td>
                                <td>
                                    {m.PaperYear}
                                </td>
                                <td>
                                   
                                   <a href={ m.cloudinary_url} target="_blank" rel="noopener noreferrer">
                                        View PDF
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                </>
            )
        }
        return (
            <div className="uploads-table-container">
                <h1>Uploads</h1>
                {/* <Books/> */}
                {console.log("books are ",books,paper)
            }
            
                <select id="options" className="mt-1 block w-full border text-3 p-3 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='role' value={type} onChange={handleType}>
                <option value="" disabled selected>Type</option>
                <option value="Book">View Books</option>
                <option value="PYQ">ViewPYQ</option>
              </select>
                {
                    type=="" && <h1>Oops No Data</h1>
                }
                {
                    (type=="PYQ" && !type=="" )? <PYQ/> :<Books/>
                }
                            </div>
        );
    };

    export default GetResources;
