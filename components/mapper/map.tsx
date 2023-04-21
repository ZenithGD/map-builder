'use client'
import React from 'react'
import MapCell from './mapCell'

type Props = {
    dims: {
        x: number,
        y: number
    }
}

export default function Map({ dims }: Props) {

    const rowIdx = Array(dims.y).fill(0).map((_, i) => i)
    const colIdx = Array(dims.x).fill(0).map((_, i) => i)

    return (
        <div className='w-full h-full flex flex-col justify-center'>
            {
                rowIdx.map((i: number) => {
                    return <div className="flex flex-row justify-center" key={`row ${i}`}>
                        {colIdx.map((j : number) => {
                            return <MapCell key={i * dims.x + j} x={j} y={i} />
                        })}
                    </div>
                })
            }
        </div>
    )
}