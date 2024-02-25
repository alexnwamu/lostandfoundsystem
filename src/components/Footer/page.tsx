'use client'
import React from 'react'
    import { usePathname } from 'next/navigation'
const Footer  = () => {
     const pathname = usePathname()
  return (
    <div className={`${pathname.includes('dashboard') || pathname.includes('login') || pathname.includes('register') || pathname.includes('admin') ? 'hidden' : 'w-full text-[13px] text-[#615C61] border-t text-center pt-[15px] pb-[25px] '}`}>
<p className='mb-[41px] '>Terms & Conditions</p>
<p>&copy; 2024 Final Year Project (CLFIS)</p>
        </div>
  )
}

export default Footer 
