import {ChevronDown} from "lucide-react";
import useOutsideClick from "@/Hooks/useOutsideClick.js";
import {useRef, useState} from "react";
import {router} from "@inertiajs/react";

export default function SearchRooms( { filters, neighbourhoods, districts } ) {
    const [ showLocations, setShowLocations ] = useState( false );
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [activeFilters, setActiveFilters] = useState({
        districts: filters?.districts ? filters.districts.split(',') : [],
        neighbourhoods: filters?.neighbourhoods ? filters.neighbourhoods.split(',') : [],
    });
    useOutsideClick( [ inputRef, dropdownRef ], () => { setShowLocations( false ) } );


    const getNeighbourhoods = ( districtId ) => neighbourhoods.filter( neighbourhood => neighbourhood.district_id == districtId )
    const getNeighbourhood = ( neighbourhoodId ) => neighbourhoods.find( neighbourhood => neighbourhood.id == neighbourhoodId )
    const getDistrict = ( districtId ) => districts.find( district => district.id == districtId )

    const getTruncatedSelectionForLocation = () => {
        let locations = [];
        const locationsDistricts = activeFilters.districts;
        const locationsNeighbourhoods = activeFilters.neighbourhoods;

        if ( locationsDistricts.length ) {
            locations = locations.concat( locationsDistricts.map( locationDistrict => getDistrict( locationDistrict ).name ) );
        }

        if ( locationsNeighbourhoods.length ) {
            locations = locations.concat( locationsNeighbourhoods.map( locationsNeighbourhood => getNeighbourhood( locationsNeighbourhood ).name ) );
        }

        return locations.slice(0, 3);
    }

    const handleFilterChange = ( filterKey, value ) => {
        setActiveFilters((prev) => {

            const updatedFilters = { ...prev };

            let filter = updatedFilters[filterKey].slice();

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
                const districtNeighbourhoods = getNeighbourhoods( value ).map( neighbourhood => neighbourhood.id.toString() );
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

    return <>
        <div className="rounded bg-white shadow-sm mb-2 container mx-auto text-lg">
            <div className="flex max-w-full">
                <div
                    ref={ inputRef }
                    onClick={ () => { setShowLocations( checked => ! checked ) } }
                    className="p-2 flex grow shrink items-center border-r border-r-gray-100 cursor-pointer hover:opacity-80">
                    <div className="overflow-x-scroll basis-11/12">
                        <div className="mr-2 text-nowrap flex items-end">
                            {getTruncatedSelectionForLocation().map(location => <span key={location}
                                                                                      className="bg-teal-100 p-1 mr-1 rounded text-xs">{location}</span>)}
                            {!activeFilters.districts.length && !activeFilters.neighbourhoods.length &&
                                <span>Select a Neighbourhood</span> }
                            <span>...</span>
                        </div>
                    </div>
                    <div className="basis-1/12 flex justify-end">
                        <ChevronDown/>
                    </div>
                </div>
                <div className="p-2 shrink flex items-center border-r border-r-gray-100">
                    <input min="0" step="1" placeholder="Max. Price" type="number" className="text-lg form-input border-none focus:ring-0" /><span>$</span>
                </div>
                <div className="p-2 shrink flex items-center border-r border-r-gray-100">
                    <input min="0" step="1" placeholder="Min. Size" type="number"
                           className="text-lg form-input border-none focus:ring-0"/><span>m²</span>
                </div>
                <div className="p-2 shrink">
                    <button
                        className="min-w-36 rounded bg-teal-400 text-white p-2 font-bold hover:bg-teal-500"
                        onClick={search}>Search
                    </button>
                </div>
            </div>
        </div>
        {
            <div
                ref={ dropdownRef }
                className={ "absolute left-1/2 -translate-x-1/2 shadow-md bg-white p-4 rounded grid grid-flow-col auto-cols-auto gap-4 container mx-auto " + ( showLocations ? 'show' : 'hidden' ) } >
                {districts.map(district => {
                    const districtNeighbourhoods = getNeighbourhoods(district.id);

                    return (
                        <div key={district.id}>
                            <div className="flex gap-x-2 items-center">
                                <input
                                    className="form-checkbox checked:bg-teal-400 checked:hover:bg-teal-500 checked:focus:bg-teal-500 focus:ring-teal-600"
                                    id={ district.id }
                                    type="checkbox"
                                    value={district.id}
                                    checked={activeFilters.districts.includes(district.id.toString())}
                                    onChange={() => {
                                        handleFilterChange('districts', district.id.toString())
                                    }}
                                />
                                <label htmlFor={ district.id }><strong>{district.name}</strong></label>
                            </div>
                            <div className="flex flex-col items-start pt-4 gap-y-2">
                                {districtNeighbourhoods.map(neighbourhood => {
                                    return <div key={neighbourhood.id} className="flex gap-x-2 items-center">
                                        <input
                                            className="form-checkbox checked:bg-teal-400 checked:hover:bg-teal-500 checked:focus:bg-teal-500 focus:ring-teal-600"
                                            id={neighbourhood.id}
                                            type="checkbox"
                                            value={neighbourhood.id}
                                            checked={activeFilters.neighbourhoods.includes(neighbourhood.id.toString())}
                                            onChange={() => {
                                                handleFilterChange('neighbourhoods', neighbourhood.id.toString())
                                            }}
                                        />
                                        <label htmlFor={neighbourhood.id}>{neighbourhood.name}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        }
    </>
}
