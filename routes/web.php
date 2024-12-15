<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomImageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RoomController::class, 'index'])->name('welcome');
Route::get('/room/{room}', [RoomController::class, 'show'])->name('room.show');


Route::middleware('auth')->group(function () {
    Route::get('/rooms/new', [RoomController::class, 'create'])->name('room.create');
    Route::get('/rooms', [RoomController::class, 'edit'])->name('room.edit');
    Route::post('/rooms', [RoomController::class, 'store'])->name('room.store');
    Route::patch('/rooms', [RoomController::class, 'update'])->name('room.update');
    Route::delete('/rooms', [RoomController::class, 'destroy'])->name('room.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
