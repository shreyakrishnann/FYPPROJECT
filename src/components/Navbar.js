import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleMobileMenuToggle = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
        mobileMenu.style.backgroundColor = '#4ade80';
        mobileMenu.style.color = 'white';
    }


    return (
        <>
            <div className="bg-white lg:pb-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <header className="flex items-center justify-between">
                        {/* logo - start */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
                            aria-label="logo"
                        >
                            <svg
                                width={95}
                                height={94}
                                viewBox="0 0 95 94"
                                className="h-auto w-6  text-green-400"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                            </svg>
                            <span className='text-green-400'>
                                <span className='text-black'>EcoCool</span>Sustain
                            </span>
                        </Link>


                        {/* {categories && <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
                            <Link
                                to="/signin"
                                className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-green-300 transition duration-100 hover:text-green-500 focus-visible:ring active:text-green-600 md:text-base"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-block rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base"
                            >
                                Sign up
                            </Link>
                        </div>
                        } */}

                        {
                            localStorage.getItem('login') &&
                            <div className='flex flex-col md:flex-row gap-1 md:gap-4  items-center'>
                                {localStorage.getItem('loginemail') &&
                                    localStorage.getItem('loginemail').length > 0 &&
                                    <p>Hello,&nbsp; <span className='text-green-500 font-semibold'>
                                        {localStorage.getItem('loginemail')}
                                    </span> 🖐</p>}
                                <button
                                    onClick={() => { localStorage.clear(); navigate('/signin') }}
                                    className="inline-block rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base"
                                >
                                    Log Out
                                </button>
                            </div>
                        }


                        {
                            !localStorage.getItem('login') === undefined && !localStorage.getItem('login') && !localStorage.getItem('loginemail') && !localStorage.getItem('loginemail').length > 0 &&
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg  px-2.5 py-2 text-sm font-semibold text-white ring-indigo-300 transition duration-100  focus:outline-none focus-visible:ring active:text-green-700 md:text-base lg:hidden bg-green-400"
                                onClick={() => { handleMobileMenuToggle() }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Menu
                            </button>}
                        {/* buttons - end */}
                    </header>

                    <div id='mobile-menu' className='hidden bg-white rounded-lg  px-4 py-2 lg:hidden text-center text-gray-600 shadow lg:hidden '>
                        <div className="flex flex-col gap-4">
                            <Link to='/signin' className="text-lg font-semibold text-white transition duration-100 hover:text-black active:text-indigo-700 ">
                                Sign in
                            </Link>
                            <Link to='/signup' className="text-lg font-semibold text-white transition duration-100 hover:text-black active:text-indigo-700 ">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar