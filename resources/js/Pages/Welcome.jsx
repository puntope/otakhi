import { Head, Link } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";

export default function Welcome({ rooms} ) {

    console.log( rooms );
    return (
        <>
            <Head title="Otakhi.ge - Your room in Georgia" />
            <div className="bg-gray-50 text-black/50">
                <Header />
                <div
                    className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main>
                            {
                                rooms?.map( room => <article>
                                    <h2>{}</h2>
                                </article> )
                            }
                        </main>
                        <footer className="py-16 text-center text-sm text-black">
                            OTAKHI.GE ® { new Date().getFullYear() }
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
