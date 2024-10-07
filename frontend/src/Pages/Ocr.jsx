import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';

function OCRPage() {
    const { userId } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [ocrResult, setOcrResult] = useState({});

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8800/api/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { result } = response.data;
            const ocrData = result[0].prediction.reduce((acc, item) => {
                if (item.label === 'Name') {
                    acc.name = item.ocr_text;
                } else if (item.label === 'Subjects') {
                    acc.subjects = item.ocr_text.split('\n');
                } else if (item.label === 'Grades') {
                    acc.grades = item.ocr_text.split('\n');
                }
                return acc;
            }, {});

            // Make a POST request to insert OCR data
            await axios.post('http://localhost:8800/api/ocr-data', {
                subjects: ocrData.subjects,
                grades: ocrData.grades,
                userId,
                name: ocrData.name
            });

            setOcrResult(ocrData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar2 />
            <div className="login-container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="login-header">
                        <h1> Marksheet Submission </h1>
                        <p>Upload your O-levels Marksheet. (png, jpg, pdf)</p>
                    </div>

                    <div className="row p-5 m-1">
                        <div className="col-lg-12">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h1 className="text-center">User ID: {userId}</h1>
                                    <form className="mt-4" onSubmit={handleSubmit}>
                                        <div className="input-group mb-3">
                                            <input type="file" className="form-control" onChange={handleFileSelect} />
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {ocrResult.name && (
                                <div className="card mt-4 w-100">
                                    <div className="card-body">
                                        <h2>Name:</h2>
                                        <p>{ocrResult.name}</p>
                                        <h2>Subjects and Grades:</h2>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Subject</th>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ocrResult.subjects.map((subject, index) => (
                                                    <tr key={index}>
                                                        <td>{subject}</td>
                                                        <td>{ocrResult.grades[index]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OCRPage;
