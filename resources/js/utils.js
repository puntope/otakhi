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

export const getFurnishedString = ( room ) => {
    return  room.is_furnished ? 'Furnished' : 'Unfurnished';
}

export const getGender = ( gender ) => {
    if (!gender) return 'Prefer not to say';

    return  String(gender).charAt(0).toUpperCase() + String(gender).slice(1)
}

export const getUtilities = ( room ) => {
    return room.has_utilities ? 'Incl. utilities' : 'Excl. utilities'
}

export const getBuildingStatus = ( room ) => {
    switch ( room.building_status ) {
        case 'old':
            return 'Old';
        case 'old-renovated':
            return 'Renovated';
        default:
            return 'New';
    }
}

export const getNationality = ( nationalities, nationalityId ) => nationalities.find( nationality => nationality.id == nationalityId )
