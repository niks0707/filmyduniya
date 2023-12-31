import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import Review from './Review';
import VideoPopup from './VideoPopup';

const Details = () => {
  const [show, setShow] = useState(false)

  const { id } = useParams();
  const [data, setData] = useState({
    title: '',
    year: '',
    image: '',
    description: '',
    rating: 0,
    rated: 0,
    trailerurl:''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, 'movies', id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, [id]);

  return (
    <div className='md:p-4 p-1 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
      {loading ? (
        <div className='w-full flex justify-center items-center h-96'>
          <ThreeDots height={40} color='white' />
        </div>
      ) : (
        <>
          <img
            className='h-68 md:h-96 md:w-60 w-72 block md:sticky top-24'
            src={data.image}
            alt='poster'
          />

          <div className='md:ml-4 ml-0 md:w-1/2 p-2 mt-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-400 '>
                Title: {data.title} <span className='text-xl'>({data.year})</span>
              </h1>
              <ReactStars size={25} half={true} value={data.rating / data.rated} edit={false} />
              <p className='mt-2'>{data.description}</p>
            </div>
            <div onClick={() => {setShow(true)}} className='bg-red-600 p-2 mt-5 mb-5 uppercase rounded-xl text-white w-48 flex justify-center items-center text-xl'>
              <button>
                Watch Trailer
              </button>
            </div>
            <div>
              <VideoPopup
                show={show}
                setShow={setShow}
                trailerurl={data.trailerurl}
              />
            </div>
            <Review id={id} preRating={data.rating} userRated={data.rated} />
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
