<?php

namespace App\Models\Akademik;

use Illuminate\Database\Eloquent\Model;

class NilaiKonversi1Model extends Model {    
     /**
     * nama tabel model ini.
     *
     * @var string
     */
    protected $table = 'pe3_nilai_konversi1';
    /**
     * primary key tabel ini.
     *
     * @var string
     */
    protected $primaryKey = 'id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'user_id',
        'nim',
        'nama_mhs',
        'alamat', 
        'no_telp',         
        'email',         
        'nim_asal', 
        'kode_jenjang', 
        'kode_pt_asal',
        'nama_pt_asal',
        'kode_ps_asal',
        'nama_ps_asal',
        'tahun',
        
        'kjur',
        'perpanjangan',        
    ];
    /**
     * enable auto_increment.
     *
     * @var string
     */
    public $incrementing = false;
    /**
     * activated timestamps.
     *
     * @var string
     */
    public $timestamps = true;
}