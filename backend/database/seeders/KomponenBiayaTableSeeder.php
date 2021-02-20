<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class KomponenBiayaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        \DB::statement('DELETE FROM pe3_kombi'); 
        
        \DB::table('pe3_kombi')->insert([
            'id'=>"101",
            'nama'=>'BIAYA PENDAFTARAN',
            'periode'=>'sekali',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);          

        \DB::table('pe3_kombi')->insert([
            'id'=>"102",
            'nama'=>'PENGEMBANGAN',
            'periode'=>'sekali',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);          
        
        \DB::table('pe3_kombi')->insert([
            'id'=>"201",
            'nama'=>'SPP + KEMAHASISWAAN',
            'periode'=>'perbulan',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);       

        \DB::table('pe3_kombi')->insert([
            'id'=>"401",
            'nama'=>'KERJA PRAKTEK',
            'periode'=>'insidental',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);

        \DB::table('pe3_kombi')->insert([
            'id'=>"402",
            'nama'=>'SKRIPSI',
            'periode'=>'insidental',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);                   
        
        \DB::table('pe3_kombi')->insert([
            'id'=>"701",
            'nama'=>'WISUDA',
            'periode'=>'sekali',
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);          
    }
}
