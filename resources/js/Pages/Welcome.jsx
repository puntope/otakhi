import {Head, router} from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import SearchRooms from "@/Components/SearchRooms.jsx";
import Room from "@/Components/Room.jsx";
import {useState} from "react";
import FilterRoom from "@/Components/FilterRoom.jsx";
import {getNeighbourhoods} from "@/utils.js";



export default function Welcome({ rooms, neighbourhoods, districts, filters, ...props} ) {

    console.log( rooms );

    const [activeFilters, setActiveFilters] = useState({
        districts: filters?.districts ? filters.districts.split(',') : [],
        neighbourhoods: filters?.neighbourhoods ? filters.neighbourhoods.split(',') : [],
        size: filters.size ?? '',
        price: filters.price ?? '',
        availability_from_date: filters.availability_from_date ?? '',
        deposit: filters.deposit ?? '',
        min_contract_months: filters.min_contract_months ?? '',
        max_contract_months: filters.max_contract_months ?? '',
        allowed_people: filters.allowed_people ?? '',
        min_floor: filters.min_floor ?? '',
        max_floor: filters.max_floor ?? '',
        building_type_old: filters.building_type_old ?? '',
        building_type_new: filters.building_type_new ?? '',
        building_type_renovated: filters.building_type_renovated ?? '',
        has_utilities: filters.has_utilities,
        is_furnished: filters.is_furnished,
        allows_pets: filters.allows_pets,
        num_roommates: filters.num_roommates,
        num_bathrooms: filters.num_bathrooms,
        roommates_gender_male: filters.roommates_gender_male,
        roommates_gender_female: filters.roommates_gender_female,
        gender_female: filters.gender_female,
        gender_male: filters.gender_male,
    });

    const handleFilterChange = ( filterKey, value ) => {
        setActiveFilters((prev) => {

            const updatedFilters = { ...prev };

            let filter = updatedFilters[filterKey];

            if ( Array.isArray( filter ) ) {
                if ( filter.includes(value) ) {
                    filter = filter.filter( id => id !== value);
                } else {
                    filter.push(value);
                }
            } else {
                filter = value;
            }

            updatedFilters[filterKey] = filter;

            if ( filterKey === 'districts') {
                const districtNeighbourhoods = getNeighbourhoods( neighbourhoods, value ).map( neighbourhood => neighbourhood.id.toString() );
                if (  filter.includes( value ) ) {
                    // if a district is selected, select all neighbourhoods for that district
                    updatedFilters[ 'neighbourhoods' ] = [ ...updatedFilters[ 'neighbourhoods'], ...districtNeighbourhoods ];
                } else {
                    // if a district is unselected, unselect all neighbourhoods for that district
                    updatedFilters[ 'neighbourhoods' ] = updatedFilters[ 'neighbourhoods'].filter( id => ! districtNeighbourhoods.includes( id ) );
                }
            }

            return updatedFilters;
        });
    };

    const search = () => {
        const query = {
            ...activeFilters,
            districts: activeFilters.districts.join(','),
            neighbourhoods: activeFilters.neighbourhoods.join(',')
        };

        Object.keys(query).forEach((key) => {
            if (!query[key]) delete query[key];
        });

        router.get( '/', { ...query });
    };

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
                                <SearchRooms
                                    filters={ activeFilters }
                                    neighbourhoods={ neighbourhoods}
                                    districts={ districts}
                                    onFilterChange={handleFilterChange}
                                    onSearch={search} />
                            </div>
                            <div className="grid grid-cols-3 gap-5 gap-y-10 container mx-auto mt-20">
                                { rooms.map( room => <Room key={room.id} room={ room } />  )}
                            </div>
                        </main>
                        <FilterRoom filters={ activeFilters } onFilterChange={ handleFilterChange } onSearch={ search } />
                        <footer className="py-16 text-center text-sm text-black">
                            OTAKHI.GE ® {new Date().getFullYear()}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
