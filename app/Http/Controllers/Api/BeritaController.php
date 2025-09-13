<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    public function index()
    {
        $data = Berita::orderBy('created_at', 'desc')->get()->map(function ($item) {
            $item->gambar = $item->gambar ? asset("storage/".$item->gambar) : null;
            return $item;
        });
        return response()->json([
            'status' => true,
            'message' => 'data ditemukan',
            'data' => $data,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'required|file|image|max:2048',
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memasukkan data',
                'errors' => $validator->errors(),
            ], 422);
        }
        $berita = new Berita();
        $berita->judul = $request->judul;
        $berita->deskripsi = $request->deskripsi;
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('berita', 'public');
            $berita->gambar = $path;
        }
        $berita->save();
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menambahkan berita',
            'data' => $berita
        ], 200);
    }

    public function show($id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $berita->gambar = $berita->gambar ? asset("storage/".$berita->gambar) : null;

        return response()->json([
            'status' => true,
            'data' => $berita
        ]);
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        $rules = [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|file|image|max:2048',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal update data',
                'errors' => $validator->errors(),
            ], 422);
        }
        $berita->judul = $request->judul;
        $berita->deskripsi = $request->deskripsi;
        if ($request->hasFile('gambar')) {
            if ($berita->gambar) {
                $filePath = str_replace(asset('storage/berita/'), '', $berita->gambar);
                Storage::disk('public')->delete($filePath);
            }
            $path = $request->file('gambar')->store('berita', 'public');
            $berita->gambar = basename($path);
        }

        $berita->save();

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mengupdate berita',
            'data' => $berita
        ]);
    }

    public function destroy($id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }
        if ($berita->gambar) {
            $filePath = str_replace(asset('storage/'), '', $berita->gambar);
            Storage::disk('public')->delete($filePath);
        }
        $berita->delete();
        return response()->json([
            'status' => true,
            'message' => 'Berhasil menghapus berita'
        ], 200);
    }
}
