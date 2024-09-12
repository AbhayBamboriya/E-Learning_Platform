import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoubtList = () => {
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/doubts');
        setDoubts(response.data);
      } catch (error) {
        console.error('Error fetching doubts', error);
      }
    };

    fetchDoubts();
  }, []);

  return (
    <div>
      <h2>All Doubts</h2>
      {doubts.length > 0 ? (
        <ul>
          {doubts.map((doubt) => (
            <li key={doubt.id}>
              <h3>{doubt.title}</h3>
              <p>{doubt.description}</p>
              <small>Posted by: {doubt.student_name}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doubts found.</p>
      )}
    </div>
  );
};

export default DoubtList;
