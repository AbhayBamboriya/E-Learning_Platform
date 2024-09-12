import React, { useState } from 'react';
import axios from 'axios';

const PostDoubt = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve token from localStorage or some auth context
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post('http://localhost:3001/doubts', {
        title,
        description
      }, {
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 200) {
        alert('Doubt posted successfully!');
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error posting doubt', error);
      alert('Failed to post doubt');
    }
  };

  return (
    <div>
      <h2>Post a Doubt</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Post Doubt</button>
      </form>
    </div>
  );
};

export default PostDoubt;
