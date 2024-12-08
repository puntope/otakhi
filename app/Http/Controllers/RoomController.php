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

        $filterDistricts = $request->query('districts') ? explode(',', $request->query('districts')) : [];
        $filterNeighbourhoods = $request->query('neighbourhoods') ? explode(',', $request->query('neighbourhoods')) : [];
        $filterSize = $request->query('size');
        $filterPrice = $request->query('price');


        $roomQuery = Room::query()->with([ 'images', 'neighbourhood', 'district' ]);
        if ( ! empty( $filterDistricts ) ) {
            $roomQuery->whereHas('neighbourhood', function ($query) use ($filterDistricts) {
                $query->whereIn('district_id', $filterDistricts);
            });
        }

        if ( ! empty( $filterNeighbourhoods ) ) {
            $roomQuery->whereIn( 'neighbourhood_id', $filterNeighbourhoods );
        }

        if ( ! empty( $filterSize ) ) {
            $roomQuery->where( 'size', '>=', (int) $filterSize );
        }

        if ( ! empty( $filterPrice ) ) {
            $roomQuery->where( 'price', '<=', (int) $filterPrice );
        }

        $rooms = $roomQuery->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'districts' => District::all(),
            'neighbourhoods' => Neighbourhood::all(),
            'rooms' => $rooms,
            'filters' => [
                'districts' => $request->query('districts'),
                'neighbourhoods' => $request->query('neighbourhoods'),
                'size' => $request->query('size'),
                'price' => $request->query('price'),
            ]
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
