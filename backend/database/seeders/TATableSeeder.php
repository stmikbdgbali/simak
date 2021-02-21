<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class TATableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement('DELETE FROM pe3_ta');        
        \DB::table('pe3_ta')->insert([
            'tahun'=>date('Y'),
            'tahun_akademik'=>date('Y').'/'.(date('Y')+1),                       
            'awal_ganjil'=>date('Y').'-09-01',
            'akhir_ganjil'=>(date('Y')+1).'-02-01',
            'awal_genap'=>(date('Y')+1).'-03-01',
            'akhir_genap'=>(date('Y')+1).'-06-31',
            'awal_pendek'=>(date('Y')+1).'-07-01',
            'akhir_pendek'=>(date('Y')+1).'-08-31',
        ]);        
    }
}
