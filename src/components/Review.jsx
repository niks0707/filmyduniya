import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import swal from 'sweetalert';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom';

const Review = ({ id, preRating, userRated }) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ReviewLoading, setReviewLoading] = useState(false);
    const [form, setForm] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const [formError, setFormError] = useState("");
    const useAppState = useContext(Appstate);
    const navigate = useNavigate();
    const [newAdded,setNewAdded] = useState(0)

    const sendReview = async () => {
        if (!form.trim()) {
            setFormError("Please enter your thoughts");
            return;
        }

        setLoading(true);
        try {
            if (useAppState.login) {
                await addDoc(reviewsRef, {
                    movieid: id,
                    name: useAppState.username,
                    rating: rating,
                    thought: form,
                    timestamp: new Date().getTime()
                });

                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: preRating + rating,
                    rated: userRated + 1
                });

                setLoading(false);
                setForm("");
                setRating(0);
                setNewAdded(newAdded+1);
                swal({
                    title: "Review Sent",
                    icon: "success",
                    button: false,
                    timer: 1000
                });
            }else{
                navigate('/login')
            }
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                button: false,
                timer: 2000
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        async function getReviewData() {
            setReviewLoading(true);
            setReviewData([])
            let quer = query(reviewsRef, where('movieid', '==', id));
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                setReviewData((prev) => [...prev, doc.data()]);
            });
            setReviewLoading(false);
        }
        getReviewData();
    }, [newAdded]);

    return (
        <div className='w-full mt-4 border-t-2 border-gray-700'>
            <div className='flex items-center'>
                <p className='text-green-500 mt-3 text-xl'>Rate us :</p>
                <div className='pt-3 ml-3'>
                    <ReactStars
                        size={30}
                        half={true}
                        value={rating}
                        onChange={(rate) => setRating(rate)}
                    />
                </div>
            </div>
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                className='mt-2 w-full p-2 outline-none header'
                placeholder='Share Your Thoughts...'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendReview();
                    }
                }}
                required
            />
            {formError && (
                <span className="text-red-500 text-sm">{formError}</span>
            )}
            <button
                onClick={sendReview}
                className='mt-2 w-full bg-green-600 p-2 flex justify-center'
            >
                {loading ? (
                    <TailSpin height={20} color='white' />
                ) : (
                    'Share'
                )}
            </button>

            {ReviewLoading ? (
                <div className='mt-8 flex justify-center'>
                    <ThreeDots height={10} color='white' />
                </div>
            ) : (
                <div className='mt-4'>
                    {reviewData.map((e, i) => {
                        return (
                            <div
                                key={i}
                                className='w-full border-b border-gray-500 mt-2 p-2 header bg-opacity-100'
                            >
                                <div className='flex items-center'>
                                    <p className='text-blue-500'>{e.name}</p>
                                    <p className='ml-3 text-xs'>
                                        {new Date(e.timestamp).toLocaleString()}
                                    </p>
                                </div>
                                <ReactStars
                                    size={20}
                                    half={true}
                                    value={e.rating}
                                    edit={false}
                                />
                                <p>{e.thought}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Review;
