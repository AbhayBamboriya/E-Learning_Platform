    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import './GetResources.css'; // Import your CSS file

    const GetResources = () => {
        const [uploads, setUploads] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
        const [subjectSearchTerm, setSubjectSearchTerm] = useState('');

        useEffect(() => {
            const fetchUploads = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/doubts/Getpdf', { withCredentials: true });
                    setUploads(response.data);
                } catch (err) {
                    setError('Error fetching data');
                    console.error('Error fetching data:', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchUploads();
        }, []);

        const handleTeacherSearchChange = (event) => {
            setTeacherSearchTerm(event.target.value);
        };

        const handleSubjectSearchChange = (event) => {
            setSubjectSearchTerm(event.target.value);
        };

        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;

        // Filter uploads based on the search terms
        const filteredUploads = uploads.data.filter(upload => {
            const lowerCaseTeacherSearchTerm = teacherSearchTerm.toLowerCase();
            const lowerCaseSubjectSearchTerm = subjectSearchTerm.toLowerCase();
            
            const matchesTeacher = upload.teacherName.toLowerCase().includes(lowerCaseTeacherSearchTerm);
            const matchesSubject = upload.subject.toLowerCase().includes(lowerCaseSubjectSearchTerm);
            
            return matchesTeacher && matchesSubject; // Return true if both fields match
        });

        return (
            <div className="uploads-table-container">
                <h1>Uploads</h1>
                <div>
                    <input
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
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>Subject</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUploads.map((upload, index) => (
                            <tr key={index}>
                                <td>{upload.teacherName}</td>
                                <td>{upload.subject}</td>
                                <td>
                                    <a href={upload.url} target="_blank" rel="noopener noreferrer">
                                        View PDF
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    export default GetResources;
