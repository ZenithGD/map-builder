'use client'

import Link from 'next/link'
import toast from 'react-hot-toast';

import React, { useEffect, useState } from 'react'
import { useMapperContext } from '@/context/mapperContext';

function DimForm() {

    const mapperService = useMapperContext()

    const [disabled, setDisabled] = useState(false)
    const [dimX, setDimX] = useState("3")
    const [dimY, setDimY] = useState("3")
    const [cellSize, setCellSize] = useState("400")

    const handleDimX = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setDimX(e.target.value)
    }

    const handleDimY = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setDimY(e.target.value)
    }

    const handleCellSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        setCellSize(e.target.value)
    }

    const handleButton = (e: React.MouseEvent<HTMLAnchorElement>) => {

        if (disabled) {
            console.log("button")
            toast.error("¡Los datos son incorrectos!")
        } else {
            mapperService!.initMap(parseInt(dimX), parseInt(dimY))
        }
    }

    useEffect(() => {
        // validate data
        let dx = parseInt(dimX)
        let dy = parseInt(dimY)
        let cs = parseInt(cellSize)

        setDisabled(isNaN(dx) || dx <= 0 || isNaN(dy) || dy <= 0 || isNaN(cs) || cs <= 0)

    }, [dimX, dimY, cellSize])

    return (
        <div className='h-full w-full'>
            <form className='flex flex-col w-full'>
                <div className="h-full w-full bg-sky-900 p-6 flex flex-col gap-8 rounded-t-xl">
                    <h1 className='text-white text-xl font-bold text-center'>Dimensiones del mapa</h1>
                    <div className="flex gap-8 w-full">
                        <div className='flex flex-1 flex-col gap-2'>
                            <label className="text-sky-100 text-sm">Celdas X</label>
                            <input className="bg-sky-100 p-1 text-xs rounded-sm shadow-md focus:ring-2 ring-opacity-75 ring-offset-2 ring-offset-sky-900 ring-sky-200 transition duration-200" type="number" value={dimX} onChange={handleDimX} />
                        </div>
                        <div className='flex flex-1 flex-col gap-2'>
                            <label className="text-sky-100 text-sm">Celdas Y</label>
                            <input className="bg-sky-100 p-1 text-xs rounded-sm shadow-md focus:ring-2 ring-opacity-75 ring-offset-2 ring-offset-sky-900 ring-sky-200 transition duration-200" type="number" value={dimY} onChange={handleDimY} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className="text-sky-100 text-sm" >Tamaño de celda (mm)</label>
                        <input className="bg-sky-100 p-1 text-xs rounded-sm shadow-md focus:ring-2 ring-opacity-75 ring-offset-2 ring-offset-sky-900 ring-sky-200 transition duration-200" type="number" value={cellSize} onChange={handleCellSize} />
                    </div>
                </div>
                <Link 
                    onClick={handleButton} 
                    href={ disabled ? {} : { pathname : "/mapper", query : { x : parseInt(dimX) * 2 + 1, y : parseInt(dimY) * 2 + 1, cs : cellSize } } }
                    className='text-white w-full'>
                    <div className={`text-center w-full bg-sky-700 rounded-b-lg p-2 transition-all duration-200 ${disabled ? "cursor-not-allowed" : "hover:bg-sky-600 "}`}>
                        Construir mapa
                    </div>
                </Link>
            </form>
        </div>
    )
}

export default function Home() {
    return (
        <main className="h-full w-full flex justify-center gap-8 p-12 pt-32 px-20">
            <div className='h-full w-full flex-1'>
                <h1 className='font-bold mb-4'>¡Bienvenido a Dora-Mapper!</h1>
                <p>
                    Esta es una herramienta web para crear fácilmente mapas de conectividad para la navegación con robots en una cuadrícula.
                </p>
            </div>
            <div className='h-full w-full flex-1'>
                <DimForm />
            </div>
        </main>
    )
}
