<?php

namespace Database\Seeders;

use App\Models\Kesiswaan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class KesiswaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        for ($i = 0; $i < 2; $i++){
            Kesiswaan::create([
                'gambar' => $faker->imageUrl(1920, 600, 'business', true, "Slide {$i}"),
                'judul' => $faker->sentence(6),
            ]);
        }
    }
}
