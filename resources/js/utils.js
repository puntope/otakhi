export const formatDate = ( dateString ) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return new Date( dateString ).toLocaleDateString( undefined, options );
}

export const getNeighbourhoods = ( neighbourhoods, districtId ) => neighbourhoods.filter( neighbourhood => neighbourhood.district_id == districtId )
export const getNeighbourhood = ( neighbourhoods, neighbourhoodId ) => neighbourhoods.find( neighbourhood => neighbourhood.id == neighbourhoodId )
export const getDistrict = ( districts, districtId ) => districts.find( district => district.id == districtId )
