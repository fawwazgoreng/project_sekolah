<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ekstrakulikuler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class EkstrakulikulerController extends Controller
{
    /**
     * Display all resources
     */
    public function index()
    {
        $data = Ekstrakulikuler::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => 'data ditemukan',
            'data' => $data,
        ], 200);
    }

    /**
     * Store a newly created resource
     */
    public function store(Request $request)
    {
        $rules = [
            'judul' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validasi file image
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal memasukkan data',
                'data' => $validator->errors(),
            ], 422);
        }
        $data = new Ekstrakulikuler();
        $data->judul = $request->judul;
        $data->gambar = $request->hasFile('gambar')
            ? Storage::url($request->file('gambar')->store('ekstrakulikuler', 'public'))
            : ""; // <--- penting
        $data->save();
        return response()->json([
            'status' => true,
            'message' => 'sukses memasukkan data',
            'data' => $data,
        ], 201);
    }

    /**
     * Display a specific resource
     */
    public function show(string $id)
    {
        $data = Ekstrakulikuler::find($id);

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'data ditemukan',
            'data' => $data,
        ], 200);
    }

    /**
     * Update a resource
     */
    public function update(Request $request, string $id)
    {
        $data = Ekstrakulikuler::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }
        $rules = [
            'judul' => 'required|string|max:255',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal mengupdate data',
                'data' => $validator->errors(),
            ], 422);
        }
        $data->judul = $request->judul;
        if ($request->hasFile('gambar')) {
            // hapus gambar lama jika ada
            if ($data->gambar) {
                $oldPath = str_replace('/storage/', '', $data->gambar);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('gambar')->store('ekstrakulikuler', 'public');
            $data->gambar = Storage::url($path);
        }
        $data->save();
        return response()->json([
            'status' => true,
            'message' => 'sukses mengupdate data',
            'data' => $data,
        ], 200);
    }

    /**
     * Delete a resource
     */
    public function destroy(string $id)
    {
        $data = Ekstrakulikuler::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }
        // hapus gambar dari storage jika ada
        if ($data->gambar) {
            $oldPath = str_replace('/storage/', '', $data->gambar);
            Storage::disk('public')->delete($oldPath);
        }
        $data->delete();
        return response()->json([
            'status' => true,
            'message' => 'sukses menghapus data',
        ], 200);
    }
}
