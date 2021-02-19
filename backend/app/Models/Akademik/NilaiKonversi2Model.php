<?php

namespace App\Models\Akademik;

use Illuminate\Database\Eloquent\Model;

class NilaiKonversi2Model extends Model {    
     /**
     * nama tabel model ini.
     *
     * @var string
     */
    protected $table = 'pe3_nilai_konversi2';
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
        'nilai_konversi_id',
        'matkul_id',
        'kmatkul_asal',
        'matkul_asal', 
        'sks_asal', 
        'n_kual', 
        'keterangan',        
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