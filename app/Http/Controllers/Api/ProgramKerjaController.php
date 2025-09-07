<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProgramKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProgramKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tampilkan semua data
        $data = ProgramKerja::all();
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
        $data = new ProgramKerja;

        // ketentuan valuenya
        $rules = [
            'judul' => 'required',
            'gambar' => 'nullable|url',
            'deskripsi' => 'nullable'
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

        // validasi tambah data
        $data->judul = $request->judul;
        $data->gambar = $request->hasFile('gambar')
        ? Storage::url($request->file('gambar')->store('ekstrakulikuler', 'public'))
        : "";
        $data->deskripsi = "";
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
        $data = ProgramKerja::find($id);

        // if else jika ada dan tidak ada
        if($data) {
            return response()->json([
                'status' => true,
                'message' => 'data ditemukan',
                'data' => $data,
            ]);
        }else {
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
    $data = ProgramKerja::find($id);
    if(!$data) {
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
    $data->gambar = $request->hasFile('gambar')
        ? Storage::url($request->file('gambar')->store('ekstrakulikuler', 'public'))
        : $data->gambar; // keep old image if not updated
    $data->deskripsi = $request->deskripsi ?? $data->deskripsi;
    $data->save();

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
        $data = ProgramKerja::find($id);

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
            'message', 'sukses menghapus data'        
        ], 200);
    }
}
