import React from 'react'

const Dashboard = () => {
  return (
    <>
        <div className='h-screen'>
            <div className='flex justify-between items-center pt-2'>
                <h1 className='text-2xl text-gray-400'>Hello, <span className='text-4xl text-white'>Nayan</span></h1>
                <div className='flex items-center gap-3'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <div className="avatar w-10">
                        <img className='w-10 rounded-full' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard
