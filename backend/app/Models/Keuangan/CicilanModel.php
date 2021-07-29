<?php

namespace App\Models\Keuangan;

use Illuminate\Database\Eloquent\Model;

class CicilanModel extends Model {    
	 /**
	 * nama tabel model ini.
	 *
	 * @var string
	 */
	protected $table = 'pe3_cicilan';
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
    'no_formulir',
    'nim',

		'kombi_id',
		'nama_kombi',
		'biaya',
		'promocode',
		'promotype',
		'promovalue',
		
		'jumlah',
		'bulan',
		'tahun',		
		'total',
		'jumlah_cicilan',
		'sudah_nyicil',
		'sisa_rp_cicilan',
		
    'kjur',
    'ta',
    'idsmt',
    'idkelas',    

		'desc',
		'status',
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

	public function detail ()
	{
		return $this->hasMany('\App\Models\Keuangan\CicilanDetailModel','transaksi_id','id');
	}
}