import React from 'react'

const Starts = ({ rating }) => {

    let starts = []
    for (let index = 0; index < rating; index++) {
        starts.push("⭐")
    }
    return (
        <span className="text-sm text-gray-500">{starts} {rating} Rating </span>
    )
}

export default Starts