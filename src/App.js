import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookList from './Components/BookList';
import AddBook from "./Components/AddBook";


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache({
    resultCaching: true
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <header>
          <h1 id="head-title">Books App</h1>
        </header>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
