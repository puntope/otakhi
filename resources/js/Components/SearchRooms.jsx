import {ChevronDown} from "lucide-react";
import useOutsideClick from "@/Hooks/useOutsideClick.js";
import {useRef, useState} from "react";
import {getDistrict, getNeighbourhood, getNeighbourhoods} from "@/utils.js";
import Button from "@/Components/Button.jsx";

export default function SearchRooms( { filters, neighbourhoods, districts, onSearch, onFilterChange } ) {
    const [ showLocations, setShowLocations ] = useState( false );
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    useOutsideClick( [ inputRef, dropdownRef ], () => { setShowLocations( false ) } );


    const getTruncatedSelectionForLocation = () => {
        let locations = [];
        const locationsDistricts = filters.districts;
        const locationsNeighbourhoods = filters.neighbourhoods;

        if ( locationsDistricts.length ) {
            locations = locations.concat( locationsDistricts.map( locationDistrict => getDistrict( districts, locationDistrict ).name ) );
        }

        if ( locationsNeighbourhoods.length ) {
            locations = locations.concat( locationsNeighbourhoods.map( locationsNeighbourhood => getNeighbourhood( neighbourhoods, locationsNeighbourhood ).name ) );
        }

        return locations.slice(0, 3);
    }


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
                            {!filters.districts.length && !filters.neighbourhoods.length &&
                                <span>Select a Neighbourhood</span> }
                            <span>...</span>
                        </div>
                    </div>
                    <div className="basis-1/12 flex justify-end">
                        <ChevronDown/>
                    </div>
                </div>
                <div className="p-2 shrink flex items-center border-r border-r-gray-100">
                    <input
                        value={ filters['price']}
                        onChange={ ( e ) => {
                            onFilterChange('price', e.target.value )
                        }}
                        min="0" step="1" placeholder="Max. Price" type="number" className="text-lg form-input border-none focus:ring-0" /><span>$</span>
                </div>
                <div className="p-2 shrink flex items-center border-r border-r-gray-100">
                    <input
                        value={ filters['size']}
                        onChange={ ( e ) => {
                            onFilterChange('size', e.target.value )
                        }}
                        min="0" step="1" placeholder="Min. Size" type="number"
                           className="text-lg form-input border-none focus:ring-0"/><span>m²</span>
                </div>
                <div className="p-2 shrink">
                    <Button onClick={ onSearch }>Search</Button>
                </div>
            </div>
        </div>
        {
            <div
                ref={ dropdownRef }
                className={ "absolute left-1/2 -translate-x-1/2 shadow-md bg-white p-4 rounded grid grid-flow-col auto-cols-auto gap-4 z-10 container  mx-auto " + ( showLocations ? 'show' : 'hidden' ) } >
                {districts.map(district => {
                    const districtNeighbourhoods = getNeighbourhoods( neighbourhoods, district.id );

                    return (
                        <div key={district.id}>
                            <div className="flex gap-x-2 items-center">
                                <input
                                    className="form-checkbox checked:bg-teal-400 checked:hover:bg-teal-500 checked:focus:bg-teal-500 focus:ring-teal-600"
                                    id={ district.id }
                                    type="checkbox"
                                    value={district.id}
                                    checked={filters.districts.includes(district.id.toString())}
                                    onChange={() => {
                                        onFilterChange('districts', district.id.toString())
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
                                            checked={filters.neighbourhoods.includes(neighbourhood.id.toString())}
                                            onChange={() => {
                                                onFilterChange('neighbourhoods', neighbourhood.id.toString())
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
