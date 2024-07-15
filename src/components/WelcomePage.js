import React from 'react';
import Navbar from './Navbar';
import './welcome.css'
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <>
            <div className="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="container mx-auto p-4 ">
                <Navbar />
                <div className='mt-4 md:mt-1'>
                    <WelcomeHero />
                </div>

            </div>
        </>

    )
}

const WelcomeHero = () => {


    return (
        <>
            <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <section className="flex flex-col items-center">
                        <div className="flex max-w-xl flex-col items-center pb-0 pt-8 text-center">
                            {/* <p className="mb-4 font-semibold text-green-500 md:mb-6 md:text-lg xl:text-xl bg-green-50 px-2 rounded-lg">
                                Very proud to introduce 🎉
                            </p> */}

                            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl ">
                                <span className=''> Wel</span>come to <span className=''>EcoCool</span><span className='text-green-400 font-bold underline '>Sustain.com</span>
                            </h1>

                            <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 xl:text-lg">
                                EcoCoolSustain.com is committed to providing sustainable air conditioning solutions that help protect the environment. Our products are designed with eco-friendly materials and energy-efficient technology to reduce carbon footprint while keeping you cool and comfortable.
                                Explore our range of products and services to find the perfect solution for your cooling needs.
                            </p>
                            <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                                {
                                    !localStorage.getItem('login') || localStorage.getItem('login').length === 0 || localStorage.getItem('login') === 'undefined' ?
                                        (<>
                                            <Link
                                                to='/signin'
                                                className="inline-block rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to='/signup'
                                                className="inline-block rounded-lg border bg-green px-8 py-3 text-center text-sm font-semibold text-green-500 outline-none ring-green-300 transition duration-100 hover:bg-green-100 focus-visible:ring active:bg-green-200 md:text-base"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                        ) :
                                        (
                                            <>
                                                <Link
                                                    to='/products'
                                                    className="inline-block rounded-lg border bg-green px-8 py-3 text-center text-sm font-semibold text-green-500 outline-none ring-green-300 transition duration-100 hover:bg-green-100 focus-visible:ring active:bg-green-200 md:text-base"
                                                >
                                                    View Products
                                                </Link>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        </>
    )
};

export default WelcomePage;