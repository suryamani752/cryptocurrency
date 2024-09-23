import React from 'react'

const Footer = () => {
    // let year = new Date();
    // console.log(year.getFullYear())
  return (
    <div className="flex justify-center p-4 bg-gradient-to-r from-cyan-500 to-blue-500">
        <p className="lg:text-xl text-gray-200"> &copy; Suryamani-Kumar, {new Date().getFullYear()}. All Right Reserved</p>
    </div>
  )
}

export default Footer