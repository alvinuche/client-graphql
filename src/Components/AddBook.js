import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS_QUERY ,GET_AUTHORS_QUERY, ADD_BOOK_MUTATION } from '../queries/queries'



function AddBook() {
  const [values, setValues] = useState({
    name: '',
    genre: '',
    authorId: ''
  });
    const { loading, error,  data } = useQuery(GET_AUTHORS_QUERY);
    const [addBook, fetchData] = useMutation(ADD_BOOK_MUTATION);

    const { name, genre, authorId } = values;

    const displayAuthors = (loading, data) => {
      if(loading){
        return <option disabled>Loading...</option>
      }
      else {
        return data && data.authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)
      }
    }

    const handleError = (err) => <option disabled style={{color: 'red'}}>Error. {err.message.substring(0, 23)}</option>

    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value});
    }

    const handleSubmit = event => {
      event.preventDefault();
      console.log(fetchData);
      addBook({
        variables: {name, genre, authorId},
        refetchQueries: [{ query: GET_BOOKS_QUERY }]
      });
      setValues({
        ...values,
        name: '',
        genre: '',
        authorId: ''
      });
    }

    return (
        <form id="add-book">
            <div className="field">
                <label>Book name:</label>
                <input onChange={handleChange('name')} type="text" value={name}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input onChange={handleChange('genre')} type="text" value={genre}/>
            </div>


            <div className="field">
                <label>Author:</label>
                <select onChange={handleChange('authorId')} name="" id="" value={authorId}>
                  <option hidden>Select author</option>
                  {displayAuthors(loading, data)}
                  {error && handleError(error)}
                </select>

            </div>

            <button onClick={handleSubmit} type="submit">+</button>
        </form>
    );
  }
  
  export default AddBook;