import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import Starts from '../components/Starts';
import Loader from '../components/Loader'

const Products = () => {
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [fetchTime, setFetchTime] = React.useState(false);
    const [ac, setAc] = React.useState('');

    const handleShowMore = () => {
        const showDiv = document.getElementById("showMore");

        setShow(!show);
        !show
            ?
            showDiv.className = "grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 " :
            showDiv.className = "grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 hidden"
    }

    const fetchdata = async () => {
        setFetchTime(true);
        const api = 'https://ecosustain-backend.onrender.com/ac-details';
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.msg || 'Something went wrong, please try again.');
                setFetchTime(false);
            }
            else {
                const data = await response.json();
                setData(data);
                console.log(data)
                setFetchTime(false);
            }

        } catch (error) {
            console.error('Error:', error);
            setFetchTime(false);

        }
    }


    useEffect(() => {
        const loginData = localStorage.getItem('login');
        if (!loginData || loginData.length === 0 || loginData === 'undefined') {
            alert("Please Login...");
            navigate('/signin');
            return;
        }
        else {

            fetchdata();
        }


    }, [])

    return (
        <>
            <div className='container mx-auto p-4'>
                <Navbar categories={false} />
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="mb-6 flex items-end justify-between gap-4">
                            <h2 className="text-2xl font-bold text-green-500 lg:text-3xl">
                                Product List
                            </h2>

                            <div className='flex flex-row gap-4 items-center justify-center '>
                                <button className='bg-green-500 text-white font-semibold px-4 py-1  rounded ' onClick={() => { setAc('LG') }}>LG</button>
                                <button className='bg-green-500 text-white font-semibold px-4 py-1  rounded ' onClick={() => { setAc('Daikin') }}>Daikin</button>
                            </div>

                            {show ? (<>
                                <button disabled
                                    onClick={() => { handleShowMore() }}
                                    className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
                                >
                                    Less
                                </button>
                            </>) : (
                                <button disabled
                                    onClick={() => { handleShowMore() }}
                                    className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
                                >
                                    Show more
                                </button>
                            )}
                        </div>
                        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                            {/* product - start */}

                            {!ac && data.length > 0 && data.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <div
                                            className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                        >
                                            <img
                                                src={item.image}
                                                loading="lazy"
                                                alt={item.brandName}
                                                className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className='truncate hover:text-clip'>
                                                {item.AcConditioner}
                                            </div>
                                            <div className="flex flex-row items-center justify-between">
                                                {/* <span className="text-gray-500"></span> */}
                                                <Link
                                                    href="#"
                                                    className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                                >
                                                    {item.brandName}
                                                </Link>
                                                <span className='font-semibold'>
                                                    <Starts rating={item.rating} />
                                                </span>
                                            </div>
                                            <Link to={`/products/${item._id}`} className='inline-block rounded-lg bg-green-500 px-8 py-3 mt-2 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base'>
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                            {ac &&
                                data.length > 0 && data.filter(x => x.brandName === ac).map((item) => {
                                    return (
                                        <div key={item._id}>
                                            <div
                                                className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                            >
                                                <img
                                                    src={item.image}
                                                    loading="lazy"
                                                    alt={item.brandName}
                                                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className='truncate hover:text-clip'>
                                                    {item.AcConditioner}
                                                </div>
                                                <div className="flex flex-row items-center justify-between">
                                                    {/* <span className="text-gray-500"></span> */}
                                                    <Link
                                                        href="#"
                                                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                                    >
                                                        {item.brandName}
                                                    </Link>
                                                    <span className='font-semibold'>
                                                        <Starts rating={item.rating} />
                                                    </span>

                                                </div>
                                                <Link to={`/products/${item._id}`} className='inline-block rounded-lg bg-green-500 px-8 py-3 mt-2 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base'>
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {data.length === 0 && !fetchTime && <p className='text-center text-3xl font-bold '>No data found</p>}
                        {fetchTime && <p className='text-center text-3xl font-bold '>Loading... <Loader /></p>}
                        <br />

                        <div className=" hidden " id="showMore" >
                            {/* product - start */}
                            <div>
                                <Link
                                    href="#"
                                    className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1590756254933-2873d72a83b6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        loading="lazy"
                                        alt="Photo by Austin Wade"
                                        className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <span className="text-gray-500">AC</span>
                                    <Link
                                        href="#"
                                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                    >
                                        LG
                                    </Link>
                                </div>
                            </div>
                            {/* product - end */}
                            {/* product - start */}
                            <div>
                                <Link
                                    href="#"
                                    className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1566917064245-1c6bff30dbf1?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        loading="lazy"
                                        alt="Photo by engin akyurt"
                                        className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <span className="text-gray-500">AC</span>
                                    <Link
                                        href="#"
                                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                    >
                                        LG
                                    </Link>
                                </div>
                            </div>
                            {/* product - end */}
                            {/* product - start */}
                            <div>
                                <Link
                                    href="#"
                                    className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                >
                                    <img
                                        src="https://plus.unsplash.com/premium_photo-1715620329655-b61bec83764c?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        loading="lazy"
                                        alt="Photo by Austin Wade"
                                        className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <span className="text-gray-500">AC</span>
                                    <Link
                                        href="#"
                                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                    >
                                        Daikin
                                    </Link>
                                </div>
                            </div>
                            {/* product - end */}
                            {/* product - start */}
                            <div>
                                <Link
                                    href="#"
                                    className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1617861648989-76a572012089?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        loading="lazy"
                                        alt="Photo by Austin Wade"
                                        className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <span className="text-gray-500">AC</span>
                                    <Link
                                        href="#"
                                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                    >
                                        Daikin
                                    </Link>
                                </div>
                            </div>
                            {/* product - end */}
                        </div>

                    </div>
                </div >

            </div >
        </>
    )
}

export default Products