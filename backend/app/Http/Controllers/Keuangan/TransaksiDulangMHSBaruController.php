<?php

namespace App\Http\Controllers\Keuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SPMB\FormulirPendaftaranModel;
use App\Models\Keuangan\BiayaKomponenPeriodeModel;
use App\Models\Keuangan\TransaksiModel;
use App\Models\Keuangan\TransaksiDetailModel;

use Exception;

use Ramsey\Uuid\Uuid;

class TransaksiDulangMHSBaruController extends Controller {  
    /**
     * daftar komponen biaya
     */
    public function index(Request $request)
    {
        $this->hasPermissionTo('KEUANGAN-TRANSAKSI-DULANG-MHS-BARU_BROWSE');
        
        $this->validate($request, [           
            'TA'=>'required',            
            'PRODI_ID'=>'required',            
        ]);

        $ta=$request->input('TA');
        $prodi_id=$request->input('PRODI_ID');

        if ($this->hasRole(['mahasiswa','mahasiswabaru']))
        {
            $daftar_transaksi = TransaksiDetailModel::select(\DB::raw('
                                                        pe3_transaksi_detail.id,
                                                        pe3_transaksi_detail.user_id,
                                                        pe3_transaksi_detail.transaksi_id,
                                                        CONCAT(pe3_transaksi.no_transaksi,\' \') AS no_transaksi,
                                                        pe3_transaksi_detail.biaya,
                                                        pe3_transaksi_detail.jumlah,
                                                        pe3_transaksi_detail.bulan,
                                                        pe3_transaksi_detail.sub_total,

                                                        COALESCE(pe3_formulir_pendaftaran.no_formulir,\'N.A\') AS no_formulir,
                                                        pe3_formulir_pendaftaran.nama_mhs,

                                                        pe3_transaksi.no_faktur,
                                                        pe3_transaksi.kjur,
                                                        pe3_transaksi.ta,
                                                        pe3_transaksi.idsmt,
                                                        pe3_transaksi.idkelas,                                                        
                                                        pe3_transaksi.status,
                                                        pe3_status_transaksi.nama_status,
                                                        pe3_status_transaksi.style,
                                                        pe3_transaksi.total,
                                                        pe3_transaksi.tanggal,     
                                                        pe3_transaksi_detail.created_at,
                                                        pe3_transaksi_detail.updated_at
                                                    '))
                                                    ->join('pe3_transaksi','pe3_transaksi_detail.transaksi_id','pe3_transaksi.id')
                                                    ->join('pe3_formulir_pendaftaran','pe3_formulir_pendaftaran.user_id','pe3_transaksi_detail.user_id')
                                                    ->join('pe3_status_transaksi','pe3_transaksi.status','pe3_status_transaksi.id_status')
                                                    ->where('pe3_transaksi.ta',$ta)                                                    
                                                    ->where('pe3_transaksi_detail.user_id',$this->getUserid())
                                                    ->where('pe3_transaksi_detail.kombi_id',102)                                                    
                                                    ->orderBy('pe3_transaksi.tanggal','DESC')
                                                    ->get();
        }
        else
        {
            $daftar_transaksi = TransaksiDetailModel::select(\DB::raw('
                                                        pe3_transaksi_detail.id,
                                                        pe3_transaksi_detail.user_id,
                                                        pe3_transaksi_detail.transaksi_id,
                                                        CONCAT(pe3_transaksi.no_transaksi,\' \') AS no_transaksi,
                                                        pe3_transaksi_detail.biaya,
                                                        pe3_transaksi_detail.jumlah,
                                                        pe3_transaksi_detail.bulan,
                                                        pe3_transaksi_detail.sub_total,

                                                        COALESCE(pe3_formulir_pendaftaran.no_formulir,\'N.A\') AS no_formulir,
                                                        pe3_formulir_pendaftaran.nama_mhs,

                                                        pe3_transaksi.no_faktur,
                                                        pe3_transaksi.kjur,
                                                        pe3_transaksi.ta,
                                                        pe3_transaksi.idsmt,
                                                        pe3_transaksi.idkelas,                                                                                                          
                                                        pe3_transaksi.status,
                                                        pe3_status_transaksi.nama_status,
                                                        pe3_status_transaksi.style,
                                                        pe3_transaksi.total,
                                                        pe3_transaksi.tanggal,     
                                                        pe3_transaksi_detail.created_at,
                                                        pe3_transaksi_detail.updated_at
                                                    '))
                                                    ->join('pe3_transaksi','pe3_transaksi_detail.transaksi_id','pe3_transaksi.id')
                                                    ->join('pe3_formulir_pendaftaran','pe3_formulir_pendaftaran.user_id','pe3_transaksi_detail.user_id')
                                                    ->join('pe3_status_transaksi','pe3_transaksi.status','pe3_status_transaksi.id_status')                                                    
                                                    ->where('pe3_transaksi_detail.kombi_id',102)                                                    
                                                    ->orderBy('pe3_transaksi.tanggal','DESC');                                                    

            if ($request->has('search'))
            {
                $daftar_transaksi=$daftar_transaksi->whereRaw('(pe3_transaksi.no_formulir LIKE \''.$request->input('search').'%\' OR pe3_formulir_pendaftaran.nama_mhs LIKE \'%'.$request->input('search').'%\')')                                                    
                                                    ->get();
            }            
            else
            {
                $daftar_transaksi=$daftar_transaksi->where('pe3_transaksi.ta',$ta)                                                    
                                                    ->where('pe3_transaksi.kjur',$prodi_id)                                                    
                                                    ->get();
            }
        }        
        
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'transaksi'=>$daftar_transaksi,                                                                                                                                   
                                    'message'=>'Fetch data daftar transaksi berhasil.'
                                ],200)->setEncodingOptions(JSON_NUMERIC_CHECK);
    }
    /**
     * buat transaksi baru
     */
    public function store (Request $request)
    {
        $this->hasPermissionTo('KEUANGAN-TRANSAKSI-DULANG-MHS-BARU_STORE');

        $this->validate($request, [           
            'no_formulir'=>'required|exists:pe3_formulir_pendaftaran,no_formulir',                             
            'TA'=>'required'
        ]);
        
        try 
        {
            $no_formulir=$request->input('no_formulir');            
            $ta=$request->input('TA');
            
            $transaksi=TransaksiDetailModel::select(\DB::raw('
                                                1
                                            '))
                                            ->join('pe3_transaksi','pe3_transaksi_detail.transaksi_id','pe3_transaksi.id')
                                            ->where('pe3_transaksi.ta',$ta)                                                                                    
                                            ->where('pe3_transaksi.no_formulir',$no_formulir)
                                            ->where('pe3_transaksi_detail.kombi_id',102)                                                                                      
                                            ->where(function($query) {
                                                $query->where('pe3_transaksi.status',0)
                                                    ->orWhere('pe3_transaksi.status',1);
                                            })                                        
                                            ->first();

            if (!is_null($transaksi))
            {                
                throw new Exception ("Transaksi tidak bisa dibuat karena ($no_formulir) sudah melakukan transaksi pada $ta.");  
            }

            $mahasiswa=FormulirPendaftaranModel::select(\DB::raw('
                                                    user_id,
                                                    no_formulir,
                                                    ta,
                                                    idkelas,
                                                    kjur1,
                                                    idsmt
                                                '))
                                                ->where('no_formulir',$no_formulir)
                                                ->first();
                                                

            $tahun=$mahasiswa->ta;
            $idkelas=$mahasiswa->idkelas;
            $kjur=$mahasiswa->kjur1;
            $idsmt=$mahasiswa->idsmt;
            
            $biaya_kombi=BiayaKomponenPeriodeModel::where('tahun',$tahun)
                                                    ->where('idkelas',$idkelas)
                                                    ->where('kjur',$kjur)
                                                    ->where('kombi_id',102)
                                                    ->value('biaya');
            
            if (!($biaya_kombi > 0))
            {
                throw new Exception ("Komponen Biaya Daftar Ulang Mahasiswa Baru (102) belum disetting pada TA $tahun");  
            }

            $transaksi = \DB::transaction(function () use ($request,$mahasiswa,$biaya_kombi){
                $no_transaksi='102'.date('YmdHms');
                $transaksi=TransaksiModel::create([
                    'id'=>Uuid::uuid4()->toString(),
                    'user_id'=>$mahasiswa->user_id,
                    'no_transaksi'=>$no_transaksi,
                    'no_faktur'=>'',
                    'kjur'=>$mahasiswa->kjur1,
                    'ta'=>$request->input('TA'),
                    'idsmt'=>$mahasiswa->idsmt,
                    'idkelas'=>$mahasiswa->idkelas,
                    'no_formulir'=>$mahasiswa->no_formulir,                    
                    'commited'=>0,
                    'total'=>0,
                    'tanggal'=>date('Y-m-d'),
                    'desc'=>null
                ]); 
                
                $transaksi_detail=TransaksiDetailModel::create([
                    'id'=>Uuid::uuid4()->toString(),
                    'user_id'=>$mahasiswa->user_id,
                    'transaksi_id'=>$transaksi->id,
                    'no_transaksi'=>$transaksi->no_transaksi,
                    'kombi_id'=>102,
                    'nama_kombi'=>'DAFTAR ULANG MHS. BARU',
                    'biaya'=>$biaya_kombi,
                    'jumlah'=>1,
                    'sub_total'=>$biaya_kombi    
                ]);

                $transaksi->total=$biaya_kombi;
                $transaksi->desc='DAFTAR ULANG MHS. BARU';
                $transaksi->save();

                return $transaksi;

            });

            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'store',                   
                                        'transaksi'=>$transaksi,                                                                                                                                   
                                        'message'=>'Transaksi Daftar Ulang Mahasiswa Baru berhasil di input.'
                                    ],200); 
        }
        catch (Exception $e)
        {
            return Response()->json([
                'status'=>0,
                'pid'=>'store',                                                                                                                                                  
                'message'=>[$e->getMessage()]
            ],422); 
        }        
    }
    public function destroy(Request $request,$id)
    {
        $this->hasPermissionTo('KEUANGAN-TRANSAKSI-DULANG-MHS-BARU_DESTROY');

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
                                    'transaksi'=>$transaksi,     
                                    'message'=>["Transaksi daftar ulang mahasiswa baru dengan ($id) gagal dihapus"]
                                ],422); 
        }
        else if ($transaksi->status==0)
        {
            \App\Models\System\ActivityLog::log($request,[
                                                            'object' => $transaksi, 
                                                            'object_id' => $transaksi->id, 
                                                            'user_id' => $this->getUserid(), 
                                                            'message' => 'Menghapus transaksi daftar ulang mahasiswa baru dengan id ('.$id.') berhasil'
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
                                    'transaksi'=>$transaksi,     
                                    'message'=>["Transaksi daftar ulang mahasiswa baru dengan ($id) gagal dihapus"]
                                ],422); 
        }
    }
}