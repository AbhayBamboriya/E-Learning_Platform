import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { postDoubt } from '../Redux/Slices/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

const AskDoubt = () => {
    const [doubts, setDoubts] = useState([]);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        title: "",
        description: ""
    });

    // Fetch doubts when component mounts
    useEffect(() => {
        const fetchDoubts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/doubts/', { withCredentials: true });
                setDoubts(res.data || []);
            } catch (err) {
                console.error('Error fetching doubts:', err);
                setDoubts([]);
            }
        };
        fetchDoubts();
    }, []);

    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const addDoubt = async () => {
        if (!data.title.trim() || !data.description.trim()) {
            toast.error('Please fill in both title and description');
            return;
        }

        try {
            const res = await dispatch(postDoubt(data));
            if (res?.payload?.success) {
                toast.success("Doubt Uploaded Successfully");
                // Clear form
                setData({ title: "", description: "" });
                // Refresh doubts list
                const updatedRes = await axios.get('http://localhost:5000/doubts/', { withCredentials: true });
                setDoubts(updatedRes.data || []);
            } else {
                toast.error("Some Error Occurred");
            }
        } catch (error) {
            console.error('Error posting doubt:', error);
            toast.error("Failed to post doubt");
        }
    };

    return (
        <Container>
            <ToastContainer />
            <Title>Doubt Section</Title>
            
            {/* Post Form Section */}
            <FormSection>
                <FormTitle>Ask Your Doubt</FormTitle>
                <InputContainer>
                    <Input
                        type="text"
                        value={data.title}
                        name="title"
                        onChange={handleUserInput}
                        placeholder="Enter topic/title..."
                    />
                    <TextArea
                        rows="4"
                        value={data.description}
                        name="description"
                        onChange={handleUserInput}
                        placeholder="Describe your doubt in detail..."
                    />
                    <SubmitButton onClick={addDoubt}>Submit</SubmitButton>
                </InputContainer>
            </FormSection>
        </Container>
    );
};

export default AskDoubt;

// Styled Components
const Container = styled.div`
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Title = styled.h1`
    text-align: center;
    color: #495057;
    margin-bottom: 30px;
    font-family: 'Arial', sans-serif;
`;

const FormSection = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
    color: #495057;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const TextArea = styled.textarea`
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 16px;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.3s;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const SubmitButton = styled.button`
    padding: 12px 30px;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
    align-self: flex-start;

    &:hover {
        background-color: #0056b3;
    }
`;