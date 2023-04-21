import Map from '@/components/mapper/map'
import Modal from '@/components/ui/Modal'
import { useMapperContext } from '@/context/mapperContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
    x : number,
    y : number,
    cs : number
}

import { faCopy } from "@fortawesome/free-solid-svg-icons";  
import { toast } from 'react-hot-toast'

export default function Mapper({ x, y, cs }: Props) {
    
    const [ loaded, setLoaded ] = useState(false)
    const [ showModal, setShowModal ] = useState(false);
    const [ curMapString, setCurMapString ] = useState("")
    const [ copied, setCopied ] = useState(false)
    const mapperService = useMapperContext()

    useEffect(() => {
        mapperService!.initMap(x, y)

        setLoaded(true)
    }, [])
    
    const handleSave = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let fileString = `${Math.floor(x / 2)} ${Math.floor(y / 2)} ${cs}\n`

        for ( let j = 0; j < y; j++ ) {     
            for ( let i = 0; i < x; i++ ) {
                fileString += `${mapperService?.getConnection(i, j) ? "1" : "0"}`
                if ( i < x - 1 ) {
                    fileString += " "
                }
            }
            fileString += "\n"
        }

        setCurMapString(fileString)
        setShowModal(true)
    }

    const handleCopy = () => {
        setCopied(true)
        toast.success("¡Se ha copiado el mapa al portapapeles!")
    }

    return (
        <main className="h-full w-full flex justify-center gap-8 p-12 pt-32 px-20">
            <div className="h-full w-full ">
                <div className="h-full w-full bg-sky-800 p-2 text-white">
                    Mapa
                </div>
                <div className='p-8 bg-sky-700'>
                    { loaded && <Map dims={mapperService!.getGridSize()} /> }
                </div>
            </div>
            <div className='absolute bottom-0 w-full self-center flex justify-center' >
                <button onClick={handleSave} className='bg-sky-800 rounded-full m-4 py-2 px-4 text-white'>Guardar</button>
            </div>
            <Modal
                title="Copiar mapa"
                onClose={() => {
                    setShowModal(false)
                    setCopied(false)
                }}
                show={showModal}
            >
                <div className='flex flex-col w-full h-full p-4'>
                    <div className='flex flex-1 justify-between gap-8 p-4 bg-sky-600 text-white items-center'>
                        <div>
                            Ya puedes copiar el mapa!
                        </div>
                        <CopyToClipboard text={curMapString} onCopy={handleCopy}>
                            <button className='text-sm p-2 bg-sky-500 rounded-md hover:scale-110 transition-all duration-300'>   
                                Copiar <FontAwesomeIcon icon={faCopy}/>
                            </button>
                        </CopyToClipboard>

                    </div>
                    <div className='flex justify-center items-center w-full h-full'>
                        <pre className='text-white bg-sky-800 p-4 w-full'>
                            {curMapString}
                        </pre>
                    </div>
                </div>
            </Modal>
        </main>
    )
}

Mapper.getInitialProps = async ({ query } : any) => {
    const { x, y, cs } = query
  
    return { x : parseInt(x), y : parseInt(y), cs : parseInt(cs) }
}