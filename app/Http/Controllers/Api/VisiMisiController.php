<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VisiMisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VisiMisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // tampilkan semua data
        $data = VisiMisi::all();
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
        $data = new VisiMisi;

        // ketentuan valuenya
        $rules = [
            'visi' => 'required',
            'misi' => 'Required',
            'moto' => 'required'
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

        // validasi tambah datas
        $data->visi = $request->visi;
        $data->misi = $request->misi;
        $data->moto = $request->moto;
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
        $data = VisiMisi::find($id);

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
        // mencari data dengan id
        $data = VisiMisi::find($id);

        // jika id tidak ada
        if(empty($data)) {
            return response()->json([
                'status' => false,
                'message' => 'data tidak di temukan',
            ], 404);
        }

        // ketentuan value data
        $rules = [
            'visi' => 'required',
            'misi' => 'required',
            'moto' => 'required',
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
        $data->visi = $request->visi;
        $data->misi = $request->misi;
        $data->moto = $request->moto;
        
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
    public function destroy(string $id)
    {
        // mecari data menggunakan id
        $data = VisiMisi::find($id);

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
