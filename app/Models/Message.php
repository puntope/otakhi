<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = [
        'conversation_id',
        'user_id',
        'message'
    ];

    /**
     * Relación con la conversación asociada.
     */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    /**
     * Relación con el usuario que envió el mensaje.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
