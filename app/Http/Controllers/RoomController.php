<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\District;
use App\Models\Nationality;
use App\Models\Neighbourhood;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( Request $request ) {

        $filters = (new Room())->getFillable();
        $custom_filters = [ 'neighbourhoods','districts','max_contract_months', 'min_floor', 'max_floor' ];
        $filters = array_merge( $filters, $custom_filters );
        $request_filters = [];
        foreach ( $filters as $filter ) {
            if ( $filter === 'districts' || $filter === 'neighbourhoods' ) {
                $request_filters[$filter] = $request->query($filter) ? explode(',', $request->query( $filter ) ) : [];
            } else {
                $request_filters[$filter] = $request->query($filter);
            }
        }


        $roomQuery = Room::query()->with([ 'images', 'neighbourhood', 'district' ]);
        if ( ! empty( $request_filters['districts'] ) ) {
            $roomQuery->whereHas('neighbourhood', function ($query) use ( $request_filters ) {
                $query->whereIn('district_id', $request_filters['districts'] );
            });
        }

        if ( ! empty( $request_filters['neighbourhoods'] ) ) {
            $roomQuery->whereIn( 'neighbourhood_id', $request_filters['neighbourhoods'] );
        }

        if ( isset(  $request_filters[ 'availability_from_date' ] ) ) {
            $roomQuery
                ->where('availability_from_date', '<=', $request_filters['availability_from_date'] );
        }

        foreach ( ['price', 'deposit'] as $filter ) {
            if ( isset( $request_filters[$filter] ) ) {
                $roomQuery->where( $filter, '<=', (int) $request_filters[$filter] );
            }
        }

        // >=
        foreach ( ['size', 'allowed_people', 'min_contract_months' ] as $filter ) {
            if ( isset(  $request_filters[$filter] ) ) {
                $roomQuery->where( $filter, '>=', (int) $request_filters[$filter] );
            }
        }

        if ( isset(  $request_filters[ 'max_contract_months' ] ) ) {
            $roomQuery->where('min_contract_months', '<=', (int) $request_filters[ 'max_contract_months' ] );
        }

        if ( isset( $request_filters[ 'min_floor' ] ) ) {
            $roomQuery
                ->where( 'floor', '>=', (int) $request_filters[ 'min_floor' ] );
        }

        if ( isset(  $request_filters[ 'max_floor' ] ) ) {
            $roomQuery
                ->where( 'floor', '<=', (int) $request_filters[ 'max_floor' ] );
        }

        if ( isset(  $request_filters[ 'has_utilities' ] ) ) {
            $roomQuery
                ->where( 'has_utilities', '=', true );
        }


        $rooms = $roomQuery->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'districts' => District::all(),
            'neighbourhoods' => Neighbourhood::all(),
            'rooms' => $rooms,
            'filters' => array_merge(
                $request_filters, [
                    'districts' => $request->query('districts'),
                    'neighbourhoods' => $request->query('neighbourhoods')
                ]
            )
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $neighbourhoods = Neighbourhood::all()->toArray();
        $building_statuses =  array(
            [ 'id' => 'old', 'name' => 'Old' ],
            [ 'id' => 'new', 'name' => 'New' ],
            [ 'id' => 'old-renovated', 'name' => 'Old Renovated' ]
        );
        $genders =  array(
            [ 'id' => 'male', 'name' => 'Male' ],
            [ 'id' => 'female', 'name' => 'Female' ],
        );

        return Inertia::render('Rooms/Create', [
            'neighbourhoods' => $neighbourhoods,
            'building_statuses' => $building_statuses,
            'genders' => $genders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        $room = new Room();
        $room->fill($request->validated());
        $room->save();

        if ($request->hasFile('images')) {

            foreach ($request->file('images') as $image) {
                $path = $image->store('room_images', 'public'); // Guardar en storage/app/public/room_images

                $room->images()->create([
                    'image_path' => $path,
                    'is_main' => false,
                ]);
            }
        }

        $room->save();

        return redirect()->route('room.show', [ 'room' => $room ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        return Inertia::render('Room', [
            'room' => $room->load( 'images', 'landlord', 'neighbourhood', 'facilities' ),
            'nationalities' => Nationality::all()->toArray(),
            'created_at' => Carbon::parse( $room->created_at )->diffForHumans()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        if ( $room->user_id !== auth()->id() ) {
            abort(403, 'You do not have permission to access this resource.');
        }

        $neighbourhoods = Neighbourhood::all()->toArray();
        $building_statuses =  array(
            [ 'id' => 'old', 'name' => 'Old' ],
            [ 'id' => 'new', 'name' => 'New' ],
            [ 'id' => 'old-renovated', 'name' => 'Old Renovated' ]
        );
        $genders =  array(
            [ 'id' => 'male', 'name' => 'Male' ],
            [ 'id' => 'female', 'name' => 'Female' ],
        );

        return Inertia::render('Rooms/Create', [
            'neighbourhoods' => $neighbourhoods,
            'building_statuses' => $building_statuses,
            'genders' => $genders,
            'room' => $room
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoomRequest $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
