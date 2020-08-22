import React, { useState } from 'react';
import Navbar from './components/navbar';
import Plants from './components/plants';
import People from './components/people';
import Posts from './components/posts';
import { ReactQueryDevtools } from 'react-query-devtools';

function App() {
  const [page, setPage] = useState('posts');
  return (
    <>
      <div className="App">
        <h1>Star wars</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === 'plants' && <Plants />}
          {page === 'people' && <People />}
          {page === 'posts' && <Posts />}
        </div>
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
