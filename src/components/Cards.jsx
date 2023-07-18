import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { moviesRef } from '../firebase/firebase';
import { getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className='flex flex-wrap justify-center px-2 mt-2'>
      {loading ? (
        <div className='w-full flex justify-center items-center h-96'>
          <ThreeDots height={40} color='white' />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/details/${e.id}`} key={i}>
              <div className='md:w-56 w-40 flex flex-wrap flex-col cards font-medium shadow-lg p-2 m-1 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                <img className='h-60 md:h-72' src={e.image} alt='poster' />
                <h1>
                  <span className='text-gray-500'>Name: </span>
                  {e.title}
                </h1>
                <h1 className='flex items-center'>
                  <span className='text-gray-500 mr-2'>Rating: </span>
                  <ReactStars size={20} half={true} value={e.rating / e.rated} edit={false} />
                </h1>
                <h1>
                  <span className='text-gray-500'>Year: </span>
                  {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
