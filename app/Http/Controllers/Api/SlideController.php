<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tampilkan semua data
        $data = Slide::all();
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
        // Validasi file
        $request->validate([
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $path = $request->file('gambar')->store('slide', 'public');
        $slide = new Slide();
        $slide->gambar = basename($path);
        $slide->save();
        return response()->json([
            'status' => true,
            'message' => 'File berhasil diupload!',
        ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // mencari data dengan id
        $data = Slide::find($id);

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
    public function update(Request $request, $id)
    {
        // mencari data dengan id
        $data = Slide::find($id);

        // jika id tidak ada
        if (empty($data)) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak di temukan',
            ], 404);
        }
        // ketentuan value data
        $rules = ['gambar' => 'required|file'];
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
        if ($request->hasFile('gambar')) {
            if ($data->gambar && Storage::disk('public')->exists($data->gambar)) {
                Storage::disk('public')->delete($data->gambar);
            }
            // Simpan gambar baru
            $gambarPath = $request->file('gambar')->store('slide', 'public');
            $data->gambar = $gambarPath;
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
    public function destroy($id)
    {
        // mecari data menggunakan id
        $data = Slide::find($id);

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