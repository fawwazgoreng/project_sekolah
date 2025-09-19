<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PrestasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Prestasi::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => true,
            'message' => 'data ditemukan',
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'required|image|mimes:jpg,jpeg,png,gif',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal memasukan data',
                'data' => $validator->errors(),
            ], 422);
        }

        $path = $request->file('gambar')->store('prestasi', 'public');
        $prestasi = Prestasi::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'gambar' => basename($path),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'sukses memasukan data',
            'data' => $prestasi,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Prestasi::find($id);

        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'data ditemukan',
                'data' => $data,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'data tidak ditemukan',
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = Prestasi::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }
        $rules = [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal update data',
                'data' => $validator->errors(),
            ], 422);
        }
        if ($request->hasFile('gambar')) {
            if ($data->gambar && Storage::disk('public')->exists('prestasi/' . $data->gambar)) {
                Storage::disk('public')->delete('prestasi/' . $data->gambar);
            }
            $path = $request->file('gambar')->store('prestasi', 'public');
            $data->gambar = basename($path);
        }
        $data->judul = $request->judul;
        $data->deskripsi = $request->deskripsi;
        $data->save();
        return response()->json([
            'status' => true,
            'message' => 'sukses mengupdate data',
            'data' => $data,
        ], 200);
    }

    public function destroy(string $id)
    {
        $data = Prestasi::find($id);

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }

        if ($data->gambar && Storage::disk('public')->exists('prestasi/' . $data->gambar)) {
            Storage::disk('public')->delete('prestasi/' . $data->gambar);
        }

        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'sukses menghapus data',
        ], 200);
    }
}
