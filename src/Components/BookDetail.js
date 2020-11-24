import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BOOK_QUERY } from '../queries/queries'


function BookDetail({bookId}) {
  const [bookDetail, { loading, error,  data }] = useLazyQuery(GET_BOOK_QUERY);

  const handleDetails = (id) => {
    return id && bookDetail({
      variables: {id: id}
    });
  }

  useEffect(() => {
    // console.log(bookId);
    handleDetails(bookId);
  }, [bookId]);

  const displayBookDetail = (loading, error, data) => {
      const { name, genre, author: { age, books, name: authorName } } = data.book

      if(loading) return <p>Loading...</p>;
      if(error) return <p>Error: {error.message}</p>;

      return (
        <div>
          <h4>{name}</h4>
          <p>{genre}</p>
          <p>{authorName}</p>
          <p>Other books</p>
          <ul className="other-books">
            {books.filter((book) => {
              return book.name !== name
            }).map((newBook) => <li key={newBook.id}>{newBook.name}</li>)}
          </ul>
        </div>
      )
  }

  
 
  return (
    <div id="book-details">
      <h2>{bookId ? 'Selected book details' : 'No book selected.'}</h2>
      {data && displayBookDetail(loading, error, data)}
    </div>
  );
}

export default BookDetail;
