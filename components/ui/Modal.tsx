import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

type Props = {
    show : boolean,
    onClose : Function,
    children?: React.ReactNode,
    title? : string
}

export default function Modal({ show, onClose, children, title }: Props) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };

    function ModalContent({} : any) {
        return show 
            ? <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center p-36 bg-black bg-opacity-30">
                <div className='bg-white rounded-lg shadow-md'>
                    <div className='flex justify-between p-4 bg-sky-600 rounded-t-lg'>
                        <p className='text-white font-bold'>{title}</p>
                        <button onClick={handleCloseClick} className='text-white hover:scale-110'>
                            <FontAwesomeIcon icon={faClose}/>
                        </button>
                    </div>
                    <div className='p-4 bg-sky-200 rounded-b-lg'>
                        {children}
                    </div>
                </div>
            </div>
            : null
    }

    if (isBrowser) {
        return ReactDOM.createPortal(
            <ModalContent>
                {children}
            </ModalContent>,
            document.getElementById("modal-root")!
        );
    } else {
        return null;
    }
}