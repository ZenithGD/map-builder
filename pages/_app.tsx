import { MapperContextProvider } from '@/context/mapperContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

export default function App({ Component, pageProps }: AppProps) {
    return ( 
        <>
            <Toaster />
            <MapperContextProvider>
                <Component {...pageProps} />
            </MapperContextProvider>
        </>
    )
}
