import React from 'react';
import { useQuery } from 'react-query';

const fetchItems = async (key, args, page) => {
  console.log(key, args);
  const res = await fetch(`http://swapi.dev/api/planets/${page}`);
  return res.json();
};

const Plants = () => {
  const data = useQuery(['items', { name: 'fei' }, 2], fetchItems, { staleTime: 200000 });
  return (
    <>
      <h1>Plants</h1>
      {data.status === 'loading' && <div> loading...</div>}
      {data.status === 'success' && <div> {JSON.stringify(data.data)}</div>}
    </>
  );
};

export default Plants;
