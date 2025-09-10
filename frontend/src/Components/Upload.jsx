import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {
    const [subject, setSubject] = useState('');
    const [branch, setBranch] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [book, setBook] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [YearOfPapar, SetYearOfPaper] = useState('');

    let loading = false;

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleyearOfPaper = (event) => {
        SetYearOfPaper(event.target.value);
    };

    const handleBranchChange = (event) => {
        setBranch(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleBookChange = (event) => {
        setBook(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleType = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('type. ', type);
        console.log('here  cxxx,', type, subject, book, year);
        loading = true;

        if (type == "Book") {
            const toastId = toast.loading('Wait, File is Uploading');
            if (!subject || !book || !year || !file) {
                toast.error('All Fields are Mandatory');
                return;
            }
            const formData = new FormData();
            formData.append('subjectName', subject);
            formData.append('bookName', book);
            formData.append('bookFile', file);
            formData.append('year', year);

            try {
                console.log('req of upload', formData);
                const response = await axios.post('http://localhost:5000/doubts/uploadBook', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });

                if (response?.data?.success) toast.update(toastId, { render: 'Book Uploaded Successfully!!!', type: 'success', isLoading: false });

                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error uploading file. Please try again.', error);
                console.log(error);
            }
        }
        else if (type == "Notes") {
            const toastId = toast.loading('Wait, File is Uploading');
            if (!file || !subject || !description || !year || !branch) {
                toast.error('All Fields are Mandatory');
                return;
            }

            const formData = new FormData();
            formData.append('subject', subject);
            formData.append('year', year);
            formData.append('description', description);
            formData.append('branch', branch);
            formData.append('pdf', file);

            try {
                console.log('req of upload', formData);
                const response = await axios.post('http://localhost:5000/doubts/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });

                if (response?.data?.success) toast.update(toastId, { render: 'Notes Uploaded Successfully!!!', type: 'success', isLoading: false });

                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error uploading file. Please try again.', error);
                console.log(error);
            }
        }
        else {
            const toastId = toast.loading('Wait, File is Uploading');
            if (!subject || !branch || !YearOfPapar || !year || !file) {
                toast.error('All Fields are Mandatory');
                return;
            }
            const formData = new FormData();
            formData.append('subjectName', subject);
            formData.append('year', year);
            formData.append('paperYear', YearOfPapar);
            formData.append('branch', branch);
            formData.append('questionPaper', file);

            try {
                console.log('req of upload', formData);
                const response = await axios.post('http://localhost:5000/doubts/uploadPaper', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                });

                if (response?.data?.success) toast.update(toastId, { render: 'PYQ Uploaded Successfully!!!', type: 'success', isLoading: false });

                setMessage(response.data.message);
            } catch (error) {
                setMessage('Error uploading file. Please try again.', error);
                console.log(error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl max-w-lg mx-auto my-5">
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
            <h1 className="text-2xl font-bold text-gray-800 mb-5 font-sans">Upload Resources</h1>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-4">
                    <select 
                        id="options" 
                        className="w-full border border-gray-300 text-base p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                        name='type' 
                        value={type} 
                        onChange={handleType}
                    >
                        <option value="" disabled>Type</option>
                        <option value="Book">Book PDF</option>
                        <option value="PYQ">PYQ</option>
                        <option value="Notes">Notes</option>
                    </select>

                    {(type == "Book" || type == "PYQ" || type == "Notes") && (
                        <>
                            <label className="block">
                                <span className="block mb-2 text-lg text-gray-600 font-sans">Subject:</span>
                                <input 
                                    type="text" 
                                    value={subject} 
                                    onChange={handleSubjectChange} 
                                    required 
                                    className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                />
                            </label>

                            <label className="block">
                                <span className="block mb-2 text-lg text-gray-600 font-sans">Year:</span>
                                <select 
                                    id="year-options" 
                                    className="w-full border border-gray-300 text-base p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                                    name='year' 
                                    value={year} 
                                    onChange={handleYearChange}
                                >
                                    <option value="" disabled>Year</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                </select>
                            </label>

                            {type == "Notes" && (
                                <label className="block">
                                    <span className="block mb-2 text-lg text-gray-600 font-sans">Description:</span>
                                    <input 
                                        type="text" 
                                        value={description} 
                                        onChange={handleDescriptionChange} 
                                        required 
                                        className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    />
                                </label>
                            )}

                            <label className="block">
                                <span className="block mb-2 text-lg text-gray-600 font-sans">Branch:</span>
                                <input 
                                    type="text" 
                                    value={branch} 
                                    onChange={handleBranchChange} 
                                    required 
                                    className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                />
                            </label>

                            {type == "PYQ" && (
                                <label className="block">
                                    <span className="block mb-2 text-lg text-gray-600 font-sans">Year of Paper:</span>
                                    <input 
                                        type="text" 
                                        value={YearOfPapar} 
                                        onChange={handleyearOfPaper} 
                                        required 
                                        className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    />
                                </label>
                            )}
                        </>
                    )}

                    {type == "Book" && (
                        <label className="block">
                            <span className="block mb-2 text-lg text-gray-600 font-sans">Book Name:</span>
                            <input 
                                type="text" 
                                value={book} 
                                onChange={handleBookChange} 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-lg text-base focus:border-blue-500 focus:outline-none transition-colors duration-300"
                            />
                        </label>
                    )}
                </div>

                <div>
                    <label className="block">
                        <span className="block mb-2 text-lg text-gray-600 font-sans">PDF File:</span>
                        <input 
                            type="file" 
                            accept=".pdf" 
                            onChange={handleFileChange} 
                            required 
                            className="block my-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors duration-300"
                        />
                    </label>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg text-base font-bold cursor-pointer transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Upload
                </button>
            </form>
            
            {message && (
                <p className="mt-5 text-base text-red-600 font-sans">
                    {message}
                </p>
            )}
        </div>
    );
};

export default Upload;