<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FasilitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tampilkan semua data
        $data = Fasilitas::orderBy('created_at', 'desc')->get();
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
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:255',
            'gambar' => 'required|image',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'gagal memasukan data',
                'data' => $validator->errors(),
            ], 422);
        }

        $filePath = null;
        if ($request->hasFile('gambar')) {
            // simpan file di storage/app/public/slides
            $filePath = $request->file('gambar')->store('slides', 'public');
        }

        $fasilitas = Fasilitas::create([
            'judul' => $request->judul,
            'gambar' => $filePath,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'sukses memasukan data',
            'data' => $fasilitas,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // mencari data dengan id
        $data = Fasilitas::find($id);

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
    $data = Fasilitas::find($id);
    if (!$data) {
        return response()->json([
            'status'  => false,
            'message' => 'data tidak ditemukan',
        ], 404);
    }

    $rules = [
        'gambar' => 'sometimes|file',
        'judul'  => 'required|string',
    ];
    $validator = Validator::make($request->all(), $rules);

    if ($validator->fails()) {
        return response()->json([
            'status'  => false,
            'message' => 'gagal update data',
            'data'    => $validator->errors(),
        ], 422);
    }

    if ($request->hasFile('gambar')) {
        $file = $request->file('gambar');
        $path = $file->store('fasilitas', 'public');
        $data->gambar = $path;
    }

    $data->judul = $request->judul;
    $data->save();

    return response()->json([
        'status'  => true,
        'message' => 'sukses mengupdate data',
        'data'    => $data,
    ], 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // mecari data menggunakan id
        $data = Fasilitas::find($id);

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
