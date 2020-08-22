import React from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';

const fetchItems = async (key, page) => {
  const res = await fetch(`/api/posts`);
  return res.json();
};

const destroyItem = async ({ id }) => {
  await fetch(`/api/posts/${id}`, { method: 'DELETE' });
};

queryCache.subscribe((cache) => {
  // console.log('cache:', cache);
});

const Posts = (props) => {
  const { data, isSuccess, isError } = useQuery(['posts'], fetchItems);
  const [mutate, info] = useMutation(destroyItem, {
    onSuccess: (res) => {
      // 让对应 key 的缓存失效
      queryCache.invalidateQueries(['posts']);
    }
  });

  if (isError) return <div>Error</div>;

  if (!isSuccess) return null;

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h5>
              {item.id} - {item.title}
            </h5>
            <p>{item.content}</p>
            <button
              onClick={(e) => {
                console.log('destroy');
                mutate({ id: item.id });
              }}>
              Destroy
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
