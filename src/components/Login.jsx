import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { userRef } from "../firebase/firebase";
import bcrypt from 'bcryptjs'
import { Appstate } from '../App'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const useAppState = useContext(Appstate);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const login = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const quer = query(userRef, where('mobile', '==', form.mobile));
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppState.setLogin(true)
                    useAppState.setUsername(_data.name)
                    navigate('/filmyduniya')
                    swal({
                        title: "Successfully Logged in",
                        icon: "success",
                        button: false,
                        timer: 1000
                    });
                }
                else {
                    swal({
                        title: "Invalid Credientials",
                        icon: "error",
                        button: false,
                        timer: 1000
                    });
                }
            })
        } catch (error) {
            console.log(error)
            swal({
                title: error.message,
                icon: "error",
                button: false,
                timer: 1000
            });
        }

        setForm({
            mobile: "",
            password: ""
        });
        setLoading(false);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!form.mobile.trim()) {
            newErrors.mobile = "Mobile Number is required";
            isValid = false;
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="w-full flex flex-col mt-8 items-center">

            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Login</h1>
            <div className="p-2 w-1/3">
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
                    {errors.mobile && (
                        <span className="text-red-500 text-sm">{errors.mobile}</span>
                    )}
                </div>
            </div>
            <div className="p-2 w-1/3">
                <div className="relative">
                    <label htmlFor="password" className="leading-7 text-sm text-white">
                        Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                login();
                            }
                        }}
                        required
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password}</span>
                    )}
                </div>
            </div>


            <div className="p-2 w-full">
                <button
                    onClick={login}
                    className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                    {loading ? (
                        <TailSpin height={25} color="white" />
                    ) : (
                        'Login'
                    )}
                </button>
            </div>
            <div>
                <p>Do not have account? <Link to={'/signup'}><span className="text-blue-500">Sign Up</span></Link></p>
            </div>
        </div>
    );
};

export default Login;
