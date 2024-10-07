import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2'

const CollegeForm = () => {
    const { userId } = useParams();
 
    const [formField, setFormField] = useState([
         { CollegeID: userId, Question: "" },
    ]);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event, index) => {
        let data = [...formField];
        data[index][event.target.name] = event.target.value;
        setFormField(data);
    };

    const AddField = () => {
        let object = { CollegeID: userId, Question: "" };
        setFormField([...formField, object]);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const formattedData = formField.map(question => [
                question.CollegeID,
                question.Question,
            ]);

            await axios.post("http://localhost:8800/form", formattedData);
            setSubmitted(true); // Set submitted to true upon successful submission
            
            // Reload the page after 5 seconds
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } catch(err) {
            console.log(err);
        }
    }

    const RemoveField = (index) => {
        let data = [...formField];
        data.splice(index, 1);
        setFormField(data);
    }

    return (
        <div>
            <Navbar2 />
            <div className="login-container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="login-header">
                        <h1>Create Admission Form</h1>
                        <p>Add questions that you would like to add in your college's admission Form.</p>
                    </div>
                    <div className="login-card">
                        <form>
                            {formField.map((form, index) => (
                                <div key={index} className="mt-3">
                                    <input
                                        name='Question'
                                        className="form-control"
                                        placeholder='Enter your question'
                                        onChange={(event) => handleChange(event, index)}
                                        value={form.Question}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger mt-3"
                                        onClick={() => RemoveField(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button"
                                className="btn btn-secondary mt-3"
                                onClick={AddField}
                            >
                                Add Question
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mt-4"
                                onClick={handleClick}
                            >
                                Submit
                            </button>
                            {submitted && <p style={{ color: 'green' }}>Submitted</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollegeForm;
