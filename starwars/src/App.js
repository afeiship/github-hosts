import React, { useState } from 'react';
import Navbar from './components/navbar';
import Plants from './components/plants';
import People from './components/people';
import Posts from './components/posts';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryConfig = {
  queries: {
    retry: 0,
    refetchOnWindowFocus: true,
    // 缓存存活时间
    staleTime: 10 * 1000
  }
};

function App() {
  const [page, setPage] = useState('posts');
  return (
    <ReactQueryConfigProvider config={queryConfig}>
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
    </ReactQueryConfigProvider>
  );
}

export default App;
