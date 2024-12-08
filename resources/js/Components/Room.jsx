import {formatDate} from "@/utils.js";

export default function Room( { room } ) {
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
}
