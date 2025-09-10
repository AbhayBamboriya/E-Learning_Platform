import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetResources = () => {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [paper, setPaper] = useState([]);
    const [notes, setNotes] = useState([]);
    const [paperYear, setPaperYear] = useState('');
    const [subjectSearchTerm, setSubjectSearchTerm] = useState('');
    const [yearSearchTerm, setYearSearchTerm] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchUploads = async () => {
            console.log('called', type);
            try {
                if (type === "Book") {
                    const response = await axios.get('http://localhost:5000/doubts/allBooks', { withCredentials: true });
                    setBooks(response.data);
                } else if (type === "Notes") {
                    const response = await axios.get('http://localhost:5000/doubts/allNotes', { withCredentials: true });
                    setNotes(response.data);
                } else if (type === "PYQ") {
                    const response = await axios.get('http://localhost:5000/doubts/allPYQ', { withCredentials: true });
                    setPaper(response.data);
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

    const handleSubjectSearchChange = (event) => {
        setSubjectSearchTerm(event.target.value);
    };

    const handleYearSearchChange = (event) => {
        setYearSearchTerm(event.target.value);
    };

    const handlePaperYearSearch = (event) => {
        setPaperYear(event.target.value);
    };

    const handleType = (event) => {
        setType(event.target.value);
    };

    const filterBySubject = (data) => {
        if (!subjectSearchTerm) return data;
        return data.filter(item => item.subject_name?.toLowerCase().includes(subjectSearchTerm.toLowerCase()));
    };

    const filterByYear = (data) => {
        if (!yearSearchTerm) {
            console.log('bahaf', data);
            return data;
        }
        return data.filter(item => item.year?.toLowerCase().includes(yearSearchTerm.toLowerCase()));
    };

    const filterByPaperYear = (data) => {
        console.log('abhay', paperYear);
        if (!paperYear) {
            console.log('paper year abahy', paperYear, data);
            return data;
        }
        return data.filter(item => item?.PaperYear?.toString().includes(paperYear));
    };

    const Notes = () => {
        const filteredNotes = filterBySubject(notes?.data || []);
        const data = filterByYear(filteredNotes || []) || filteredNotes;
        console.log('data is in notes', data);

        return (
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Branch</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">URL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((m, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.Name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.subject}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{m.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.branch}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a 
                                        href={m.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                                    >
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

    const Books = () => {
        const filteredBooks = filterBySubject(books?.data || []);
        const data = filterByYear(filteredBooks || []) || filteredBooks;

        return (
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Teacher</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Book</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">URL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((m, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.subject_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.uploader_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.book_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a 
                                        href={m.cloudinary_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200"
                                    >
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

    const PYQ = () => {
        const filteredPYQs = filterBySubject(paper?.data || []);
        const data = filterByPaperYear(filteredPYQs || []) || filteredPYQs;
        const d = filterByYear(data || []) || data;
        console.log('daaa in parper', data);

        return (
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Branch</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Paper Year</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">URL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {d.map((m, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.subject_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.branch}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.year}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{m.PaperYear}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a 
                                        href={m.cloudinary_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200"
                                    >
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

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Educational Resources</h1>
                    <p className="text-lg text-gray-600">Access books, notes, and previous year questions</p>
                </div>

                {/* Controls Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="space-y-4">
                        {/* Type Selection */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Resource Type</label>
                            <select
                                className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                value={type}
                                onChange={handleType}
                            >
                                <option value="" disabled>Choose Type</option>
                                <option value="Book">📚 View Books</option>
                                <option value="PYQ">📝 View PYQ</option>
                                <option value="Notes">📋 View Notes</option>
                            </select>
                        </div>

                        {/* Search Filters */}
                        {type !== "" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Search by Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Enter subject name..."
                                        value={subjectSearchTerm}
                                        onChange={handleSubjectSearchChange}
                                        className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Search by Year</label>
                                    <input
                                        type="text"
                                        placeholder="Enter year..."
                                        value={yearSearchTerm}
                                        onChange={handleYearSearchChange}
                                        className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>

                                {type === "PYQ" && (
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Search by Paper Year</label>
                                        <input
                                            type="text"
                                            placeholder="Enter paper year..."
                                            value={paperYear}
                                            onChange={handlePaperYearSearch}
                                            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {type === "" && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Select a Resource Type</h3>
                            <p className="text-gray-600">Choose from books, notes, or previous year questions to get started</p>
                        </div>
                    )}
                    
                    {type === "Notes" && <Notes />}
                    {type === "PYQ" && <PYQ />}
                    {type === "Book" && <Books />}
                </div>
            </div>
        </div>
    );
};

export default GetResources;