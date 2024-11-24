<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomImage extends Model
{
    use HasFactory;

    /**
     * Relación inversa con la habitación.
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
