<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'address',
        'latitude',
        'longitude',
        'description',
        'price',
        'deposit',
        'size',
        'has_utilities',
        'is_furnished',
        'allows_smoking',
        'allows_pets',
        'allowed_people',
        'availability_date',
        'min_contract_months',
        'required_gender',
        'roommates_gender',
        'num_roommates',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'price' => 'decimal:2',
        'deposit' => 'decimal:2',
        'size' => 'decimal:2',
        'has_utilities' => 'boolean',
        'is_furnished' => 'boolean',
        'allows_smoking' => 'boolean',
        'allows_pets' => 'boolean',
        'allowed_people' => 'integer',
        'min_contract_months' => 'integer',
        'num_roommates' => 'integer',
        'availability_date' => 'date',
    ];

    /**
     * Relationships
     */

    // Room belongs to a user (owner)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Room belongs to a user (owner)
    public function facilities()
    {
        return $this->hasMany(Facility::class);
    }

    /**
     * Scope for filtering rooms by geographic area
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param float $latitude
     * @param float $longitude
     * @param float $radius
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeNear($query, $latitude, $longitude, $radius = 10)
    {
        $haversine = "(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude))))";
        return $query->whereRaw("$haversine < ?", [$latitude, $longitude, $latitude, $radius]);
    }

    /**
     * Relación uno a muchos con las imágenes.
     */
    public function images()
    {
        return $this->hasMany(RoomImage::class);
    }

    /**
     * Obtener la imagen principal.
     */
    public function mainImage()
    {
        return $this->hasOne(RoomImage::class)->where('is_main', true);
    }

    public function landlord()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Usuarios interesados en la habitación.
     */
    public function interestedUsers()
    {
        return $this->hasManyThrough(
            User::class,          // Modelo al que queremos acceder
            Conversation::class,  // Tabla intermedia
            'room_id',            // Foreign key en conversations (hacia rooms)
            'id',                 // Foreign key en users (hacia conversations.user_id)
            'id',                 // Local key en rooms
            'user_id'             // Local key en conversations
        );
    }

    /**
     * Conversaciones relacionadas con la habitación.
     */
    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }
}
