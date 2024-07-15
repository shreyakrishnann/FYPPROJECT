import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MountainImg from '../assets/mountain.jpg'
import Loader from '../components/Loader';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        //const api = 'http://localhost:5000/login';
        const api = 'https://ecosustain-backend.onrender.com/login';
        if (email && password) {
            setError(null);
            try {
                const response = await fetch(api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setLoading(false);
                    alert(errorData.msg || 'Something went wrong, please try again.');
                }
                else {
                    alert("Login Successful!");
                    const data = await response.json();
                    console.log(data.id)
                    localStorage.setItem('userid', data.id);
                    localStorage.setItem('login', true);
                    localStorage.setItem('loginemail', email);
                    setLoading(false);
                    navigate('/products');
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
                setError(error.message);
            }

        }
        else {
            setLoading(false);
            setError("Invalid Credentials");
        }
    }

    useEffect(() => {
        if (localStorage.getItem('login')) {
            localStorage.clear();
        }
    }, [])

    return (
        <>
            {loading && <Loader/>}
            <div className="bg-white relative">
                <div
                    className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row"
                >
                    <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
                        <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12 hidden md:block ">
                            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                                <img
                                    src={MountainImg}
                                    alt='helloGirl'
                                    className="rounded-lg shadow-2xl w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                            <div
                                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10"
                            >
                                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                                    Login
                                </p>
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">

                                    <div className="relative">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                                            Email
                                        </p>
                                        <input
                                            placeholder="123@ex.com"
                                            type="email"
                                            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                                            required
                                            onChange={(e) => setEmail(e.target.value.toLowerCase())}
                                        />
                                    </div>
                                    <div className="relative">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
            absolute"
                                        >
                                            Password
                                        </p>
                                        <input
                                            placeholder="Password"
                                            type={showPassword ? "text" : "password"}
                                            className="border placeholder-gray-400 focus:outline-none
          focus:border-black w-full pt-4 pr-10 pb-4 pl-4 mt-2 text-base block bg-white
          border-gray-300 rounded-md"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825c-3.9 0-7.325-2.2-9.025-5.825a10.145 10.145 0 019.025-5.825 10.145 10.145 0 019.025 5.825c-1.7 3.625-5.125 5.825-9.025 5.825zm-2.875-5.825c0 1.125.525 2.125 1.425 2.825.9.7 2.025 1 3.15.825.45-.05.875-.2 1.225-.475m0 0l.825.825m-6.15-6.15l.825-.825m-2.25.225c.8-.8 1.9-1.25 3.025-1.25m0 0c1.125 0 2.225.45 3.025 1.25" />
                                                </svg>

                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5c-3.2 0-6.3 1.7-8 4.5 1.7 2.8 4.8 4.5 8 4.5s6.3-1.7 8-4.5c-1.7-2.8-4.8-4.5-8-4.5zm0 9c-2.1 0-4-1.3-5-3.5 1-2.2 2.9-3.5 5-3.5s4 1.3 5 3.5c-1 2.2-2.9 3.5-5 3.5z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <button
                                            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-green-500
            rounded-lg transition duration-200 hover:bg-green-600 ease"
                                            onClick={() => handleSubmit()}
                                        >
                                            Login

                                        </button>
                                        <p className='text-red-500 text-center mt-2 text-sm text-red-500 '>{error}</p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center ">
                                        <p> Don't have an account. <Link to='/signup'> <span className='text-green-500 font-semibold'> Sign up</span></Link></p>
                                        <Link to='/' className='text-green-500 font-semibold hover:text-green-600'> Go to Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn