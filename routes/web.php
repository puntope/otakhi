<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomImageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RoomController::class, 'index'])->name('welcome');
Route::get('/room/{room}', [RoomController::class, 'show'])->name('room.show');


Route::middleware('auth')->group(function () {
    Route::get('/rooms/new', [RoomController::class, 'create'])->name('room.create');
    Route::get('/rooms/{room}', [RoomController::class, 'edit'])->name('room.edit');
    Route::post('/rooms', [RoomController::class, 'store'])->name('room.store');
    Route::patch('/rooms', [RoomController::class, 'update'])->name('room.update');
    Route::delete('/rooms', [RoomController::class, 'destroy'])->name('room.destroy');

    Route::post('/conversations', [ConversationController::class, 'store'])->name('conversation.store');
    Route::patch('/conversations', [ConversationController::class, 'update'])->name('conversation.update');
    Route::get('/conversation/{conversation}', [ConversationController::class, 'show'])->name('conversation.show');
    Route::get('/conversations/{room}/new', [ConversationController::class, 'create'])->name('conversation.create');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
