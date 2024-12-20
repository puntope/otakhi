<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [ 'name' ];

    /**
     * La relación muchos a muchos con los usuarios.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_languages');
    }
}
