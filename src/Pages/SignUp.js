import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MountainImg from '../assets/mountain.jpg'
import Loader from '../components/Loader';



const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        //const api = 'http://localhost:5000/register';
        const api = 'https://ecosustain-backend.onrender.com/register';

        if (password === confirmPassword) {
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
                    alert(errorData.msg || 'Something went wrong, please try again.');
                    setLoading(false);
                }
                else {
                    setLoading(false);
                    alert("Registration Successful! Please Login");
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
                setError(error.message);
            }
        } else {
            setLoading(false);
            setError('Passwords & Confirm Password do not Match.');
        }
    }

    useEffect(() => {

    }, []);


    return (
        <>
            {loading && <Loader />}
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
                                    Sign up for an account
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
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            type="password"
                                            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute"
                                        >
                                            Confirm Password
                                        </p>
                                        <input
                                            placeholder="Confirm Password"
                                            type="password"
                                            className="border placeholder-gray-400 focus:outline-none
            focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
            border-gray-300 rounded-md"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    {error && <p className='text-red-500'>{error}</p>}
                                    <div className="relative">
                                        <button
                                            onClick={() => { handleSubmit() }}
                                            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-green-500
            rounded-lg transition duration-200 hover:bg-green-600 ease"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                    <div className="flex flex-row justify-between items-center ">
                                        <p>Already have an account? <Link to='/signin'> <span className='text-green-500 font-semibold'> Sign in</span></Link></p>
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

export default SignUp