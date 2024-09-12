import axios from "axios";
import { useEffect, useState } from "react";

const AllDoubtes = () => {
    const [doubts, setDoubts] = useState([]);
  
    // Fetch the doubts when the component is mounted
    useEffect(() => {
      const fetchDoubts = async () => {
        try {
          const res = await axios.get('http://localhost:5000/doubts/', { withCredentials: true });
          {console.log('res in vdfjfdfj',res);}
          
          setDoubts(res.data); // Assuming res.data is an array of doubts
        } catch (err) {
          console.error('Error fetching doubts:', err);
        }
      };
  
      fetchDoubts();
    }, []);
  
    return (
      <div>
        <h2>List of Doubts</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {console.log('dfjjfdf',doubts,doubts?.Doubts?.length)
            }
            {doubts?.Doubts?.length > 0 ? (
              doubts?.Doubts?.map((doubt, index) => (
                
                <tr key={index}>
                  <td>{doubt.title}</td>
                  <td>{doubt.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No doubts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  export default AllDoubtes