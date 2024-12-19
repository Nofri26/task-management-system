<?php

use App\Http\Controllers\Api\ApiTaskManagementController;
use App\Http\Controllers\Auth\ApiAuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [ApiAuthController::class, 'register']);
Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('/logout', [ApiAuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [ApiAuthController::class, 'user']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/tasks', ApiTaskManagementController::class);
    Route::patch('/tasks/{task}/change-status', [ApiTaskManagementController::class, 'changeStatus']);
});
