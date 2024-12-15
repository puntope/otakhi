import {formatDate, getImagePath } from "@/utils.js";
import {Link} from "@inertiajs/react";

export default function Room( { room } ) {

    return <article key={room.id}>
        <div className="w-full h-0 pt-[60%] relative overflow-hidden inline-block">
            <Link href={route('room.show', room)}> <img className="absolute h-full w-full inset-0 object-cover"
                 src={ getImagePath(room) }
                                                        alt={room.address}/>
            </Link>
        </div>
        <div className="mt-3">
            <Link href={route('room.show', room)}><h3 className="bold text-xl text-black hover:opacity-50">Room
                in {room.neighbourhood.name}, {room.district.name}</h3></Link>
            <div>{room.size}m²
                - {room.is_furnished ? 'furnished' : 'unfurnished'}</div>
            <div>Available from {formatDate(room.availability_from_date)}</div>
            <div><strong
                className="bold text-xl text-black">{room.price}$</strong>/month {room.has_utilities && ' (incl. utilities)'}
            </div>
        </div>
    </article>
}
