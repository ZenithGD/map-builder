import Link from 'next/link'
import React from 'react'

type Props = {}

function Navbar(props: Props) {
    return (
        <div className='w-full fixed top-0 bg-sky-800 flex justify-between px-16 py-4 h-20 filter shadow-md'>
            <Link href="/" className='flex justify-center items-center gap-2 text-2xl font-bold text-white'>
                <img className="object-contain h-10" src="/images/bell.png" />
                <h1>Dora-Mapper</h1>
            </Link>
        </div>
    )
}

export default Navbar