export const formatDate = ( dateString ) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return new Date( dateString ).toLocaleDateString( undefined, options );
}

export const getImagePath = ( room ) => {
    if ( room?.images?.length === 0 ) {
        return 'https://placehold.co/600x400';
    }

    if ( room.images[0].image_path.startsWith( 'http' ) ) {
        return room.images[0].image_path;
    }

    return '/storage/' + room.images[0].image_path;
}

export const getNeighbourhoods = ( neighbourhoods, districtId ) => neighbourhoods.filter( neighbourhood => neighbourhood.district_id == districtId )
export const getNeighbourhood = ( neighbourhoods, neighbourhoodId ) => neighbourhoods.find( neighbourhood => neighbourhood.id == neighbourhoodId )
export const getDistrict = ( districts, districtId ) => districts.find( district => district.id == districtId )
