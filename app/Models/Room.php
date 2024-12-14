<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    /** @use HasFactory<\Database\Factories\RoomFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'neighbourhood_id',
        'address',
        'latitude',
        'longitude',
        'description',
        'price',
        'deposit',
        'size',
        'has_utilities',
        'has_guard',
        'has_parking',
        'is_furnished',
        'allows_smoking',
        'allows_pets',
        'allowed_people',
        'availability_from_date',
        'availability_to_date',
        'min_contract_months',
        'building_status',
        'num_bathrooms',
        'floor',
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
        'price' => 'integer',
        'deposit' => 'integer',
        'size' => 'integer',
        'has_utilities' => 'boolean',
        'has_guard' => 'boolean',
        'has_parking' => 'boolean',
        'is_furnished' => 'boolean',
        'allows_smoking' => 'boolean',
        'allows_pets' => 'boolean',
        'allowed_people' => 'integer',
        'min_contract_months' => 'integer',
        'num_roommates' => 'integer',
        'num_bathrooms' => 'integer',
        'floor' => 'integer',
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
    public function facilities() {
        return $this->belongsToMany(Facility::class, 'room_facilities');
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

    public function neighbourhood()
    {
        return $this->belongsTo(Neighbourhood::class);
    }

    public function district()
    {
        return $this->hasOneThrough(District::class, Neighbourhood::class, 'id', 'id', 'neighbourhood_id', 'district_id');
    }

    public function city()
    {
        return $this->hasOneThrough(City::class, District::class, 'id', 'id', 'district_id', 'city_id');
    }

    public function country()
    {
        return $this->hasOneThrough(Country::class, City::class, 'id', 'id', 'city_id', 'country_id');
    }

    /**
     * Scope para obtener las habitaciones más recientes disponibles.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('availability_date', '<=', now())
            ->orderBy('availability_date', 'desc');
    }
}
