<?php

namespace App\Http\Controllers\SPMB;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Models\SPMB\FormulirPendaftaranModel;
use App\Models\SPMB\NilaiUjianPMBModel;

use Ramsey\Uuid\Uuid;

class PesertaTidakLulusController extends Controller {             
    /**
     * digunakan untuk mendapatkan calon mahasiswa baru yang telah mengisi formulir pendaftaran
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $this->hasAnyPermission(['SPMB-PMB-NILAI-UJIAN_BROWSE']);

        $this->validate($request, [           
            'ta'=>'required',
            'prodi_id'=>'required'
        ]);
        
        $ta = $request->input('ta');
        $prodi_id = $request->input('prodi_id');

        $data = FormulirPendaftaranModel::select(\DB::raw('
                        users.id,
                        pe3_formulir_pendaftaran.no_formulir,
                        users.username,
                        users.name,
                        users.nomor_hp,
                        COALESCE(pe3_nilai_ujian_pmb.nilai,\'N.A\') AS nilai,
                        pe3_nilai_ujian_pmb.ket_lulus,
                        CASE
                            WHEN pe3_nilai_ujian_pmb.ket_lulus IS NULL THEN \'N.A\'
                            WHEN pe3_nilai_ujian_pmb.ket_lulus=0 THEN \'TIDAK LULUS\'
                            WHEN pe3_nilai_ujian_pmb.ket_lulus=1 THEN \'LULUS\'
                        END AS status,
                        pe3_kelas.nkelas,
                        users.active,
                        users.foto,
                        users.created_at,
                        users.updated_at
                    '))
                    ->join('users','pe3_formulir_pendaftaran.user_id','users.id')                    
                    ->join('pe3_kelas','pe3_formulir_pendaftaran.idkelas','pe3_kelas.idkelas')                    
                    ->leftJoin('pe3_nilai_ujian_pmb','pe3_formulir_pendaftaran.user_id','pe3_nilai_ujian_pmb.user_id')                    
                    ->where('users.ta', $ta)
                    ->where('kjur1', $prodi_id)            
                    ->where('pe3_nilai_ujian_pmb.ket_lulus', 0)            
                    ->whereNotNull('pe3_formulir_pendaftaran.idkelas')   
                    ->where('users.active', 1)    
                    ->orderBy('users.name','ASC') 
                    ->get();
        
        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',
                                'pmb'=>$data,
                                'message'=>'Fetch data calon mahasiswa baru berhasil diperoleh'
                            ],200);  
    }
    /**
		 * Menghapus data nilai ujian sekaligus pendaftaran
		 *
		 * @param  int  $id
		 * @return \Illuminate\Http\Response
		 */
		public function destroy(Request $request,$id)
		{ 
				$this->hasAnyPermission(['SPMB-PMB-NILAI-UJIAN_DESTROY']);

				$data_nilai = NilaiUjianPMBModel::find($id); 
				
				if (is_null($data_nilai))
				{
						return Response()->json([
																		'status'=>0,
																		'pid'=>'destroy',
																		'message'=>["Nilai Ujian dengan ID ($id) gagal dihapus"]
																], 422); 
				}
				else
				{
          $data_nilai = \DB::transaction(function () use ($request, $data_nilai) {
            $user_id = $data_nilai->user_id;
            \DB::table('pe3_jawaban_ujian')
              ->where('user_id', $user_id)
              ->delete();

            \DB::table('pe3_nilai_ujian_pmb')
              ->where('user_id', $user_id)
              ->delete();

            \DB::table('pe3_peserta_ujian_pmb')
              ->where('user_id', $user_id)
              ->delete();
          
            \App\Models\System\ActivityLog::log($request,[
                                                        'object' => $data_nilai, 
                                                        'object_id' => $data_nilai->user_id, 
                                                        'user_id' => $this->getUserid(), 
                                                        'message' => 'Menghapus Data nilai ujian pmb dengan user id ('.$data_nilai->user_id.') berhasil'
                                                      ]);
            return $data_nilai;
          });
          return Response()->json([
                                      'status'=>1,
                                      'pid'=>'destroy',
                                      'message' => 'Menghapus Data nilai ujian pmb dengan user id ('.$data_nilai->user_id.') berhasil'
                                  ],200);         
				}
									
		} 
}