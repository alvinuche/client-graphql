import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS_QUERY } from '../queries/queries';
import BookDetail from './BookDetail';


function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, error,  data } = useQuery(GET_BOOKS_QUERY);

  const displayBooks = (loading, err, data) => {
    if(loading) return <p>Loading...</p>;
    if(err) return <p>Error: {err.message}</p>;

    // console.log(data.books);
    return data.books.map((book) => <li onClick={() => setSelected(book.id)} key={book.id}>{book.name}</li>) 
  }

  return (
    <div>
        <ul id="book-list">
          {displayBooks(loading, error, data)}            
        </ul>
        <BookDetail bookId={selected}/>
    </div>
  );
}

export default BookList;
