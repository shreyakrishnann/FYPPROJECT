import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader'
import Starts from '../components/Starts';

const ProductDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchdata = async () => {
        const api = 'https://ecosustain-backend.onrender.com/ac-details/' + id;
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    '#1ad624-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.msg || 'Something went wrong, please try again.');
            }
            else {
                const data = await response.json();
                setData(data);
                console.log(data)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleReview = async (e) => {
        if (!comment) {
            alert("Please enter comment");
            return;
        }
        setLoading(true);
        const api = 'https://ecosustain-backend.onrender.com/createreviews';
        const userId = localStorage.getItem('userid');
        if (!userId || userId.length === 0 || userId === 'undefined') {
            alert("Something went wrong,Please Login...");
            navigate('/signin');
            return;
        }
        const res = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: comment, brandId: id, userId: userId })
        });
        if (res.ok) {
            alert("Review submitted successfully");
            fetchdata();
            setLoading(false);
            setComment('');
        }
        else {
            alert("Something went wrong");
            setLoading(false);
        }
    }

    const deleteReview = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            const api = 'https://ecosustain-backend.onrender.com/deletereview/' + id;
            const res = await fetch(api, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (res.ok) {
                alert("Review deleted successfully");
                fetchdata();
            }
            else {
                alert("Something went wrong");
            }
        }
        else {

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false // Use 24-hour format
        });
    };


    return (
        <>
            <div className='container mx-auto p-4'>
                <Navbar />
                {data.length === 0 && <Loader />}
                <div className="bg-white pt-6 ">
                    <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                        <div className="grid gap-8 md:grid-cols-2" key={data._id}>
                            {/* images - start */}
                            <div className="space-y-4 ">
                                <img
                                    src={data.image}
                                    loading="lazy"
                                    alt={data.brandName}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            {/* images - end */}
                            {/* content - start */}
                            <div className="md:py-8">
                                {/* name - start */}
                                <div className="mb-2 md:mb-3">
                                    <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                        {data.AcConditioner}
                                    </h2>
                                    <span className="mb-0.5 inline-block font-semibold text-green-500">{data.brandName}</span>
                                </div>

                                {/* rating - start */}
                                <div className="mb-2 flex items-center md:mb-2">

                                    <Starts rating={data.rating} />
                                    <a
                                        href="#"
                                        className="ml-4 text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                                    >
                                        {/* view all {data.reviews.length} reviews */}
                                    </a>
                                </div>

                                <div className="">
                                    <div className="flex items-end gap-2">
                                        <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                            Cost: <span className='text-green-500 font-bold text-3xl'>{data.price}</span>
                                        </span>
                                    </div>
                                </div>
                                {/* price - end */}

                                {/* description - start */}
                                <div className="mt-6 md:mt-6 lg:mt-4">
                                    <div className="mb-3 text-lg font-semibold text-gray-800">
                                        Energy Consumptions: &nbsp;
                                        <span className="text-green-400">
                                            {data.energyConsumption}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading && <Loader />}
                <div className="bg-white py-6 ">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl xl:mb-12">
                            Customer Reviews
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

                            {data.reviews && data.reviews.map((item) => {
                                return (
                                    <div className="flex flex-col gap-3 rounded-lg border p-4 md:p-6 hover:bg-green-200 ">
                                        <div className='flex flex-row justify-between items-center'>
                                            <span className="block text-sm font-bold md:text-base">
                                                {item.userEmail}
                                            </span>
                                            <button className='text-sm text-red-500 bg-red-100 px-2 py-1 rounded hover:bg-red-200' onClick={() => { deleteReview(item._id) }}>Delete</button>
                                        </div>
                                        <span className="block text-sm text-gray-500">{formatDate(item.date)}</span>
                                        {/* stars - start */}
                                        <Starts rating={data.rating} />
                                        {/* stars - end */}
                                        <p className="text-gray-600 text-md ">
                                            {item.comment}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />

                    <form class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                        <div class="sm:col-span-2">
                            <label for="message" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Comment*</label>
                            <textarea name="message" onChange={(e) => { setComment(e.target.value) }} class="h-28 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                        </div>
                    </form>
                    <div class="flex justify-center ">
                        <button onClick={() => { handleReview() }} class="inline-block rounded-lg border bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white hover:text-white outline-none ring-green-300 transition duration-100 hover:bg-green-500 focus-visible:ring active:bg-green-200 md:px-8 md:py-3 md:text-base">Write a review</button >
                    </div>
                </div>


            </div>
        </>
    )
}

export default ProductDetails