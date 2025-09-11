<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\programsekolah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProgramSekolahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tampilkan semua data
        $data = programsekolah::all();
        return response()->json([
            'status' => true,
            'message' => 'data ditemukan',
            'data' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $data = new programsekolah();

        // ketentuan valuenya
        $rules = [
            'judul' => 'required',
            'gambar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'deskripsi' => 'nullable'
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal memasukan data',
                'data' => $validator->errors(),
            ], 422);
        }

        $path = $request->file('gambar')->store('programsekolah', 'public');
        $prestasi = programsekolah::create([
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

    public function show(string $id)
    {
        // mencari data dengan id
        $data = programsekolah::find($id);
        // if else jika ada dan tidak ada
        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'data ditemukan',
                'data' => $data,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'data tidak di temukan',
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        $data = programsekolah::find($id);
        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }

        $rules = [
            'judul' => 'required',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'deskripsi' => 'nullable'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal update data',
                'data' => $validator->errors(),
            ], 404);
        }

        $data->judul = $request->judul;
        if ($request->hasFile('gambar')) {
            if ($data->gambar && Storage::disk('public')->exists('programsekolah/' . $data->gambar)) {
                Storage::disk('public')->delete('programsekolah/' . $data->gambar);
            }
            $path = $request->file('gambar')->store('programsekolah', 'public');
            $data->gambar = basename($path);
        }
        $data->deskripsi = $request->deskripsi ?? $data->deskripsi;
        $data->save();

        return response()->json([
            'status' => true,
            'message' => 'sukses mengupdate data'
        ], 200);
    }

    public function destroy(string $id)
    {
        // mecari data menggunakan id
        $data = programsekolah::find($id);
        // jika data tidak ditemukan
        if (empty($data)) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }

        $delete = $data->delete();
        return response()->json([
            'status' => true,
            'message',
            'sukses menghapus data'
        ], 200);
    }
}
