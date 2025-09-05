<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Admin::all();
        return response()->json([
            'status' => true,
            'message' => 'data di temukan',
            'data' => $data
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
        'username' => 'required|unique:admin,username',
        'password' => 'required|min:6'
    ];

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'gagal tambah data',
            'data' => $validator->errors()
        ], 422);
    }

    $admin = Admin::create([
        'username' => $request->username,
        'password' => Hash::make($request->password),
    ]);

    return response()->json([
        'status' => true,
        'message' => 'berhasil tambah data',
        'data'   => $admin
    ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = Admin::find($id);

    if (!$admin) {
        return response()->json([
            'status'  => false,
            'message' => 'Data admin tidak ditemukan'
        ], 404);
    }

    return response()->json([
        'status' => true,
        'message' => 'data ditemukan',
        'data'   => $admin
    ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $admin = Admin::find($id);

    if (!$admin) {
        return response()->json([
            'status'  => false,
            'message' => 'Data admin tidak ditemukan'
        ], 404);
    }

    $rules = [
        'username' => 'required|unique:admin,username,' . $admin->id,
        'password' => 'nullable|min:6',
    ];

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'errors' => $validator->errors()
        ], 422);
    }

    $data = $request->only('username', 'password');
    if (!empty($data['password'])) {
        $data['password'] = Hash::make($data['password']);
    } else {
        unset($data['password']);
    }

    $admin->update($data);

    return response()->json([
        'status' => true,
        'message' => 'data berhasil di edit',
        'data'   => $admin
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
