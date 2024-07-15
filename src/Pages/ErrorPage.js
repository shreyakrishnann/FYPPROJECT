import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <div class="bg-white py-6 sm:py-8 lg:py-12 text-black">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div class="relative mx-auto flex h-96 w-full items-center justify-center ">
            <div class="relative flex flex-col items-center justify-center p-8 md:p-16">
              <h1 class="mb-2 text-center text-2xl font-bold text-green-500 md:text-3xl lg:text-4xl ">404</h1>

              <p class="mb-8 text-center text-green-600 md:text-lg">The page you’re looking for doesn’t exist.</p>

              <Link to="/" class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-green-500 outline-none ring-indigo-300 transition duration-100 hover:bg-green-300 focus-visible:ring active:text-green-700 md:text-base">Go home</Link>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ErrorPage