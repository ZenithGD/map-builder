import Navbar from '@/components/ui/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-blue-200 min-h-screen">
                <Navbar />
                <Main />
                <NextScript />
                <div id="modal-root"></div>
            </body>
        </Html>
    )
}
