<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Nationality;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ConversationController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create( Room $room ) {
        $conversation = Conversation::query()->where( 'room_id', '=', $room->id )->where( 'user_id', auth()->id() )->first();
        if ( $conversation ) {
            return redirect()->route('conversation.show', [ 'conversation' => $conversation->load('room', 'messages','user','landlord') ]);
        }

        return Inertia::render('Conversations/Create', [
            'room' => $room->load('images', 'neighbourhood', 'landlord' ),
            'nationalities' => Nationality::all()->toArray()
        ] );
    }

    /**
     * Save a new conversation with an initial message
     */
    public function store( StoreConversationRequest $request ) {

        DB::beginTransaction();

        try {
            $conversation = new Conversation();
            $conversation->fill($request->validated());
            $conversation->save();

            if ( ! $conversation->save() ) {
                throw new \Exception('Ups.');
            }

            if ($request->has('message')) {
                $message = new Message();
                $data = [
                    'conversation_id' => $conversation->id,
                    'user_id' => auth()->id(),
                    'message' => $request->input('message')
                ];

                $message->fill($data);
                if (!$message->save()) {
                    throw new \Exception('Error saving message.');
                }
            } else {
                throw new \Exception('Message not found .');
            }

        DB::commit();

        } catch ( \Exception $e ) {
            DB::rollBack();
            return back()->withErrors( [ 'Unable to save'] );

        }

        return redirect()->route('conversation.show', [ 'conversation' => $conversation->load('room', 'messages','user','landlord') ]);
    }

    /**
     * Update the conversation.
     */
    public function update(UpdateConversationRequest $request): RedirectResponse
    {
        $conversation = Conversation::query()->where( 'id', '=',  $request->input('conversation_id') )->firstOrFail();
        if ( $conversation ) {
            $message = new Message();
            $data = [
                'conversation_id' => $conversation->id,
                'user_id' => auth()->id(),
                'message' => $request->input('message')
            ];

            $message->fill($data);
            if (!$message->save()) {
                return back()->withErrors( [ 'Unable to save'] );
            }
        }

        return redirect()->route('conversation.show', [ 'conversation' => $conversation->load('room', 'messages','user','landlord') ]);
    }

    /**
     * Display the specified resource.
     */
    public function show( Conversation $conversation )
    {

        $conversation = $conversation->load( 'room', 'user', 'landlord', 'messages' );

        if ( auth()->id() !== $conversation->user_id && auth()->id() !== $conversation->landlord->id ) {
            abort(403, 'You do not have permission to access this resource.');
        }

        return Inertia::render('Conversation', [
            'conversation' => $conversation->load( 'room', 'user', 'landlord', 'messages' )
        ]);
    }


}
