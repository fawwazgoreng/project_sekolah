<?php

namespace Database\Seeders;

use App\Models\VisiMisi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class VisiMisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        for ($i = 0; $i < 2; $i++) {
            VisiMisi::create([
                'visi'      => $faker->sentence(6),
                'misi'  => $faker->paragraph(5),
                'moto'      => $faker->sentence(6),
            ]);
        }
    }
}
