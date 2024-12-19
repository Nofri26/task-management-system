<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Http\Requests\TaskManagement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiTaskManagementController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = Task::where('user_id', auth()->id())->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Tasks retrieved successfully.',
            'data' => $tasks,
        ], 200);
    }

    public function store(TaskManagement\StoreRequest $request): JsonResponse
    {
        $task = Task::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully.',
            'data' => $task,
        ], 201);
    }

    public function update(TaskManagement\UpdateRequest $request, $id): JsonResponse
    {
        $task = Task::findOrFail($id);

        if ($task->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to this task.',
                'data' => null,
            ], 403);
        }

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully.',
            'data' => $task,
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        $task = Task::findOrFail($id);

        // Periksa kepemilikan task
        if ($task->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to this task.',
                'data' => null,
            ], 403);
        }

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully.',
            'data' => null,
        ], 200);
    }

    public function changeStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validStatuses = ['pending', 'in-progress', 'completed'];
        if (!in_array($request->status, $validStatuses)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid status.',
            ], 400);
        }

        $task->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task status updated successfully.',
            'data' => $task,
        ], 200);
    }


}
