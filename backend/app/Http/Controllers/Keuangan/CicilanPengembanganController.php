<?php

namespace App\Http\Controllers\Keuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SPMB\FormulirPendaftaranModel;
use App\Models\Keuangan\BiayaKomponenPeriodeModel;
use App\Models\Keuangan\TransaksiModel;
use App\Models\Keuangan\TransaksiDetailModel;
use App\Models\Keuangan\CicilanModel;
use App\Models\Keuangan\CicilanDetailModel;
use App\Models\User;

use Exception;

use Ramsey\Uuid\Uuid;

class CicilanPengembanganController extends Controller {  
	/**
	 * daftar komponen biaya
	 */
	public function index(Request $request)
	{
		$this->hasPermissionTo('KEUANGAN-TRANSAKSI-PENGEMBANGAN_BROWSE');        
			
		$this->validate($request, [           
			'ta'=>'required',        
			'prodi_id'=>'required',
		]);
	
		$ta = $request->input('ta');      
		$prodi_id = $request->input('prodi_id');
					
		$daftar_cicilan = CicilanModel::select(\DB::raw('
																								id,
																								pe3_cicilan.no_formulir,
																								pe3_formulir_pendaftaran.nama_mhs,																								
																								pe3_cicilan.total,
																								pe3_cicilan.promovalue,
																								pe3_cicilan.jumlah_cicilan,
																								pe3_cicilan.sudah_nyicil,
																								pe3_cicilan.sisa_rp_cicilan,
																								pe3_cicilan.status,
																								pe3_cicilan.ta,
																								pe3_cicilan.idsmt,
																								pe3_cicilan.created_at,
																								pe3_cicilan.updated_at

																						'))																						
																						->join('pe3_formulir_pendaftaran','pe3_formulir_pendaftaran.user_id','pe3_cicilan.user_id')																						                                
																						->orderBy('pe3_cicilan.tanggal','DESC');                                                    

		if ($request->has('SEARCH'))
		{
				$daftar_cicilan=$daftar_cicilan->whereRaw('(pe3_cicilan.nim LIKE \''.$request->input('SEARCH').'%\' OR pe3_formulir_pendaftaran.nama_mhs LIKE \'%'.$request->input('SEARCH').'%\')')                                                    
																						->get();
		}            
		else
		{
				$daftar_cicilan=$daftar_cicilan->where('pe3_cicilan.ta', $ta)                                                                                              
																						->where('pe3_cicilan.kjur', $prodi_id)                                               
																						->get();
		} 
		return Response()->json([
																'status'=>1,
																'pid'=>'fetchdata',  
																'cicilan'=>$daftar_cicilan,
																'message'=>'Fetch data daftar transaksi berhasil.'
														],200)->setEncodingOptions(JSON_NUMERIC_CHECK);
	}
	public function search(Request $request)
    {
        $this->hasPermissionTo('SPMB-PMB_BROWSE');

        $this->validate($request,[
            'search'=>'required',
            'prodi_id'=>'required',
            'ta'=>'required',
        ]);

        $data = User::where('default_role','mahasiswabaru')
                    ->select(\DB::raw('
                                    users.id,
                                    users.username,
                                    users.name,
                                    users.email,
                                    users.nomor_hp                                  
                                '))
                    ->join('pe3_formulir_pendaftaran','pe3_formulir_pendaftaran.user_id','users.id')
                    ->where('pe3_formulir_pendaftaran.nama_mhs', 'LIKE', '%'.$request->input('search').'%')
                    ->where('pe3_formulir_pendaftaran.ta',$request->input('ta'))
                    ->where('pe3_formulir_pendaftaran.kjur1',$request->input('prodi_id'))
                    ->where('users.active', 1)
                    ->get();

        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',
                                'daftar_mhs'=>$data,  
                                'jumlah'=>$data->count(),
                                'message'=>'Daftar Calon Mahasiswa baru berhasil diperoleh.'
                            ], 200); 
    }
	/**
	 * buat transaksi baru
	 */
	public function show (Request $request, $id)
	{
		$this->hasPermissionTo('KEUANGAN-TRANSAKSI-PENGEMBANGAN_SHOW');

		$cicilan = CicilanModel::find($id);
		if (is_null($cicilan))
		{			
			return Response()->json([
														'status'=>0,
														'pid'=>'show',														
														'message'=>["Detail cicilan dengan ($id) gagal diperoleh"]
												], 422); 
		}
		else
		{
			$cicilan_detail = CicilanDetailModel::where('cicilan_id', $cicilan->id)
																								->get();
													
			return Response()->json([
														'status'=>1,
														'pid'=>'show',
														'cicilan'=>$cicilan,
														'daftar_cicilan'=>$cicilan_detail,
														'message'=>["Detail cicilan dengan ($id) berhasil diperoleh"]
												], 200); 
		}
	}
	/**
	 * buat transaksi baru
	 */
	public function store (Request $request)
	{
			$this->hasPermissionTo('KEUANGAN-TRANSAKSI-PENGEMBANGAN_STORE');

			$this->validate($request, [           
					'user_id'=>'required|exists:pe3_formulir_pendaftaran,user_id', 
					'installment'=>'required|in:0,1'                       
			]);
			
			try 
			{
					$user_id=$request->input('user_id');           
					$formulir = FormulirPendaftaranModel::find($user_id);
					$ta = $formulir->ta;
					$transaksi=TransaksiDetailModel::select(\DB::raw('
																							1
																					'))
																					->join('pe3_transaksi','pe3_transaksi_detail.transaksi_id','pe3_transaksi.id')
																					->where('pe3_transaksi.ta',$formulir->ta)
																					->where('pe3_transaksi.idsmt',$formulir->idsmt)
																					->where('pe3_transaksi.user_id',$user_id)
																					->where('pe3_transaksi_detail.kombi_id', 102)                                                                                      
																					->where(function($query) {
																							$query->where('pe3_transaksi.status',0)
																									->orWhere('pe3_transaksi.status', 1);
																					})                                        
																					->first();

					if (!is_null($transaksi))
					{
							$nama_mhs = $formulir->nama_mhs;
							throw new Exception ("Transaksi tidak bisa dibuat karena ($nama_mhs) sudah melakukan transaksi pada $ta.");  
					}

					$biaya_kombi=BiayaKomponenPeriodeModel::where('tahun',$formulir->ta)
																									->where('idkelas',$formulir->idkelas)
																									->where('kjur',$formulir->kjur1)
																									->where('kombi_id', 102)
																									->value('biaya');
					
					if (!($biaya_kombi > 0))
					{
							throw new Exception ("Komponen BIAYA PENGEMBANGAN (102) belum disetting pada TA $ta");  
					}

					$transaksi = \DB::transaction(function () use ($request,$formulir,$biaya_kombi){
							$no_transaksi='102'.date('YmdHms');
							$transaksi=TransaksiModel::create([
									'id'=>Uuid::uuid4()->toString(),
									'user_id'=>$formulir->user_id,
									'no_transaksi'=>$no_transaksi,
									'no_faktur'=>'',
									'kjur'=>$formulir->kjur1,
									'ta'=>$formulir->ta,
									'idsmt'=>$formulir->idsmt,
									'idkelas'=>$formulir->idkelas,                                        
									'commited'=>0,
									'total'=>0,
									'tanggal'=>date('Y-m-d'),
									'desc'=>null
							]); 
							
							$transaksi_detail=TransaksiDetailModel::create([
									'id'=>Uuid::uuid4()->toString(),
									'user_id'=>$formulir->user_id,
									'transaksi_id'=>$transaksi->id,
									'no_transaksi'=>$transaksi->no_transaksi,
									'kombi_id'=>102,
									'nama_kombi'=>'BIAYA PENGEMBANGAN',
									'biaya'=>$biaya_kombi,
									'jumlah'=>1,
									'installment'=>$request->input('installment'),
									'sub_total'=>$biaya_kombi    
							]);

							$transaksi->total=$biaya_kombi;
							$transaksi->desc='BIAYA PENGEMBANGAN '.$formulir->ta.$formulir->idsmst;
							$transaksi->save();

							return $transaksi;

					});

					return Response()->json([
																			'status'=>1,
																			'pid'=>'store',   
																			'cicilan'=>$transaksi,
																			'message'=>'Transaksi BIAYA PENGEMBANGAN berhasil di input.'
																	],200); 
			}
			catch (Exception $e)
			{
					return Response()->json([
							'status'=>0,
							'pid'=>'store',              
							'message'=>[$e->getMessage()]
					], 422); 
			}        
	}
	public function update(Request $request,$id)
	{
			$this->hasPermissionTo('KEUANGAN-TRANSAKSI-PENGEMBANGAN_UPDATE');

			$transaksi_detail = TransaksiDetailModel::find($id);
			if (is_null($transaksi_detail))
			{
					return Response()->json([
																	'status'=>0,
																	'pid'=>'update',
																	'message'=>["Detail Transaksi dengan ($id) gagal diupdate"]
															], 422); 
			}
			else if ($transaksi_detail->transaksi->status == 1)
			{
				return Response()->json([
					'status'=>0,
					'pid'=>'update',
					'message'=>["Detail Transaksi dengan ($id) gagal diupdate karena status paid"]
				], 422);
			}
			else if ($transaksi_detail->transaksi->status == 2)
			{
				return Response()->json([
					'status'=>0,
					'pid'=>'update',
					'message'=>["Detail Transaksi dengan ($id) gagal diupdate karena status batal"]
				], 422);
			}
			else if ($transaksi_detail->installment > 0)
			{
				return Response()->json([
					'status'=>0,
					'pid'=>'update',
					'message'=>["Detail Transaksi dengan ($id) gagal diupdate karena transaksi ini cicilan. Silahkan ubah di menu cicilan biaya pengembangan"]
				], 422);
			}
			else
			{
				$this->validate($request, [
					'promovalue'=>'required',
					'installment'=>'required|in:0,1',
				]);
				
				$transaksi_detail = \DB::transaction(function () use ($request, $transaksi_detail) {
					$promovalue = $request->input('promovalue');
					$transaksi_detail->promovalue = $promovalue;
					$transaksi_detail->sub_total = $transaksi_detail->biaya - $promovalue;
					$transaksi_detail->installment = (int)$request->input('installment');
					$transaksi_detail->save();

					$total = \DB::table('pe3_transaksi_detail')
									->where('transaksi_id', $transaksi_detail->transaksi_id)
									->sum('sub_total');

					\DB::table('pe3_transaksi')
							->where('id', $transaksi_detail->transaksi_id)
							->update([
								'total'=>$total
							]);
					
					$transaksi = $transaksi_detail->transaksi;
					$transaksi->desc = $request->input('desc');
					$transaksi->save();
					
					if ($transaksi_detail->installment > 0)
					{
						$cicilan = CicilanModel::create([
							'id'=>Uuid::uuid4()->toString(),
							'user_id'=>$transaksi->user_id,
							'no_formulir'=>$transaksi->no_formulir,
							'nim'=>null,
							'kombi_id'=>$transaksi_detail->kombi_id,
							'nama_kombi'=>$transaksi_detail->nama_kombi,
							'biaya'=>$transaksi_detail->biaya,
							'promocode'=>$transaksi_detail->promocode,
							'promotype'=>$transaksi_detail->promotype,
							'promovalue'=>$transaksi_detail->promovalue,
							'promovalue'=>$transaksi_detail->promovalue,
							'jumlah'=>$transaksi_detail->jumlah,
							'bulan'=>$transaksi_detail->bulan,
							'tahun'=>$transaksi->tahun,
							'total'=>$total,
							'jumlah_cicilan'=>0,
							'sudah_nyicil'=>0,
							'sisa_rp_cicilan'=>0,

							'kjur'=>$transaksi->kjur,
							'ta'=>$transaksi->ta,
							'idsmt'=>$transaksi->idsmt,
							'idkelas'=>$transaksi->idkelas,
							'desc'=>$transaksi->desc,
							'status'=>0,
						]);

						CicilanDetailModel::create([
							'id'=>Uuid::uuid4()->toString(),
							'user_id'=>$transaksi->user_id,
							'cicilan_id'=>$cicilan->id,
							'transaksi_id'=>$transaksi->id,
							'cicilan'=>$total,
						]);

					}

					return $transaksi_detail;
				});

				return Response()->json([
																'status'=>1,
																'pid'=>'store',   
																'transaksi_detail'=>$transaksi_detail,
																'message'=>'Transaksi BIAYA PENGEMBANGAN berhasil diubah.'
														], 200); 
			}
	}
	public function destroy(Request $request,$id)
	{
			$this->hasPermissionTo('KEUANGAN-TRANSAKSI-PENGEMBANGAN_DESTROY');

			if ($this->hasRole('mahasiswa'))
			{
					$transaksi = TransaksiModel::where('user_id',$this->getUserid())
																			->find($id); 
			}
			else
			{
					$transaksi = TransaksiModel::find($id); 
			}        

			if (is_null($transaksi))
			{
					return Response()->json([
																	'status'=>0,
																	'pid'=>'destroy',           
																	'cicilan'=>$transaksi,     
																	'message'=>["Transaksi registrasi krs dengan ($id) gagal dihapus"]
															], 422); 
			}
			else if ($transaksi->status==0)
			{
					\App\Models\System\ActivityLog::log($request,[
																													'object' => $transaksi, 
																													'object_id' => $transaksi->id, 
																													'user_id' => $this->getUserid(), 
																													'message' => 'Menghapus transaksi registrasi krs dengan id ('.$id.') berhasil'
																											]);
					$transaksi->delete();
					return Response()->json([
																			'status'=>1,
																			'pid'=>'destroy',
																			'message'=>"transaksi registrasi dengan id ($id) berhasil dihapus"
																	],200);         
			}
			else
			{
					return Response()->json([
																	'status'=>1,
																	'pid'=>'destroy',           
																	'cicilan'=>$transaksi,     
																	'message'=>["Transaksi registrasi krs dengan ($id) gagal dihapus"]
															], 422); 
			}
	}
}