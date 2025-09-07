<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sejarah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SejarahController extends Controller
{
    // Tampilkan semua data
    public function index()
    {
        $data = Sejarah::all();
        return response()->json([
            'status' => true,
            'message' => 'Data ditemukan',
            'data' => $data,
        ]);
    }

    // Simpan data baru
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memasukkan data',
                'data' => $validator->errors(),
            ], 422);
        }

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('sejarah', 'public');
        }

        $data = Sejarah::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'gambar' => $gambarPath,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Sukses memasukkan data',
            'data' => $data,
        ], 201);
    }

    // Tampilkan data per ID
    public function show($id)
    {
        $data = Sejarah::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Data ditemukan',
            'data' => $data,
        ]);
    }

    // Update data
    public function update(Request $request, $id)
    {
        $data = Sejarah::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'judul' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal update data',
                'data' => $validator->errors(),
            ], 422);
        }

        // Update data teks
        $data->judul = $request->judul ?? $data->judul;
        $data->deskripsi = $request->deskripsi ?? $data->deskripsi;

        // Update gambar jika ada
        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($data->gambar && Storage::disk('public')->exists($data->gambar)) {
                Storage::disk('public')->delete($data->gambar);
            }

            // Simpan gambar baru
            $gambarPath = $request->file('gambar')->store('sejarah', 'public');
            $data->gambar = $gambarPath;
        }

        $data->save();

        return response()->json([
            'status' => true,
            'message' => 'Sukses mengupdate data',
            'data' => $data,
        ]);
    }

    // Hapus data
    public function destroy($id)
    {
        $data = Sejarah::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        }

        // Hapus gambar lama jika ada
        if ($data->gambar && Storage::disk('public')->exists($data->gambar)) {
            Storage::disk('public')->delete($data->gambar);
        }

        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'Data berhasil dihapus',
        ]);
    }
}
