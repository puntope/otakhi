import { Head, Link } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Otakhi.ge - Your room in Georgia" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <Header />
                <div
                    className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main>

                        </main>
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            OTAKHI.GE ® { new Date().getFullYear() }
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
