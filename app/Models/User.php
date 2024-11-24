<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'intro',
        'gender',
        'nationality_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relación de un usuario a muchas habitaciones (rooms)
     */
    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    /**
     * Relación de un usuario con una nacionalidad
     */
    public function nationality()
    {
        return $this->belongsTo(Nationality::class);
    }

    /**
     * Relación muchos a muchos con los idiomas.
     */
    public function languages()
    {
        return $this->belongsToMany(Language::class, 'user_languages');
    }

    /**
     * Conversaciones relacionadas con la habitación.
     */
    public function conversations()
    {
        return $this->hasMany(Conversation::class);
    }
}
