<?php

namespace Database\Seeders;

use App\Models\Berita;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class BeritaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $faker = Faker::create('id_ID');
        for ($i = 0; $i < 2; $i++){
            Berita::create([
                'gambar'     => $faker->imageUrl(1920, 600, 'business', true, "Slide {$i}"),
                'judul'      => $faker->sentence(6),
                'deskripsi'  => $faker->paragraph(5),
            ]);
        }
    }
}
