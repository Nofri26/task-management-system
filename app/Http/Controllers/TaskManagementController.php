<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskManagementController extends Controller
{
    public function index()
    {
        $token = session('token');
        return Inertia::render('TaskManagement/Index', [
            'token' => $token,
        ]);
    }
}
