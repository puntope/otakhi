import {Head} from "@inertiajs/react";
import Header from "@/Components/Header.jsx";
import {
    Building,
    Calendar, Cigarette,
    CircleDollarSign,
    PawPrint,
    PiggyBank,
    Ruler,
    Toilet,
    User,
    UserRound, Users
} from "lucide-react";
import Button from "@/Components/Button.jsx";
import KeyElement from "@/Components/KeyElement.jsx";
import {formatDate} from "@/utils.js";


const getFurnishedString = ( room ) => {
    return  room.is_furnished ? 'Furnished' : 'Unfurnished';
}

const getGender = ( gender ) => {
    return  String(gender).charAt(0).toUpperCase() + String(gender).slice(1)
}

const getUtilities = ( room ) => {
    return room.has_utilities ? 'Incl. utilities' : 'Excl. utilities'
}

const getBuildingStatus = ( room ) => {
     switch ( room.building_status ) {
         case 'old':
             return 'Old';
         case 'old-renovated':
             return 'Renovated';
         default:
             return 'New';
     }
}

export default function Room( { room, created_at, nationalities } ) {

    console.log( room, nationalities );
    const getNationality = ( nationality ) => {
        return nationalities.find( nation => nation.id === nationality ).name;
    }
    return <div>
        <Head title={ `Room in ${room.address} - Otakhi.ge - Your room in Georgia `} />
        <div className="bg-gray-50 text-black/50">
            <Header />
            <article className="container mx-auto">
                <div className="py-10">
                    <h1 className="text-2xl text-black font-bold mb-2">{room.address}</h1>
                    <p><strong>{ getFurnishedString( room ) } room for rent in { room.neighbourhood.name }</strong> -
                        Posted {created_at}</p>
                </div>
                <div className="grid gap-4 grid-cols-[1fr_400px]">
                    <div>
                        <div className="w-full">
                            <div className="w-full h-0 pt-[60%] relative overflow-hidden inline-block">
                                <img className="absolute h-full w-full inset-0 object-cover"
                                     src={room.images.find(image => image.is_main).image_path} alt={room.address}/>
                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold my-4 mb-2">About the place</h2>
                                <p>{room.description}</p>
                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold my-4 mb-2">What will you get</h2>
                                <div className="grid grid-cols-3">
                                    <KeyElement
                                        key="size"
                                        data={`${room.size} m²`}
                                        icon={ <Ruler size={30} /> }
                                        secondary={`${getFurnishedString(room)} room`}
                                    />
                                    <KeyElement
                                        key="floor"
                                        data={ `${room.floor}º floor` }
                                        icon={ <Building size={30} /> }
                                        secondary={`In ${ getBuildingStatus(room) } building`}
                                    />
                                    <KeyElement
                                        key="baths"
                                        data={ `${room.num_bathrooms} bathrooms` }
                                        icon={ <Toilet size={30} /> }
                                        secondary={`Shared with your roommates`}
                                    />
                                    <KeyElement
                                        key="roommates"
                                        data={ `${ room.num_roommates } roommates` }
                                        icon={ <User size="30" /> }
                                        secondary={ room.roommates_gender ? 'All ' + room.roommates_gender : 'Mixed genders' }
                                    />
                                    { room.facilities.map(facility => {
                                        return <KeyElement
                                            key={ facility.name }
                                            data={ `${facility.name}` }
                                            icon={ facility.name }
                                            secondary={facility.description}
                                        />
                                    })}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold my-4 mb-2">What will you pay</h2>
                                <div className="bg-gray-200 p-5 rounded">
                                    <div className="flex justify-between items-center text-black border-b pb-2">
                                        <p>Monthly Rent ( {getUtilities(room)} ):</p>
                                        <strong className="text-black font-bold text-lg">{room.price}$</strong>
                                    </div>
                                    <div className="flex justify-between items-center text-black">
                                        <p>Deposit:</p>
                                        <strong className="text-black font-bold text-lg">{room.deposit}$</strong>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold my-4 mb-2">Where will you live</h2>
                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold my-4 mb-2">Ideal tenant</h2>
                                <div className="bg-gray-200 p-5 rounded">
                                    <div className="flex justify-between items-center text-black mb-2">
                                        <div className="flex gap-2"><Users /> Maximum number of tenants in the room:</div>
                                        <strong className="text-black font-bold text-lg">{room.allowed_people}</strong>
                                    </div>
                                    <div className="flex justify-between items-center text-black mb-2">
                                        <div className="flex gap-2"><PawPrint /> Pets allowed:</div>
                                        <strong
                                            className="text-black font-bold text-lg">{room.allows_pets ? 'Yes' : 'No'}</strong>
                                    </div>
                                    <div className="flex justify-between items-center text-black mb-2">
                                        <div className="flex gap-2"><Cigarette /> Smoking allowed:</div>
                                        <strong
                                            className="text-black font-bold text-lg">{room.allows_smoking ? 'Yes' : 'No'}</strong>
                                    </div>
                                    <div className="flex justify-between items-center text-black mb-2">
                                        <div className="flex gap-2"><User/>Gender</div>
                                        <strong
                                            className="text-black font-bold text-lg">{room.required_gender ? getGender( room.required_gender )  : 'Not important' }</strong>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl text-black font-bold my-4 mb-2">About the landlord</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-5">
                                        <UserRound/>
                                        <strong>{room.landlord.name}</strong>
                                    </div>
                                    <div className="bg-gray-200 p-4 rounded mb-2">
                                        <p>Gender: {getGender( room.landlord.gender )}</p>
                                        <p>Nationality: {getNationality(room.landlord.nationality_id)}</p>
                                        <p>Member since: {formatDate(room.landlord.created_at)}</p>
                                    </div>
                                    <p className="mb-5">
                                        {room.landlord.intro}
                                    </p>
                                    <Button>Contact Landlord</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sticky h-[fit-content] top-1 bg-white rounded border p-5">
                        <KeyElement
                            suffix=" /month"
                            data={`$ ${room.price}`}
                            icon={<CircleDollarSign size="30"/>}
                            secondary={getUtilities(room)}
                        />
                        <KeyElement
                            data={room.deposit ? `$ ${room.deposit} deposit` : 'No deposit'}
                            secondary={ room.deposit > 0 && 'Will be returned after.' }
                            icon={ <PiggyBank size={30} /> }
                        />
                        <KeyElement
                            data={ room.size }
                            suffix=" m²"
                            icon={ <Ruler size={30} /> }
                            secondary={`${getFurnishedString(room)} room`}
                        />
                        <KeyElement
                            data={`Available from ${formatDate(room.availability_from_date)}`}
                            icon={ <Calendar size={30} /> }
                            secondary={`Min ${room.min_contract_months} months contract`}
                        />
                        <KeyElement
                            data={`${room.floor}º floor`}
                            icon={ <Building size={30} /> }
                            secondary={`In ${ getBuildingStatus(room) } building`}
                        />
                        <div className="border-t pt-5 mt-5 flex flex-col justify-center">
                            <div className="flex items-center mb-2 justify-center">
                                <UserRound/>
                                <strong>{room.landlord.name}</strong>
                            </div>
                            <Button>Contact Landlord</Button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>

}
