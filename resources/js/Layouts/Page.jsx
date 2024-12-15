import {Head} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";

export default function Page( { children, headingTitle, title, locked = false } ) {
    return <div className={ '' + ( locked === true && 'h-screen overflow-hidden')}>
        <Head title={title}/>
        <div className="bg-gray-50 text-black/50">
            <Header/>
            {headingTitle && <div className="container mx-auto py-8"><h2
                className="text-xl font-semibold leading-tight text-gray-800">{headingTitle}</h2></div>}
            <div>
                {children}
            </div>
            <footer className="py-16 text-center text-sm text-black">
                OTAKHI.GE ® {new Date().getFullYear()}
            </footer>
        </div>
    </div>
}
