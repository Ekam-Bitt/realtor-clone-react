import React from 'react'
import Spinner from '../assets/loading.svg'

export default function Loading() {
  return (
    <div className='flex justify-center items-center fixed bg-black bg-opacity-50 left-0 right-0 top-0 bottom-0 z-50'>
        <img src={Spinner} alt="Loading..."/>
    </div>
  )
}
