'use client'

import { useMapperContext } from '@/context/mapperContext'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
type Props = {
    x: number,
    y: number
}

export default function MapCell({ x, y }: Props) {

    const mapperService = useMapperContext()

    const handleCell = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        mapperService!.toggleConnection(x, y)
    }

    return (
        <button onClick={handleCell} className={`flex h-12 w-12 border-2 border-sky-600 hover:bg-sky-600 hover:border-sky-400 m-px transition-all duration-200 hover:scale-105`} >
            <span className={`transition-all h-full w-full bg-sky-400 ${ mapperService!.getConnection(x, y) ? "scale-0" : "scale-90"}`} />
        </button>
    )
}