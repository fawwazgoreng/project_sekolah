<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kesiswaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class KesiswaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tampilkan semua data
        $data = Kesiswaan::orderBy('created_at', 'desc')->get();
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
        // membuat variabel dari model
        $data = new Kesiswaan;
        // ketentuan valuenya
        $rules = [
            'judul' => 'required',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
        // validator manual jika gagal tambah
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal memasukan data',
                'data' => $validator->errors(),
            ], 404);
        }

        $data->judul = $request->judul;
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('kesiswaan', 'public');
            $data->gambar = basename($path);
        }
        $post = $data->save();

        // mengvalidasi data sukses
        return response()->json([
            'status' => true,
            'message' => 'sukses memasukan data',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // mencari data dengan id
        $data = Kesiswaan::find($id);

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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // mencari data dengan id
        $data = Kesiswaan::find($id);

        // jika id tidak ada
        if (empty($data)) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak di temukan',
            ], 404);
        }

        // ketentuan value data
        $rules = [
            'judul' => 'required',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];

        // validator jika gagal
        $validator = validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal update data',
                'data' => $validator->errors(),
            ], 404);
        }
        // input data
        $data->judul = $request->judul;
        if ($request->hasFile('gambar')) {
            if ($data->gambar && Storage::disk('public')->exists('kesiswaan/' . $data->gambar)) {
                Storage::disk('public')->delete('kesiswaan/' . $data->gambar);
            }
            $path = $request->file('gambar')->store('kesiswaan', 'public');
            $data->gambar = basename($path);
        }
        $update = $data->save();
        return response()->json([
            'status' => true,
            'message' => 'sukses mengupdate data'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // mecari data menggunakan id
        $data = Kesiswaan::find($id);

        // jika data tidak ditemukan
        if (empty($data)) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak ditemukan',
            ], 404);
        }
        //data di hapus
        $delete = $data->delete();
        // validasi jika data berhasil
        return response()->json([
            'status' => true,
            'message',
            'sukses menghapus data'
        ], 200);
    }
}
