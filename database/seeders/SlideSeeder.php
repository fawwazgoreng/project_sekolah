<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Slide;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class SlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 0; $i < 2; $i++){
            Slide::create([
                'gambar' => $faker->imageUrl(1920, 600, 'business', true, "Slide {$i}")
            ]);
        }
    }
}
