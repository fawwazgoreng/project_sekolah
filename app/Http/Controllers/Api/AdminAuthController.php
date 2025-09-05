<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminAuthController extends Controller
{
    public function register(Request $request){

    $rules = [
        'username' => 'required|unique:admin,username',
        'password' => 'required|min:6'
    ];

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'gagal register',
            'data' => $validator->errors()
        ], 422);
    }

    $admin = Admin::create([
        'username' => $request->username,
        'password' => Hash::make($request->password),
    ]);

    return response()->json([
        'status' => true,
        'message' => 'berhasil register',
        'data'   => $admin
    ], 201);
    }

    public function login(Request $request){
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (! $admin || ! Hash::check($request->password, $admin->password)) {
            return response()->json([
                'status' => false,
                'message' => 'username atau password salah'
            ],401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;
        return response()->json([
            'status' => true,
            'message' => 'login berhasil dan dapat token',
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logged out'
        ]);
    }
}
