// Books.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/BookStyles.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/user");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/user/${id}`);
      // Update state without full page reload
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid books-container">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <h2 className="book-title">{book.Name}</h2>
          <p className="book-info">ID: {book.id}</p>
          <p className="book-info">Email: {book.email}</p>
          <div className="button-container">
            <button className="delete-button" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update-button">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        </div>
      ))}
      <button className="add-button">
        <Link to="/add">Add Records</Link>
      </button>
    </div>
  );
};

export default Books;
