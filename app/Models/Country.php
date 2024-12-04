<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'city_id',
        'name'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function cities()
    {
        return $this->hasMany(City::class);
    }

    public function rooms()
    {
        return $this->hasManyThrough(Room::class, Neighbourhood::class, 'country_id', 'neighbourhood_id', 'id', 'id');
    }
}
