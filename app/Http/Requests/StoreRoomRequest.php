<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'neighbourhood_id' => 'required|exists:neighbourhoods,id',
            'address' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'deposit' => 'required|integer|min:0',
            'size' => 'required|integer|min:0',
            'has_utilities' => 'boolean',
            'is_furnished' => 'boolean',
            'allows_smoking' => 'boolean',
            'allows_pets' => 'boolean',
            'allowed_people' => 'required|integer|min:1',
            'availability_from_date' => 'nullable|date',
            'availability_to_date' => 'nullable|date|after_or_equal:availability_from_date',
            'min_contract_months' => 'required|integer|min:1',
            'required_gender' => 'nullable|in:male,female',
            'roommates_gender' => 'nullable|in:male,female',
            'building_status' => 'required|in:new,old-renovated,old',
            'num_bathrooms' => 'required|integer|min:1',
            'floor' => 'required|integer|min:1',
            'num_roommates' => 'required|integer|min:0',
            'images.*' => 'min:1|image'
        ];
    }
}
