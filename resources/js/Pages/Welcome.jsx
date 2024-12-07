import { Head, router } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import SearchRooms from "@/Components/SearchRooms.jsx";



export default function Welcome({ rooms, neighbourhoods, districts, filters, ...props} ) {

    console.log( rooms );
    const formatDate = ( dateString ) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };

        return new Date( dateString ).toLocaleDateString( undefined, options );
    }

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
                                { rooms.map( room => {
                                    return <article key={room.id}>
                                            <div className="overflow-hidden h-56 bg-gray-100 md:h-70 lg:h-80">
                                                <img className="w-full h-full"
                                                     src={room.images.find(image => image.is_main).image_path}
                                                     alt={`Room in ${room.neighbourhood.name}, ${room.district.name}`}/>
                                            </div>
                                            <div className="mt-3">
                                                <h3 className="bold text-xl text-black">Room
                                                    in {room.neighbourhood.name}, {room.district.name}</h3>
                                                <div>{room.size}m²
                                                    - {room.is_furnished ? 'furnished' : 'unfurnished'}</div>
                                                <div>Available from {formatDate(room.availability_from_date)}</div>
                                                <div><strong
                                                    className="bold text-xl text-black">{room.price}$</strong>/month {room.has_utilities && ' (incl. utilities)'}
                                                </div>
                                            </div>
                                    </article>
                                })}
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-black">
                            OTAKHI.GE ® {new Date().getFullYear()}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
