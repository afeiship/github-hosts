import React, { useState } from 'react';
import { useQuery, usePaginatedQuery } from 'react-query';

const fetchItems = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/people/${page}`);
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(82);
  const { status, resolvedData, latestData } = usePaginatedQuery(['items', page], fetchItems);
  return (
    <>
      <h1>People</h1>
      <button
        onClick={(e) => {
          setPage((old) => {
            return Math.max(old - 1, 1);
          });
        }}>
        Previose
      </button>
      <span> {page}</span>
      <button
        onClick={(e) => {
          setPage((old) => {
            console.log('latestData:::', latestData);
            return !latestData || !resolvedData.name ? old : old + 1;
          });
        }}>
        Next
      </button>
      {status === 'loading' && <div> loading...</div>}
      {status === 'success' && <div> {JSON.stringify(resolvedData)}</div>}
    </>
  );
};

export default People;
