<?php

namespace App\Http\Requests\TaskManagement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'required|date|after:today',
            'status' => 'required|in:pending,completed,in-progress',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Field judul wajib diisi.',
            'title.string' => 'Judul harus berupa string.',
            'title.max' => 'Judul tidak boleh lebih dari 255 karakter.',
            'deadline.required' => 'Field deadline wajib diisi.',
            'deadline.date' => 'Deadline harus berupa tanggal yang valid.',
            'deadline.after' => 'Deadline harus berupa tanggal yang akan datang.'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation errors occurred.',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
