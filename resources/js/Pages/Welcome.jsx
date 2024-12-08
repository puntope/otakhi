import { Head, router } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import SearchRooms from "@/Components/SearchRooms.jsx";
import Room from "@/Components/Room.jsx";



export default function Welcome({ rooms, neighbourhoods, districts, filters, ...props} ) {

    console.log( rooms );
    return (
        <>
            <Head title="Otakhi.ge - Your room in Georgia" />
            <div className="bg-gray-50 text-black/50">
                <Header />
                <div
                    className="relative flex flex-col selection:bg-teal-400 selection:text-white">
                    <div>
                        <main>
                            <div className="bg-teal-50 shadow-inner px-4 py-16 relative">
                                <SearchRooms filters={ filters }  neighbourhoods={ neighbourhoods} districts={ districts} />
                            </div>
                            <div className="grid grid-cols-3 gap-5 gap-y-10 container mx-auto mt-20">
                                { rooms.map( room => <Room key={room.id} room={ room } />  )}
                            </div>
                        </main>
                        <aside>

                        </aside>
                        <footer className="py-16 text-center text-sm text-black">
                            OTAKHI.GE ® {new Date().getFullYear()}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
