<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    /**
     * Relación con la habitación.
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Relación con el usuario interesado.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con el propietario de la habitación.
     */
    public function landlord()
    {
        return $this->hasOneThrough(
            User::class,
            Room::class,
            'id',       // Foreign key on the rooms table...
            'id',       // Foreign key on the users table...
            'room_id',  // Local key on the conversations table...
            'user_id'   // Local key on the rooms table...
        );
    }

    /**
     * Relación con los mensajes.
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
