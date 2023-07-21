import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/firebase";
import swal from 'sweetalert';
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const useAppState = useContext(Appstate);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rated: 0,
        rating: 0,
        trailerurl:""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const addMovie = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        if (useAppState.login && (useAppState.username === "Admin")) {
            await addDoc(moviesRef, form);
            swal({
                title: "Successfully Added",
                icon: "success",
                button: false,
                timer: 2000
            });
            setForm({
                title: "",
                year: "",
                image: "",
                description: "",
                rated: 0,
                rating: 0,
                trailerurl:""
            });
            navigate('/filmyduniya')
        } else {
            navigate('/login')
            window.alert("Plz Login as Admin First")
        }
        setLoading(false);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!form.title.trim()) {
            newErrors.title = "Title is required";
            isValid = false;
        }

        if (!form.year.trim()) {
            newErrors.year = "Year is required";
            isValid = false;
        }

        if (!form.image.trim()) {
            newErrors.image = "Image Link is required";
            isValid = false;
        }

        if (!form.trailerurl.trim()) {
            newErrors.trailerurl = "Trailer Link is required";
            isValid = false;
        }

        if (!form.description.trim()) {
            newErrors.description = "Description is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center w-full mb-6">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                            Add Movie
                        </h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-white">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({ ...form, title: e.target.value })
                                        }
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.title && (
                                        <span className="text-red-500 text-sm">{errors.title}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-white">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        id="year"
                                        name="year"
                                        value={form.year}
                                        onChange={(e) =>
                                            setForm({ ...form, year: e.target.value })
                                        }
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.year && (
                                        <span className="text-red-500 text-sm">{errors.year}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="imagelink" className="leading-7 text-sm text-white">
                                        Image Link
                                    </label>
                                    <input
                                        id="imagelink"
                                        name="imagelink"
                                        value={form.image}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                image: e.target.value
                                            })
                                        }
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.image && (
                                        <span className="text-red-500 text-sm">{errors.image}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="trailerlink" className="leading-7 text-sm text-white">
                                        Trailer Link
                                    </label>
                                    <input
                                        id="trailerlink"
                                        name="trailerlink"
                                        value={form.trailerurl}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                trailerurl: e.target.value
                                            })
                                        }
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.trailerurl && (
                                        <span className="text-red-500 text-sm">{errors.trailerurl}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-white">
                                        Description
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                description: e.target.value
                                            })
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addMovie();
                                            }
                                        }}
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    ></textarea>
                                    {errors.description && (
                                        <span className="text-red-500 text-sm">
                                            {errors.description}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button
                                    onClick={addMovie}
                                    className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                                >
                                    {loading ? (
                                        <TailSpin height={25} color="white" />
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddMovie;
