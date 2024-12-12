<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Models\District;
use App\Models\Neighbourhood;
use App\Models\Room;
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
        $custom_filters = [ 'max_contract_months', 'min_floor', 'max_floor' ];
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoomRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
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
