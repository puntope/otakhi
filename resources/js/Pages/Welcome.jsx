import { Head, router } from '@inertiajs/react';
import Header from "@/Components/Header.jsx";
import { useState} from "react";

export default function Welcome({ districts, filters, ...props} ) {
    const [activeFilters, setActiveFilters] = useState({
        districts: filters?.districts ? filters.districts.split(',') : [],
    });


    const handleFilterChange = ( filterKey, value ) => {
        setActiveFilters((prev) => {
            const updatedFilters = { ...prev };

            let filter = updatedFilters[filterKey].slice()
            if ( Array.isArray( filter ) ) {
                if ( filter.includes(value) ) {
                    filter = filter.filter((id) => id !== value);
                } else {
                    filter.push(value);
                }
            } else {
                filter = value;
            }

            updatedFilters[filterKey] = filter;

            return updatedFilters;
        });
    };

    const applyFilters = () => {

        const query = {...activeFilters, districts: activeFilters.districts.join(',') };

        Object.keys(query).forEach((key) => {
            if (!query[key]) delete query[key];
        });

        console.log( query );
        router.get( '/rooms', { ...query });
    };

    console.log( districts, props );
    return (
        <>
            <Head title="Otakhi.ge - Your room in Georgia" />
            <div className="bg-gray-50 text-black/50">
                <Header />
                <div
                    className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main>
                            {districts?.map((district) => (
                                <label key={district.id}>
                                    <input
                                        type="checkbox"
                                        value={district.id}
                                        checked={activeFilters.districts.includes(district.id.toString())}
                                        onChange={() => { handleFilterChange( 'districts', district.id.toString() ) } }
                                    />
                                    {district.name}
                                </label>
                            ))}
                            <button onClick={applyFilters}>Apply Filters</button>
                        </main>
                        <footer className="py-16 text-center text-sm text-black">
                            OTAKHI.GE ® { new Date().getFullYear() }
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
