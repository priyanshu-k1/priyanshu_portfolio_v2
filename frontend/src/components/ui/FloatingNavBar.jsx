import React from 'react'
import {House,SquareChevronRight,BriefcaseBusiness,Mail,Quote} from 'lucide-react'


const FloatingNavBar = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
     bg-gray-800 text-white px-8 py-2 rounded-2xl shadow-lg shadow-gray-700
        w-fit h-fit flex items-center justify-center gap-2.5">
          <div className="relative p-3 rounded-full bg-gray-500 group hover:bg-gray-700
           hover:rounded-sm transition-all duration-200 hover:px-5 hover:-translate-y-1">
            
            <p className='absolute  opacity-0  top-4 left-1/2 transform -translate-x-1/2 -translate-y-full
             bg-gray-800 text-white text-xs px-4 py-1 rounded 
             group-hover:opacity-100  transition-all duration-350 
             group-hover:block group-hover:translate-y-[-3.4rem]
             font-serifs'>
              Home
            </p>

            <House className='group-hover:text-amber-400 transition-colors duration-150'/>
          </div>

          <div className="relative p-3 rounded-full bg-gray-500 group hover:bg-gray-700 
          hover:rounded-sm transition-all duration-200 hover:px-5 hover:-translate-y-1">

            <p className='absolute  opacity-0  top-4 left-1/2 transform -translate-x-1/2 -translate-y-full
             bg-gray-800 text-white text-xs px-4 py-1 rounded 
             group-hover:opacity-100  transition-all duration-350 group-hover:block group-hover:translate-y-[-3.4rem]'>
              Skills
            </p>


            <SquareChevronRight className='group-hover:text-amber-400 transition-colors duration-150'/>
          </div>

          <div className="relative p-3 rounded-full bg-gray-500 group hover:bg-gray-700 
          hover:rounded-sm transition-all duration-200 hover:px-5 hover:-translate-y-1">
            
            <p className='absolute  opacity-0  top-4 left-1/2 transform -translate-x-1/2 -translate-y-full
             bg-gray-800 text-white text-xs px-4 py-1 rounded 
             group-hover:opacity-100  transition-all duration-350 group-hover:block group-hover:translate-y-[-3.4rem]'>
              Project
            </p>


            <BriefcaseBusiness className='group-hover:text-amber-400 transition-colors duration-150'/>
          </div>

          <div className="relative p-3 rounded-full bg-gray-500 group hover:bg-gray-700 
          hover:rounded-sm transition-all duration-200 hover:px-5 hover:-translate-y-1">

            <p className='absolute  opacity-0  top-4 left-1/2 transform -translate-x-1/2 -translate-y-full
             bg-gray-800 text-white text-xs px-4 py-1 rounded 
             group-hover:opacity-100  transition-all duration-350 group-hover:block group-hover:translate-y-[-3.4rem]'>
              Contact
            </p>


            <Mail className='group-hover:text-amber-400 transition-colors duration-150'/>
          </div>

          <div className="relative p-3 rounded-full bg-gray-500 group hover:bg-gray-700 
          hover:rounded-sm transition-all duration-200 hover:px-5 hover:-translate-y-1">

            <p className='absolute  opacity-0  top-4 left-1/2 transform -translate-x-1/2 -translate-y-full
             bg-gray-800 text-white text-xs px-4 py-1 rounded 
             group-hover:opacity-100  transition-all duration-350 group-hover:block group-hover:translate-y-[-3.4rem]'>
              Testimonial
            </p>

            <Quote className='group-hover:text-amber-400 transition-colors duration-150'/>
          </div>
    </div>
  )
}

export default FloatingNavBar