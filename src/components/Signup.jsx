import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from '../firebase/firebase'
import { addDoc } from "firebase/firestore";
import { userRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
const auth = getAuth(app);

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [optsent, setOtpsent] = useState(false)
    const [OTP, setOTP] = useState("")


    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }


    const requestOtp = () => {
        setLoading(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 1000
                });
                setOtpsent(true);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            })
    }


    const verify = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    button: false,
                    timer: 1000,
                });
                navigate('/login')
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(form.password, salt);
        await addDoc(userRef, {
            name:form.name,
            password:hash,
            mobile:form.mobile
        })
    }

    return (
        <div className="w-full flex flex-col mt-8 items-center">

            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign Up</h1>

            {optsent ?
                <>
                    <div className="p-2 w-1/6">
                        <div className="relative">
                            <label htmlFor="otp" className="leading-7 text-sm text-white">
                                Enter OTP
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                value={OTP}
                                onChange={(e) =>
                                    setOTP(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        verify();
                                    }
                                }}
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>

                    <div className="p-2 w-full">
                        <button
                            onClick={verify}
                            className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                        >
                            {loading ? (
                                <TailSpin height={25} color="white" />
                            ) : (
                                'Verify OTP'
                            )}
                        </button>
                    </div>
                </>
                :
                <>
                    <div className="p-2 md:w-1/3 w-1/2">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-sm text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 md:w-1/3 w-1/2">
                        <div className="relative">
                            <label htmlFor="mobile" className="leading-7 text-sm text-white">
                                Mobile Number
                            </label>
                            <input
                                type="number"
                                id="mobile"
                                name="mobile"
                                value={form.mobile}
                                onChange={(e) =>
                                    setForm({ ...form, mobile: e.target.value })
                                }
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="p-2 md:w-1/3 w-1/2">
                        <div className="relative">
                            <label htmlFor="password" className="leading-7 text-sm text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        requestOtp();
                                    }
                                }}
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>


                    <div className="p-2 w-full">
                        <button
                            onClick={requestOtp}
                            className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                        >
                            {loading ? (
                                <TailSpin height={25} color="white" />
                            ) : (
                                'Request OTP'
                            )}
                        </button>
                    </div>
                </>
            }
            <div>
                <p>Already have account? <Link to={'/login'}><span className="text-blue-500">Login</span></Link></p>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default Signup;
