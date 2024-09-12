// src/components/GetResources.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GetResources.css'; // Import your CSS file

const GetResources = () => {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/doubts/Getpdf',{ withCredentials: true }); // Ensure 'http://' is included
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="uploads-table-container">
            <h1>Uploads</h1>
            {console.log("in upload",uploads)}
            <table>
                <thead>
                    <tr>
                        <th>Teacher Name</th>
                        <th>Subject</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {uploads.data.map((upload, index) => (
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
