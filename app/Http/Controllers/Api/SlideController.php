<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\Request;
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
            'file' => 'required|image|max:2048', // max 2MB, image only
        ]);

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('slides', $filename, 'public');

        $slide = new Slide();
        $slide->gambar = '/storage/' . $path; // save path in DB
        $slide->save();

        return response()->json([
            'status' => true,
            'message' => 'File berhasil diupload!',
            'data' => $slide,
        ], 200);
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
        $rules = ['gambar' => 'required|url'];

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
        $data->gambar = $request->gambar;

        //data di save
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
