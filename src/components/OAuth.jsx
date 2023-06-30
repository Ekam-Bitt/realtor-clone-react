import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className="w-full flex items-center justify-center px-4 py-2 text-xl text-white bg-black rounded-xl border-none shadow-lg hover:text-black hover:bg-white transition duration-200 ease-in-out"><FcGoogle className='mr-2'/>Continue with Google</button>
  )
}
