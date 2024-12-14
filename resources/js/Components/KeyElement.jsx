import {
    Wifi,
    Star,
    ShowerHead,
    ConciergeBell,
    ParkingCircle,
    SquareChevronUp,
    MountainSnow,
    Heater, CookingPot, AirVent
} from "lucide-react";

const getIcon = ( icon ) => {
    if ( typeof icon === 'string' ) {
        switch ( icon ) {
            case 'Internet':
                return <Wifi size={30} />
            case 'Concierge':
                return <ConciergeBell size={30} />
            case 'Parking':
                return <ParkingCircle size={30} />
            case 'Elevator':
                return <SquareChevronUp size={30} />
            case 'Private Bathroom':
                return <ShowerHead size={30} />
            case 'Balcony':
                return <MountainSnow size={30} />
            case 'Heater':
                return <Heater size={30} />
            case 'Private Kitchen':
                return <CookingPot size={30} />
            case 'Aircon':
                return <AirVent size={30} />
            default:
                return <Star size={ 30} />
        }
    }

    return icon;
}
export default function KeyElement( { icon, data,prefix, suffix, secondary } ) {
    return <div className="py-5 flex gap-2 items-start">
        <div className="min-w-7">{ getIcon( icon ) }</div>
        <div>
            <div className="text-lg">
                { prefix && <span>{ prefix }</span> }
                <strong className="text-black">{data}</strong>
                { suffix && <span>{ suffix }</span> }
            </div>
            {secondary && <div>
                {secondary}
            </div>}
        </div>
    </div>
}
